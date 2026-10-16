import { NextResponse } from 'next/server';
import { appendToSheet, createCalendarEvent, createCalendarEventLegacy, buildCustomerCalendarUrl } from '@/lib/google-calendar';
import { BOOKING_SERVICES } from '@/fixtures/booking-services';
import { BRANCHES_FIXTURE } from '@/fixtures/locations';
import { client } from '@/sanity/client';
import { groq } from 'next-sanity';
import type { ServiceSnapshot } from '@/fixtures/types';

function nanoid6() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

/**
 * POST /api/bookings
 *
 * New multi-step flow payload:
 *   { branchId, serviceIds[], startAt, endAt, name, phone, email?, notes?, idempotencyKey }
 *
 * Legacy single-form payload (BookingModal callback tab fallback):
 *   { name, phone, service, date, time, branch }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ── Detect legacy vs new payload ──────────────────────────────────────────
    const isLegacy = !body.serviceIds && !!body.service;

    if (isLegacy) {
      return handleLegacyBooking(body);
    }

    return handleNewBooking(body);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[/api/bookings]', msg);
    return NextResponse.json({ success: false, error: `Server Error: ${msg}` }, { status: 500 });
  }
}

// ── New multi-step booking ────────────────────────────────────────────────────

async function handleNewBooking(body: Record<string, unknown>) {
  const { branchId, serviceIds, startAt, endAt, name, phone, email, notes, idempotencyKey } = body as {
    branchId: string;
    serviceIds: string[];
    startAt: string;
    endAt: string;
    name: string;
    phone: string;
    email?: string;
    notes?: string;
    idempotencyKey: string;
  };

  // ── Validate required fields ───────────────────────────────────────────────
  if (!branchId || !serviceIds?.length || !startAt || !endAt || !name || !phone || !idempotencyKey) {
    return NextResponse.json({ success: false, error: 'Missing required fields.' }, { status: 400 });
  }

  // ── Validate branch (fixtures + dynamic Sanity CMS locations) ───────────
  let branch = BRANCHES_FIXTURE.find(b => b.slug === branchId || b._id === branchId);
  if (!branch) {
    try {
      const q = groq`*[_type == "location" && (_id == $b || slug.current == $b || lower(shortName) == lower($b) || lower(name) match lower($b))][0]`;
      const cmsDoc = await client?.fetch(q, { b: branchId });
      if (cmsDoc) {
        branch = {
          _id: cmsDoc._id,
          id: cmsDoc._id,
          name: cmsDoc.name,
          shortName: cmsDoc.shortName || cmsDoc.name,
          slug: (cmsDoc.shortName || cmsDoc.name).toLowerCase().replace(/\s+/g, '-'),
          address: {
            street: cmsDoc.address || '',
            colony: '',
            landmark: '',
            area: cmsDoc.shortName || 'Hyderabad',
            city: 'Hyderabad',
            pincode: '',
            fullFormatted: cmsDoc.address || '',
          },
          phone: cmsDoc.phone || '+919700744357',
          phoneFormatted: cmsDoc.phone || '+91 97007 44357',
          whatsappNumber: cmsDoc.whatsappNumber || '919700744357',
          hours: cmsDoc.hours || 'Mon–Sun: 10 AM – 9 PM',
          googleMapsUrl: cmsDoc.googleMapsUrl || '',
          embedUrl: cmsDoc.embedUrl || '',
          description: cmsDoc.description || '',
          servicesAvailable: [],
        };
      }
    } catch { /* ignore */ }
  }

  if (!branch) {
    return NextResponse.json({ success: false, error: 'Invalid branch.' }, { status: 400 });
  }

  // ── Validate services (fixtures + dynamic Sanity CMS booking services) ────
  let allAvailableServices = BOOKING_SERVICES;
  try {
    const q = groq`*[_type == "bookingService" && active != false]{ "serviceId": serviceId.current, name, durationMinutes, branchIds }`;
    const cmsDocs = await client?.fetch<{ serviceId: string; name: string; durationMinutes: number; branchIds?: string[] }[]>(q);
    if (cmsDocs && cmsDocs.length > 0) {
      const map = new Map<string, { serviceId: string; name: string; durationMinutes: number; branchIds?: string[] }>();
      for (const s of BOOKING_SERVICES) map.set(s.serviceId, s);
      for (const c of cmsDocs) {
        if (c.serviceId) map.set(c.serviceId, { ...(map.get(c.serviceId) ?? {}), ...c });
      }
      allAvailableServices = Array.from(map.values()) as typeof BOOKING_SERVICES;
    }
  } catch { /* fallback to static fixture */ }

  const selectedServices = serviceIds.map(id => allAvailableServices.find(s => s.serviceId === id)).filter(Boolean);
  if (selectedServices.length !== serviceIds.length) {
    return NextResponse.json({ success: false, error: 'One or more services are invalid.' }, { status: 400 });
  }

  const serviceSnapshot: ServiceSnapshot[] = selectedServices.map(s => ({
    serviceId: s!.serviceId,
    name:      s!.name,
    durationMinutes: s!.durationMinutes,
  }));
  const totalDuration = serviceSnapshot.reduce((sum, s) => sum + s.durationMinutes, 0);

  // ── Validate phone ─────────────────────────────────────────────────────────
  const cleanPhone = String(phone).replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    return NextResponse.json({ success: false, error: 'Invalid phone number.' }, { status: 400 });
  }

  // ── Generate booking ID ────────────────────────────────────────────────────
  const bookingId = `ROOTS-${nanoid6()}`;
  const status    = 'pending_confirmation';

  // ── Date / time labels for Sheets ─────────────────────────────────────────
  const startDate = new Date(startAt);
  const dateLabel = startDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric' });
  const startLabel = startDate.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
  const endLabel   = new Date(endAt).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
  const createdAt  = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // ── Try to get branch-specific calendar ID from Sanity ────────────────────
  let calendarIdOverride: string | undefined;
  try {
    const q = groq`*[_type == "location" && shortName == $sn][0]{ googleCalendarId }`;
    const doc = await client?.fetch(q, { sn: branch.shortName }).catch(() => null);
    calendarIdOverride = doc?.googleCalendarId;
  } catch { /* ignore — fall back to env var */ }

  // ── Create Calendar event ──────────────────────────────────────────────────
  let calendarEventId: string | null = null;
  let calendarSyncStatus = 'pending';
  let customerCalendarUrl = '';

  try {
    const result = await createCalendarEvent({
      bookingId,
      name,
      phone: cleanPhone,
      email,
      services: serviceSnapshot,
      startAt,
      endAt,
      branchSlug: branch.slug,
      notes,
      calendarIdOverride,
    });
    calendarEventId   = result.eventId;
    customerCalendarUrl = result.customerCalendarUrl;
    calendarSyncStatus = 'synced';
  } catch (calErr) {
    const msg = calErr instanceof Error ? calErr.message : String(calErr);
    console.error('[/api/bookings] Calendar sync failed:', msg);
    calendarSyncStatus = 'failed';
  }

  // Ensure customerCalendarUrl is always populated for user action
  if (!customerCalendarUrl) {
    const primaryService = serviceSnapshot[0]?.name || 'Salon Appointment';
    const serviceNames   = serviceSnapshot.map(s => s.name).join(', ');
    const location       = branch.address?.fullFormatted || branch.name;
    customerCalendarUrl  = buildCustomerCalendarUrl({
      title: `Roots appointment — ${primaryService}`,
      startAt,
      endAt,
      location,
      description: [
        `Booking ref: ${bookingId}`,
        `Services: ${serviceNames}`,
        "Root's The Family Salon — +91 97007 44357",
      ].join('\n'),
    });
  }

  // ── Write to Sheets ────────────────────────────────────────────────────────
  const branchName = branch.shortName;
  try {
    await appendToSheet(
      `'Bookings - ${branchName}'!A:O`,
      [
        bookingId,
        name,
        cleanPhone,
        email || '',
        serviceSnapshot.map(s => s.name).join('; '),
        String(totalDuration),
        dateLabel,
        startLabel,
        endLabel,
        branchName,
        notes || '',
        status,
        calendarEventId || '',
        idempotencyKey,
        createdAt,
      ]
    );
  } catch (sheetErr) {
    const msg = sheetErr instanceof Error ? sheetErr.message : String(sheetErr);
    console.error('[/api/bookings] Sheets write failed:', msg);
    // Non-fatal — booking still returns success if calendar worked
  }

  return NextResponse.json({
    success: true,
    bookingId,
    status,
    branchName,
    serviceSnapshot,
    startAt,
    endAt,
    totalDurationMinutes: totalDuration,
    calendarSyncStatus,
    customerCalendarUrl,
    message: "Booking received! We'll confirm your appointment shortly.",
  });
}

// ── Legacy single-form booking (old BookingModal, kept for callbacks) ─────────

async function handleLegacyBooking(body: Record<string, unknown>) {
  const { name, phone, service, date, time, branch } = body as {
    name: string; phone: string; service: string; date: string; time: string; branch: string;
  };

  if (!name || !phone || !service || !date || !time || !branch) {
    return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
  }

  const cleanPhone = String(phone).replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    return NextResponse.json({ success: false, error: 'Invalid phone number.' }, { status: 400 });
  }

  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  let calendarIdOverride: string | undefined;
  try {
    const q = groq`*[_type == "location" && shortName == $branch][0]{ googleCalendarId }`;
    const doc = await client?.fetch(q, { branch }).catch(() => null);
    calendarIdOverride = doc?.googleCalendarId;
  } catch { /* ignore */ }

  try {
    await createCalendarEventLegacy({ name, phone: cleanPhone, service, date, time, branch, calendarIdOverride });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[/api/bookings legacy] Calendar error:', msg);
  }

  try {
    await appendToSheet(
      `'Bookings - ${branch}'!A:O`,
      [`LEGACY-${Date.now()}`, name, cleanPhone, '', service, '60', date, time, '', branch, '', 'pending_confirmation', '', '', submittedAt]
    );
  } catch { /* ignore */ }

  return NextResponse.json({ success: true, message: "Booking received! We'll confirm your appointment shortly." });
}

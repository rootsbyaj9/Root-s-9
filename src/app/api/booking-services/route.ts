import { NextResponse } from 'next/server';
import { BOOKING_SERVICES } from '@/fixtures/booking-services';
import { client } from '@/sanity/client';
import { getBookingServicesQuery } from '@/sanity/lib/queries';
import type { BookingServiceRecord } from '@/fixtures/types';

/**
 * GET /api/booking-services
 * ?branchId=uppal&category=hair-services&query=cut&audience=women
 *
 * Source priority:
 *   1. Sanity CMS  (live, editable in Studio — "📅 Booking Services")
 *   2. Fixture fallback  (src/fixtures/booking-services.ts)
 *
 * Never returns any price field.
 */
export const revalidate = 60; // ISR — refresh every 60s from CMS

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const branchId = searchParams.get('branchId') || '';
  const category = searchParams.get('category') || '';
  const query    = searchParams.get('query')    || '';
  const audience = searchParams.get('audience') || '';

  // ── Try CMS ──────────────────────────────────────────────────────────────
  let services: BookingServiceRecord[] = [];
  try {
    const cmsData = await client?.fetch<BookingServiceRecord[]>(getBookingServicesQuery);
    if (cmsData && cmsData.length > 0) {
      services = cmsData;
    }
  } catch {
    // CMS unavailable — use fixture
  }

  // ── Fallback to fixture ───────────────────────────────────────────────────
  if (services.length === 0) {
    services = BOOKING_SERVICES.filter(s => s.active);
  }

  // ── Filter ────────────────────────────────────────────────────────────────
  if (branchId) {
    services = services.filter(s => s.branchIds?.includes(branchId));
  }
  if (category) {
    services = services.filter(s => s.categorySlug === category);
  }
  if (audience && audience !== 'all') {
    services = services.filter(s => s.audience === audience);
  }
  if (query) {
    const q = query.toLowerCase();
    services = services.filter(
      s => s.name?.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ services });
}

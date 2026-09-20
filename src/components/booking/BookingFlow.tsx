'use client';

/**
 * BookingFlow.tsx
 *
 * Multi-step booking state machine.
 * Steps: branch → services → datetime → details → success
 *
 * URL params supported: ?branch=uppal&service=hs-haircut
 * Session storage: draft restored on refresh (keyed by step data)
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import BookingProgress, { type BookingStep } from './BookingProgress';
import BookingSummaryPanel from './BookingSummaryPanel';
import StepBranch from './steps/StepBranch';
import StepServices from './steps/StepServices';
import StepDateTime from './steps/StepDateTime';
import StepDetails from './steps/StepDetails';
import StepSuccess from './steps/StepSuccess';
import { BRANCHES_FIXTURE } from '@/fixtures/locations';
import { BOOKING_SERVICES } from '@/fixtures/booking-services';
import type { BranchRecord, BookingServiceRecord } from '@/fixtures/types';
import type { SanityLocation } from '@/types/sanity';

const SESSION_KEY = 'roots-booking-draft';

interface DraftState {
  branchId?: string;
  serviceIds?: string[];
  date?: string;
  time?: string;
  timeLabel?: string;
}

interface SuccessData {
  bookingId: string;
  customerCalendarUrl: string;
  customerEmail?: string;
}

interface BookingFlowProps {
  cmsLocations?: SanityLocation[];
}

export default function BookingFlow({ cmsLocations = [] }: BookingFlowProps) {
  const searchParams = useSearchParams();

  // Derive branches directly from Sanity CMS locations (fallback to fixture)
  const branches: BranchRecord[] = useMemo(() => {
    if (!cmsLocations || cmsLocations.length === 0) {
      return BRANCHES_FIXTURE;
    }

    return cmsLocations
      .filter(cms => cms.isActive !== false)
      .map(cms => {
        const slug = (cms.shortName || cms.name)
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');

        const fix = BRANCHES_FIXTURE.find(
          f => f.slug === slug ||
               f.shortName.toLowerCase() === cms.shortName?.toLowerCase() ||
               f._id === cms._id
        );

        return {
          _id: cms._id,
          id: cms._id,
          name: cms.name || fix?.name || `Root's The Family Salon — ${cms.shortName}`,
          shortName: cms.shortName || fix?.shortName || cms.name,
          slug: fix?.slug || slug,
          address: {
            street: fix?.address.street || cms.address,
            colony: fix?.address.colony || '',
            landmark: fix?.address.landmark || '',
            area: fix?.address.area || cms.shortName || 'Hyderabad',
            city: fix?.address.city || 'Hyderabad',
            pincode: fix?.address.pincode || '',
            fullFormatted: cms.address || fix?.address.fullFormatted || '',
          },
          phone: cms.phone || fix?.phone || '+919700744357',
          phoneFormatted: cms.phone || fix?.phoneFormatted || '+91 97007 44357',
          whatsappNumber: cms.whatsappNumber || fix?.whatsappNumber || '919700744357',
          hours: cms.hours || fix?.hours || 'Mon–Sun: 10 AM – 9 PM',
          googleMapsUrl: cms.googleMapsUrl || fix?.googleMapsUrl || '',
          embedUrl: cms.embedUrl || fix?.embedUrl || '',
          description: cms.description || fix?.description || "Experience Root's signature salon services.",
          servicesAvailable: fix?.servicesAvailable || ['Hair', 'Skin', 'Grooming', 'Bridal'],
          isSignature: fix?.isSignature ?? (cms.shortName?.toLowerCase() === 'uppal'),
          isNew: cms.isNew ?? fix?.isNew,
        };
      });
  }, [cmsLocations]);

  const [step, setStep]         = useState<BookingStep>('branch');
  const [branch, setBranch]     = useState<BranchRecord | null>(null);
  const [services, setServices] = useState<BookingServiceRecord[]>([]);
  const [date, setDate]         = useState('');
  const [time, setTime]         = useState('');
  const [timeLabel, setTimeLabel] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess]   = useState<SuccessData | null>(null);

  // ── Restore from session storage ──────────────────────────────────────────
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return;
      const draft: DraftState = JSON.parse(raw);
      if (draft.branchId) {
        const b = branches.find(x => x.slug === draft.branchId);
        if (b) setBranch(b);
      }
      if (draft.serviceIds?.length) {
        const svcs = draft.serviceIds
          .map(id => BOOKING_SERVICES.find(s => s.serviceId === id))
          .filter((s): s is BookingServiceRecord => !!s);
        setServices(svcs);
      }
      if (draft.date)      setDate(draft.date);
      if (draft.time)      setTime(draft.time);
      if (draft.timeLabel) setTimeLabel(draft.timeLabel);
    } catch { /* ignore */ }
  }, [branches]);

  // ── Preselect from URL params ──────────────────────────────────────────────
  useEffect(() => {
    const branchParam  = searchParams.get('branch');
    const serviceParam = searchParams.get('service');
    if (branchParam && !branch) {
      const b = branches.find(x => x.slug === branchParam);
      if (b) setBranch(b);
    }
    if (serviceParam && services.length === 0) {
      const svc = BOOKING_SERVICES.find(s => s.serviceId === serviceParam);
      if (svc) setServices([svc]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branches]);

  // ── Persist draft ──────────────────────────────────────────────────────────
  const saveDraft = useCallback((patch: Partial<DraftState>) => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      const existing = raw ? JSON.parse(raw) : {};
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...existing, ...patch }));
    } catch { /* ignore */ }
  }, []);

  // ── Step handlers ──────────────────────────────────────────────────────────
  const handleSelectBranch = (b: BranchRecord) => {
    setBranch(b);
    saveDraft({ branchId: b.slug });
  };

  const handleToggleService = (svc: BookingServiceRecord) => {
    setServices(prev => {
      const exists = prev.some(s => s.serviceId === svc.serviceId);
      const next = exists ? prev.filter(s => s.serviceId !== svc.serviceId) : [...prev, svc];
      saveDraft({ serviceIds: next.map(s => s.serviceId) });
      return next;
    });
  };

  const handleDateTimeSelect = (d: string, t: string, tl: string) => {
    setDate(d); setTime(t); setTimeLabel(tl);
    saveDraft({ date: d, time: t, timeLabel: tl });
  };

  const handleSubmit = async (formData: {
    name: string; phone: string; email: string; notes: string; consent: boolean;
  }) => {
    if (!branch || services.length === 0 || !date || !time) return;
    setSubmitting(true);
    setSubmitError('');

    try {
      const idempotencyKey = `${branch.slug}-${Date.now()}-${Math.random().toString(36).slice(2)}`;

      // Build ISO start/end times in IST
      const [h, m] = time.split(':').map(Number);
      const totalDuration = services.reduce((sum, s) => sum + s.durationMinutes, 0);
      const startAt = `${date}T${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:00+05:30`;
      const endMins = h * 60 + m + totalDuration;
      const endH = Math.floor(endMins / 60);
      const endM = endMins % 60;
      const endAt = `${date}T${String(endH).padStart(2,'0')}:${String(endM).padStart(2,'0')}:00+05:30`;

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          branchId:    branch.slug,
          serviceIds:  services.map(s => s.serviceId),
          startAt,
          endAt,
          name:   formData.name.trim(),
          phone:  formData.phone.replace(/\D/g, ''),
          email:  formData.email.trim() || undefined,
          notes:  formData.notes.trim() || undefined,
          idempotencyKey,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Booking failed.');

      sessionStorage.removeItem(SESSION_KEY);
      setSuccess({
        bookingId: data.bookingId,
        customerCalendarUrl: data.customerCalendarUrl || '',
        customerEmail: formData.email || undefined,
      });
      setStep('success');
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  const showSummary = step !== 'branch' && step !== 'success';

  return (
    <div className="min-h-screen bg-parchment pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24">
      {/* Progress bar */}
      {step !== 'success' && <BookingProgress currentStep={step} />}

      {/* Main layout */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className={`flex gap-10 items-start ${showSummary ? 'xl:grid xl:grid-cols-[1fr_340px]' : ''}`}>

          {/* Step content */}
          <div className="w-full xl:min-w-0">
            {step === 'branch' && (
              <StepBranch
                branches={branches}
                selected={branch}
                onSelect={handleSelectBranch}
                onContinue={() => setStep('services')}
              />
            )}
            {step === 'services' && branch && (
              <StepServices
                branch={branch}
                selected={services}
                onToggle={handleToggleService}
                onContinue={() => setStep('datetime')}
                onBack={() => setStep('branch')}
              />
            )}
            {step === 'datetime' && branch && (
              <StepDateTime
                branch={branch}
                selectedServices={services}
                selectedDate={date}
                selectedTime={time}
                onSelect={handleDateTimeSelect}
                onContinue={() => setStep('details')}
                onBack={() => setStep('services')}
              />
            )}
            {step === 'details' && (
              <StepDetails
                onSubmit={handleSubmit}
                onBack={() => setStep('datetime')}
                submitting={submitting}
                error={submitError}
              />
            )}
            {step === 'success' && success && branch && (
              <StepSuccess
                bookingId={success.bookingId}
                branch={branch}
                services={services}
                date={date}
                timeLabel={timeLabel}
                customerCalendarUrl={success.customerCalendarUrl}
                customerEmail={success.customerEmail}
              />
            )}
          </div>

          {/* Summary panel — desktop only, steps 2-4 */}
          {showSummary && branch && (
            <div className="hidden xl:block sticky top-28">
              <BookingSummaryPanel
                branch={branch}
                selectedServices={services}
                selectedDate={date}
                selectedTime={time}
                selectedTimeLabel={timeLabel}
                onChangeBranch={() => setStep('branch')}
                onChangeServices={() => setStep('services')}
                onContinue={
                  step === 'services'
                    ? () => setStep('datetime')
                    : step === 'datetime'
                      ? () => setStep('details')
                      : undefined
                }
                continueLabel={
                  step === 'services'
                    ? 'Continue to Date & Time →'
                    : step === 'datetime'
                      ? 'Continue to Details →'
                      : 'Continue →'
                }
                continueDisabled={
                  step === 'services'
                    ? services.length === 0
                    : step === 'datetime'
                      ? !date || !time
                      : false
                }
              />
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

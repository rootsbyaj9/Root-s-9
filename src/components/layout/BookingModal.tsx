'use client';

/**
 * BookingModal.tsx — Premium Booking Form
 *
 * A full-screen modal with two tabs:
 *   1. BOOK APPOINTMENT — Name, Phone, Service, Date, Time, Branch → Sheets + Calendar
 *   2. REQUEST CALLBACK — Name, Phone, Preferred Time, Note → Sheets only
 *
 * Design: Glass-morphism overlay, warm parchment card, animated entrance.
 * Triggered from anywhere via a global event or React context.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

// ── Fallback data (will be replaced by CMS props at final delivery) ──────────
const SERVICES = [
  'Hair Styling',
  'Hair Color',
  'Skin Care & Facial',
  'Bridal Makeup',
  'Tattoo',
  'Nails',
  'Piercing',
  'Other',
];

const BRANCHES = ['Uppal', 'Tarnaka'];

const TIME_SLOTS = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
  '08:00 PM', '08:30 PM',
];

type Tab = 'booking' | 'callback';
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('booking');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    branch: BRANCHES[0],
  });

  const [callbackForm, setCallbackForm] = useState({
    name: '',
    phone: '',
    preferredTime: '',
    note: '',
    branch: BRANCHES[0],
  });

  useEffect(() => { setMounted(true); }, []);

  // ── Global event listener for opening the modal ────────────────────────────
  const openModal = useCallback((e?: Event) => {
    const customEvent = e as CustomEvent;
    if (customEvent?.detail?.tab) {
      setActiveTab(customEvent.detail.tab);
    }
    // Allow pre-selecting a branch (e.g. from the locations page)
    if (customEvent?.detail?.branch) {
      const b = customEvent.detail.branch;
      setBookingForm((prev) => ({ ...prev, branch: b }));
      setCallbackForm((prev) => ({ ...prev, branch: b }));
    }
    setStatus('idle');
    setErrorMessage('');
    setIsOpen(true);
  }, []);

  useEffect(() => {
    window.addEventListener('open-booking-modal', openModal);
    return () => window.removeEventListener('open-booking-modal', openModal);
  }, [openModal]);

  // ── Lock body scroll ───────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ── Close on Escape ────────────────────────────────────────────────────────
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [isOpen]);

  // ── Close on overlay click ─────────────────────────────────────────────────
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) setIsOpen(false);
  };

  // ── Min date for the date picker (today) ───────────────────────────────────
  const today = new Date().toISOString().split('T')[0];

  // ── Submit booking ─────────────────────────────────────────────────────────
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingForm),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setBookingForm({ name: '', phone: '', service: '', date: '', time: '', branch: BRANCHES[0] });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  // ── Submit callback ────────────────────────────────────────────────────────
  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/callbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(callbackForm),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setCallbackForm({ name: '', phone: '', preferredTime: '', note: '', branch: BRANCHES[0] });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      style={{ backgroundColor: 'rgba(26, 16, 8, 0.6)', backdropFilter: 'blur(8px)' }}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Book an appointment"
    >
      <div
        ref={cardRef}
        className={`relative w-full max-w-lg bg-parchment rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* ── Close button ─────────────────────────────── */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-obsidian/5 hover:bg-obsidian/10 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4 text-obsidian" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* ── Tab switcher ─────────────────────────────── */}
        <div className="flex border-b border-obsidian/[0.06]">
          <button
            onClick={() => { setActiveTab('booking'); setStatus('idle'); }}
            className={`flex-1 py-4 font-sans text-[11px] uppercase tracking-[0.12em] font-semibold transition-colors relative ${
              activeTab === 'booking'
                ? 'text-roots-orange'
                : 'text-obsidian/40 hover:text-obsidian/60'
            }`}
          >
            Book Appointment
            {activeTab === 'booking' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-roots-orange" />
            )}
          </button>
          <button
            onClick={() => { setActiveTab('callback'); setStatus('idle'); }}
            className={`flex-1 py-4 font-sans text-[11px] uppercase tracking-[0.12em] font-semibold transition-colors relative ${
              activeTab === 'callback'
                ? 'text-roots-orange'
                : 'text-obsidian/40 hover:text-obsidian/60'
            }`}
          >
            Request Callback
            {activeTab === 'callback' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-roots-orange" />
            )}
          </button>
        </div>

        {/* ── Form content ─────────────────────────────── */}
        <div className="p-6 md:p-8">
          {status === 'success' ? (
            <SuccessMessage
              tab={activeTab}
              onClose={() => setIsOpen(false)}
              onReset={() => setStatus('idle')}
            />
          ) : activeTab === 'booking' ? (
            <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
              <FormField
                label="Your Name"
                required
                value={bookingForm.name}
                onChange={(v) => setBookingForm({ ...bookingForm, name: v })}
                placeholder="e.g. Priya Sharma"
              />
              <FormField
                label="Phone Number"
                required
                type="tel"
                value={bookingForm.phone}
                onChange={(v) => setBookingForm({ ...bookingForm, phone: v })}
                placeholder="e.g. 9876543210"
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
              />
              <SelectField
                label="Service"
                required
                value={bookingForm.service}
                onChange={(v) => setBookingForm({ ...bookingForm, service: v })}
                options={SERVICES}
                placeholder="Select a service"
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Preferred Date"
                  required
                  type="date"
                  value={bookingForm.date}
                  onChange={(v) => setBookingForm({ ...bookingForm, date: v })}
                  min={today}
                />
                <SelectField
                  label="Preferred Time"
                  required
                  value={bookingForm.time}
                  onChange={(v) => setBookingForm({ ...bookingForm, time: v })}
                  options={TIME_SLOTS}
                  placeholder="Select time"
                />
              </div>
              <BranchSelector
                value={bookingForm.branch}
                onChange={(v) => setBookingForm({ ...bookingForm, branch: v })}
              />
              {errorMessage && <p className="text-red-600 text-sm font-sans">{errorMessage}</p>}
              <SubmitButton loading={status === 'submitting'} label="Book Appointment" />
            </form>
          ) : (
            <form onSubmit={handleCallbackSubmit} className="flex flex-col gap-4">
              <FormField
                label="Your Name"
                required
                value={callbackForm.name}
                onChange={(v) => setCallbackForm({ ...callbackForm, name: v })}
                placeholder="e.g. Priya Sharma"
              />
              <FormField
                label="Phone Number"
                required
                type="tel"
                value={callbackForm.phone}
                onChange={(v) => setCallbackForm({ ...callbackForm, phone: v })}
                placeholder="e.g. 9876543210"
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
              />
              <FormField
                label="Preferred Time to Call"
                value={callbackForm.preferredTime}
                onChange={(v) => setCallbackForm({ ...callbackForm, preferredTime: v })}
                placeholder="e.g. After 6 PM, Morning"
              />
              <TextAreaField
                label="Purpose / Note"
                value={callbackForm.note}
                onChange={(v) => setCallbackForm({ ...callbackForm, note: v })}
                placeholder="e.g. Want to inquire about bridal packages"
              />
              <BranchSelector
                value={callbackForm.branch}
                onChange={(v) => setCallbackForm({ ...callbackForm, branch: v })}
              />
              {errorMessage && <p className="text-red-600 text-sm font-sans">{errorMessage}</p>}
              <SubmitButton loading={status === 'submitting'} label="Request Callback" />
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

// ═══════════════════════════════════════════════════════════
//  SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════

function FormField({
  label,
  required,
  type = 'text',
  value,
  onChange,
  placeholder,
  pattern,
  title,
  min,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  pattern?: string;
  title?: string;
  min?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-[11px] uppercase tracking-[0.1em] text-obsidian/60 font-semibold">
        {label} {required && <span className="text-roots-orange">*</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        pattern={pattern}
        title={title}
        min={min}
        className="w-full px-4 py-3 bg-linen border border-obsidian/[0.08] rounded-lg font-sans text-sm text-obsidian placeholder:text-obsidian/30 focus:outline-none focus:border-roots-orange/40 focus:ring-2 focus:ring-roots-orange/10 transition-all"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-[11px] uppercase tracking-[0.1em] text-obsidian/60 font-semibold">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-3 bg-linen border border-obsidian/[0.08] rounded-lg font-sans text-sm text-obsidian placeholder:text-obsidian/30 focus:outline-none focus:border-roots-orange/40 focus:ring-2 focus:ring-roots-orange/10 transition-all resize-none"
      />
    </label>
  );
}

function SelectField({
  label,
  required,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-[11px] uppercase tracking-[0.1em] text-obsidian/60 font-semibold">
        {label} {required && <span className="text-roots-orange">*</span>}
      </span>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 bg-linen border border-obsidian/[0.08] rounded-lg font-sans text-sm text-obsidian focus:outline-none focus:border-roots-orange/40 focus:ring-2 focus:ring-roots-orange/10 transition-all appearance-none cursor-pointer ${
          !value ? 'text-obsidian/30' : ''
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B5E53' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}

function BranchSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-sans text-[11px] uppercase tracking-[0.1em] text-obsidian/60 font-semibold">
        Branch <span className="text-roots-orange">*</span>
      </span>
      <div className="grid grid-cols-2 gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(BRANCHES.length, 3)}, 1fr)` }}>
        {BRANCHES.map((branch) => (
          <button
            key={branch}
            type="button"
            onClick={() => onChange(branch)}
            className={`py-3 rounded-lg font-sans text-sm font-medium transition-all border ${
              value === branch
                ? 'bg-roots-orange text-parchment border-roots-orange shadow-md'
                : 'bg-linen text-obsidian border-obsidian/[0.08] hover:border-roots-orange/30'
            }`}
          >
            {branch}
          </button>
        ))}
      </div>
    </div>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 w-full py-4 bg-roots-orange text-parchment rounded-lg font-sans text-xs uppercase tracking-[0.1em] font-semibold transition-all hover:shadow-lg hover:shadow-roots-orange/25 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Submitting...
        </>
      ) : (
        label
      )}
    </button>
  );
}

function SuccessMessage({
  tab,
  onClose,
  onReset,
}: {
  tab: Tab;
  onClose: () => void;
  onReset: () => void;
}) {
  return (
    <div className="text-center py-8 flex flex-col items-center gap-5">
      {/* Animated checkmark */}
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <h3 className="font-serif text-2xl text-obsidian mb-2">
          {tab === 'booking' ? 'Appointment Requested!' : 'Callback Requested!'}
        </h3>
        <p className="font-sans text-sm text-warm-gray leading-relaxed max-w-xs mx-auto">
          {tab === 'booking'
            ? "We've received your booking. Our team will confirm your appointment shortly via phone."
            : "We'll call you back at your preferred time. Thank you!"}
        </p>
      </div>
      <div className="flex gap-3 mt-2">
        <button
          onClick={onReset}
          className="px-6 py-2.5 border border-obsidian/15 rounded-lg font-sans text-xs uppercase tracking-wide text-obsidian/70 hover:bg-obsidian/5 transition-colors"
        >
          {tab === 'booking' ? 'Book Another' : 'Submit Another'}
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-obsidian text-parchment rounded-lg font-sans text-xs uppercase tracking-wide hover:bg-obsidian/90 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  HELPER: Open the booking modal from anywhere
// ═══════════════════════════════════════════════════════════
export function openBookingModal(tab: Tab = 'booking') {
  window.dispatchEvent(
    new CustomEvent('open-booking-modal', { detail: { tab } })
  );
}

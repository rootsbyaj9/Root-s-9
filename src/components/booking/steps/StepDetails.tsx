'use client';

/**
 * StepDetails.tsx — Step 4: Your details
 */

import { useState, useId } from 'react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
}

interface Props {
  onSubmit: (data: FormData) => Promise<void>;
  onBack: () => void;
  submitting: boolean;
  error?: string;
}

export default function StepDetails({ onSubmit, onBack, submitting, error }: Props) {
  const uid = useId();
  const [form, setForm] = useState<FormData>({
    name: '', phone: '', email: '', notes: '', consent: false,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(f => ({ ...f, [key]: e.target.value }));

  const setConsent = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, consent: e.target.checked }));

  const blur = (key: string) => () => setTouched(t => ({ ...t, [key]: true }));

  const phoneClean = form.phone.replace(/\D/g, '');
  const errors = {
    name:    !form.name.trim()          ? 'Full name is required.' : '',
    phone:   phoneClean.length < 10     ? 'Enter a valid 10-digit number.' : '',
    consent: !form.consent              ? 'Please confirm to proceed.' : '',
  };
  const isValid = !errors.name && !errors.phone && !errors.consent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, consent: true });
    if (!isValid) return;
    await onSubmit(form);
  };

  const inputBase = {
    backgroundColor: '#f7f3ee',
    border: '1px solid rgba(23,18,15,0.14)',
    color: 'var(--root-ink)',
    borderRadius: '12px',
    padding: '12px 16px',
    width: '100%',
    fontFamily: 'inherit',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  } as React.CSSProperties;

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#f0a46c';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(240,164,108,0.18)';
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(23,18,15,0.14)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div>
        <p className="eyebrow text-roots-orange mb-2">Step 4 of 5</p>
        <h1 className="font-serif text-3xl md:text-4xl text-obsidian leading-tight">
          Your details
        </h1>
        <p className="font-sans text-sm text-warm-gray mt-1.5">
          We'll use these to confirm your appointment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-name`} className="text-[11px] uppercase tracking-wide font-sans font-semibold" style={{ color: 'var(--root-muted)' }}>
            Full Name <span style={{ color: 'var(--root-orange)' }}>*</span>
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={set('name')}
            onBlur={blur('name')}
            onFocus={focusStyle}
            style={inputBase}
          />
          {touched.name && errors.name && (
            <p className="text-xs font-sans" style={{ color: '#c0392b' }}>{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-phone`} className="text-[11px] uppercase tracking-wide font-sans font-semibold" style={{ color: 'var(--root-muted)' }}>
            Phone Number <span style={{ color: 'var(--root-orange)' }}>*</span>
          </label>
          <div className="flex gap-2">
            <span
              className="flex items-center px-3 rounded-xl font-sans text-sm shrink-0"
              style={{ backgroundColor: '#f7f3ee', border: '1px solid rgba(23,18,15,0.14)', color: 'var(--root-muted)' }}
            >
              🇮🇳 +91
            </span>
            <input
              id={`${uid}-phone`}
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={set('phone')}
              onBlur={blur('phone')}
              onFocus={focusStyle}
              style={{ ...inputBase, flex: 1 }}
              maxLength={15}
            />
          </div>
          {touched.phone && errors.phone && (
            <p className="text-xs font-sans" style={{ color: '#c0392b' }}>{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-email`} className="text-[11px] uppercase tracking-wide font-sans font-semibold" style={{ color: 'var(--root-muted)' }}>
            Email Address <span className="font-normal normal-case" style={{ color: 'var(--root-muted)' }}>(optional — for Google Calendar invite)</span>
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={set('email')}
            onFocus={focusStyle}
            onBlur={blurStyle}
            style={inputBase}
          />
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-notes`} className="text-[11px] uppercase tracking-wide font-sans font-semibold" style={{ color: 'var(--root-muted)' }}>
            Special Notes <span className="font-normal normal-case" style={{ color: 'var(--root-muted)' }}>(optional)</span>
          </label>
          <textarea
            id={`${uid}-notes`}
            value={form.notes}
            onChange={set('notes')}
            onFocus={focusStyle}
            onBlur={blurStyle}
            maxLength={300}
            rows={3}
            style={{ ...inputBase, resize: 'none' }}
          />
          <p className="text-[10px] font-sans text-right" style={{ color: 'var(--root-muted)' }}>
            {form.notes.length}/300
          </p>
        </div>

        {/* Consent */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={setConsent}
            onBlur={blur('consent')}
            className="mt-0.5 w-4 h-4 rounded accent-roots-orange cursor-pointer shrink-0"
          />
          <span className="font-sans text-sm leading-snug" style={{ color: 'var(--root-ink)' }}>
            I consent to receiving appointment confirmation and updates via phone or SMS.
          </span>
        </label>
        {touched.consent && errors.consent && (
          <p className="text-xs font-sans -mt-3" style={{ color: '#c0392b' }}>{errors.consent}</p>
        )}

        {/* Server error */}
        {error && (
          <div className="rounded-xl px-4 py-3 text-sm font-sans" style={{ backgroundColor: 'rgba(192,57,43,0.08)', color: '#c0392b' }}>
            {error}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            disabled={submitting}
            className="px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider font-semibold border border-obsidian/20 text-obsidian hover:bg-obsidian/[0.06] transition-all shrink-0 cursor-pointer disabled:opacity-40"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 min-w-0 py-3 px-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider font-semibold text-white bg-roots-orange hover:bg-roots-orange-dark shadow-md hover:shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-center"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2 truncate">
                <svg className="animate-spin w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <span className="truncate">Requesting…</span>
              </span>
            ) : (
              <span className="truncate">Request Appointment →</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

import { NextResponse } from 'next/server';
import { BRANCHES_FIXTURE } from '@/fixtures/locations';

/**
 * GET /api/availability
 * ?branchId=uppal&date=2026-09-25&durationMinutes=90
 *
 * Preference mode: generates all 30-min slots within branch hours.
 * Slots that can't fit the full duration before closing are excluded.
 * Returns mode: 'preference' so the UI can show the right disclaimer.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const branchId       = searchParams.get('branchId')       || 'uppal';
  const date           = searchParams.get('date')           || '';
  const durationMins   = parseInt(searchParams.get('durationMinutes') || '30', 10);

  if (!date) {
    return NextResponse.json({ error: 'date is required' }, { status: 400 });
  }

  // All branches: 8:00 AM – 10:00 PM IST
  const START_MINS = 8 * 60;  // 8:00 AM (480 mins)
  const END_MINS   = 22 * 60; // 10:00 PM (1320 mins)

  // Calculate current IST date and time
  const now = new Date();
  const todayIST = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);
  const nowHour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
  const nowMin  = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
  const nowTotalMins = nowHour * 60 + nowMin;

  // Generate 30-min slots from 8:00 AM to 10:00 PM
  const slots: { time: string; label: string; available: boolean }[] = [];

  for (let currentMins = START_MINS; currentMins <= END_MINS; currentMins += 30) {
    const h = Math.floor(currentMins / 60);
    const m = currentMins % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    const time24 = `${pad(h)}:${pad(m)}`;

    // Human-readable label
    const period = h < 12 ? 'AM' : 'PM';
    const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const label = `${displayH}:${pad(m)} ${period}`;

    const isPast = (date < todayIST) || (date === todayIST && currentMins <= nowTotalMins);

    slots.push({ time: time24, label, available: !isPast });
  }

  return NextResponse.json({
    mode: 'preference',
    branchId,
    date,
    durationMinutes: durationMins,
    disclaimer: 'Your selected slot is a preference. We will confirm availability and call you shortly.',
    slots,
  });
}

import { Suspense } from 'react';
import type { Metadata } from 'next';
import BookingFlow from '@/components/booking/BookingFlow';
import { client } from '@/sanity/client';
import { getLocationsQuery, getBookingServicesQuery } from '@/sanity/lib/queries';
import type { BookingServiceRecord } from '@/fixtures/types';

export const revalidate = 0; // never cache — booking page must always be fresh

export const metadata: Metadata = {
  title: "Book an Appointment — Root's Family Salon Hyderabad",
  description:
    "Book a hair, skin, bridal, or grooming appointment at Root's The Family Salon. Choose from Uppal, Tarnaka, or Yamjal. Confirm in minutes.",
  robots: { index: false }, // booking page — don't index
};

export default async function BookPage() {
  const [cmsLocations, cmsServices] = await Promise.all([
    (client ? client.fetch(getLocationsQuery).catch(() => []) : Promise.resolve([])) as Promise<any[]>,
    (client ? client.fetch<BookingServiceRecord[]>(getBookingServicesQuery).catch(() => []) : Promise.resolve([])) as Promise<BookingServiceRecord[]>,
  ]);

  return (
    <Suspense fallback={<BookingPageSkeleton />}>
      <BookingFlow cmsLocations={cmsLocations ?? []} cmsServices={cmsServices ?? []} />
    </Suspense>
  );
}

function BookingPageSkeleton() {
  return (
    <div className="min-h-screen bg-parchment">
      {/* Progress skeleton */}
      <div className="w-full px-4 py-5 border-b border-obsidian/[0.08]">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="w-8 h-8 rounded-full animate-pulse bg-obsidian/10" />
              {i < 4 && <div className="flex-1 h-px mx-2 bg-obsidian/10" />}
            </div>
          ))}
        </div>
      </div>
      {/* Content skeleton */}
      <div className="max-w-xl mx-auto px-4 py-10 flex flex-col gap-6">
        <div className="h-4 w-24 rounded-full animate-pulse bg-obsidian/10" />
        <div className="h-10 w-3/4 rounded-xl animate-pulse bg-obsidian/10" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-28 rounded-2xl animate-pulse bg-obsidian/08" />
          ))}
        </div>
      </div>
    </div>
  );
}

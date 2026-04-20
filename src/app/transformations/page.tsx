import type { Metadata } from 'next';
import TransformationsClient from '@/components/sections/transformations/TransformationsClient';

export const metadata: Metadata = {
  title: "Transformations Gallery | Root's The Family Salon Hyderabad",
  description:
    "Browse real before & after transformations from Root's Salon — hair colour, balayage, HydraFacial, bridal makeovers, and fine-art tattoos in Hyderabad.",
  openGraph: {
    title: "Transformations Gallery | Root's The Family Salon",
    description:
      "Real before & after results. Hair, skin, bridal, and tattoo transformations from Root's The Family Salon.",
    type: 'website',
  },
};

export const revalidate = 60;

export default async function TransformationsPage() {
  const transformations: any[] = []; // Sanity fetching disabled — will be wired at final delivery

  return (
    <>
      <TransformationsClient cmsTransformations={transformations} />
    </>
  );
}


"use client";

import { usePathname } from "next/navigation";

/**
 * SiteChrome — wraps Header, Footer, WhatsApp, MobileCTA, BookingModal.
 * Hides all site chrome when the user is inside /studio (Sanity CMS).
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");

  if (isStudio) return null;

  return <>{children}</>;
}

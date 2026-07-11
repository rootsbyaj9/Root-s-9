// cn() — clsx + tailwind-merge. Deduplicates conflicting Tailwind classes.
// REQUIRES tailwind-merge v3+ for Tailwind CSS v4 compatibility.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

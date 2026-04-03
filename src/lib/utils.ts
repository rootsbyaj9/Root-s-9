/**
 * cn() — Class Name Utility
 *
 * Combines clsx (conditional class logic) with tailwind-merge
 * (deduplication of conflicting Tailwind classes).
 *
 * REQUIRES: tailwind-merge v3+ for Tailwind CSS v4 compatibility.
 *           tailwind-merge v2 does NOT understand v4 class names.
 *
 * Usage:
 *   cn("bg-parchment", isActive && "bg-linen")
 *   cn("text-obsidian font-sans", className)
 *
 * Import SplitType correctly — capital S:
 *   import SplitType from 'split-type';   ← correct
 *   import splitType from 'split-type';   ← wrong (fails at runtime)
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

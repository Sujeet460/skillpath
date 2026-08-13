import type { Course } from "../types";

/**
 * Formats a course's price based on the detected country code and request status.
 * - Loading: returns "Loading price..."
 * - Error or Unknown: returns "Price unavailable"
 * - Success (IN): formats using `pricePaise / 100` as INR (no decimal places, e.g. ₹1,999)
 * - Success (US): formats using `priceUsdCents / 100` as USD (with standard decimals, e.g. $39.99)
 * 
 * @param course The course object containing pricing info.
 * @param countryCode The ISO 3166-1 country code (or null if not resolved).
 * @param countryStatus The status of the country resolution request.
 */
export function formatCoursePrice(
  course: Course,
  countryCode: string | null,
  countryStatus: "loading" | "error" | "success"
): string {
  if (countryStatus === "loading") {
    return "Loading price...";
  }

  if (countryStatus === "error" || !countryCode) {
    return "Price unavailable";
  }

  const normalizedCode = countryCode.toUpperCase();

  if (normalizedCode === "IN") {
    const price = course.pricePaise / 100;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  } else if (normalizedCode === "US") {
    const price = course.priceUsdCents / 100;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  }

  return "Price unavailable";
}

"use client";

import { useEffect, useState } from "react";

const screens = {
  xxs: "320px",
  xs: "600px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

/**
 * Checks whether a particular Tailwind CSS viewport size applies.
 *
 * @param size The size to check, which must either be included in Tailwind CSS's
 * list of default screen sizes, or added to the Tailwind CSS config file.
 *
 * @returns A boolean indicating whether the viewport size applies.
 */
export const useBreakpoint = (size: keyof typeof screens) => {
  const [matches, setMatches] = useState(
    typeof window !== "undefined"
      ? window.matchMedia(`(min-width: ${screens[size]})`).matches
      : true,
  );

  useEffect(() => {
    const breakpoint = window.matchMedia(`(min-width: ${screens[size]})`);

    const handleChange = (value: MediaQueryListEvent) =>
      setMatches(value.matches);

    // Sync initial value via the listener pattern
    breakpoint.addEventListener("change", handleChange);
    handleChange({ matches: breakpoint.matches } as MediaQueryListEvent);
    return () => breakpoint.removeEventListener("change", handleChange);
  }, [size]);

  return matches;
};

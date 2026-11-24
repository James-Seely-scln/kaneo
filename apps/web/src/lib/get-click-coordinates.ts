import type { MouseEvent } from "react";

/**
 * Get click coordinates relative to the viewport as percentages.
 * Useful for positioning animations like circular reveals.
 *
 * @param event - The mouse event from a click handler
 * @returns Object with x and y coordinates as percentages (0-100)
 */
export function getClickCoordinates(event: MouseEvent<HTMLElement>): {
  x: number;
  y: number;
} {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
  const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;

  return { x, y };
}

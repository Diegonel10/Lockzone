import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function formatOdds(odds) {
  if (typeof odds !== 'number' || isNaN(odds)) {
    return '-';
  }
  return odds.toFixed(2);
}

/**
 * Square lattice emblem: a navy Korean window-lattice frame with a champagne-gold centre.
 * Used as the small section mark and as the "view more" button.
 */
export function LatticeMark({ className = "", filled = false }: { className?: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="4" y="4" width="56" height="56" fill="none" stroke="var(--color-navy)" strokeWidth="6" />
      <path d="M4 22h12V4M48 4v18h12M60 42H48v18M16 60V42H4" fill="none" stroke="var(--color-navy)" strokeWidth="5" />
      <rect x="20" y="20" width="24" height="24" fill={filled ? "var(--color-navy)" : "none"} stroke="var(--color-navy)" strokeWidth="5" />
      <rect x="26" y="26" width="12" height="12" fill="var(--color-gold)" />
    </svg>
  );
}

/** Small navy square outline (the floating accent squares). */
export function NavySquare({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`block border-[9px] border-navy ${className}`} />;
}

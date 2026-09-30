// Símbolo da Origo (o mesmo do site atual), com traço na cor do texto.
export function Simbolo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="55 35 115 155" className={className} aria-hidden>
      <path d="M 67.16 91.20 A 34 34 0 0 1 130.81 85.63" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
      <path d="M 84.99 43.98 A 58 58 0 0 1 147.51 133.27" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" opacity="0.55" />
      <path d="M 164.35 46.01 A 84 84 0 0 1 78.26 181.14" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.28" />
      <circle cx="100" cy="100" r="15" fill="#A8472A" />
    </svg>
  );
}

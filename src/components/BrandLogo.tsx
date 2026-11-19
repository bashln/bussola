interface BrandLogoProps {
  showTagline?: boolean;
  size?: "sm" | "md";
}

export function BrandLogo({ showTagline = false, size = "md" }: BrandLogoProps) {
  const iconSize = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const titleSize = size === "sm" ? "text-base" : "text-lg";

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`flex ${iconSize} shrink-0 items-center justify-center rounded-xl bg-blue-900 shadow-sm ring-1 ring-blue-950/10`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 64 64"
          fill="none"
          className="h-full w-full p-1"
        >
          <circle cx="32" cy="32" r="22" stroke="#93C5FD" strokeOpacity="0.35" strokeWidth="2.5" />
          <path
            d="M32 9v5M32 50v5M9 32h5M50 32h5"
            stroke="#93C5FD"
            strokeOpacity="0.6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <polygon points="32,14 40,32 32,28.5 24,32" fill="#F59E0B" />
          <polygon points="32,50 24,32 32,35.5 40,32" fill="#E2E8F0" />
          <circle cx="32" cy="32" r="3.5" fill="#FFFFFF" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`${titleSize} font-extrabold tracking-tight text-slate-900`}>
          Bússola
        </span>
        {showTagline && (
          <span className="mt-0.5 text-[11px] font-semibold tracking-wide text-blue-700 uppercase">
            Open Source · 100% Gratuito
          </span>
        )}
      </span>
    </span>
  );
}

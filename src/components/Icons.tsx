interface IconProps {
  className?: string;
  strokeWidth?: number;
}

const base = (className?: string) => className ?? "w-5 h-5";

/** 品牌咖啡豆标志 */
export function BeanMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M16 3.5c-6.2 0-11 5.6-11 12.5S9.8 28.5 16 28.5 27 22.9 27 16 22.2 3.5 16 3.5Z"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M16 6.5c2 3 2 7.2 0 10.4s-2 7.6 0 10.6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SearchIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.2" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="m15.4 15.4 5.1 5.1" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function BasketIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M4 9.5h16l-1.6 9a2 2 0 0 1-2 1.7H7.6a2 2 0 0 1-2-1.7L4 9.5Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M8.2 9.5 12 3.8l3.8 5.7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 13v3.5M14.5 13v3.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function MinusIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function ArrowIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M4 12h15m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className, strokeWidth = 2.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrashIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M4.5 6.5h15M9.5 6V4.8A1.3 1.3 0 0 1 10.8 3.5h2.4a1.3 1.3 0 0 1 1.3 1.3V6.5m3.2 0-.8 12a2 2 0 0 1-2 1.9H8.1a2 2 0 0 1-2-1.9l-.8-12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TruckIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M3 7.5h11v9H3zM14 10.5h4l3 3v3h-7z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <circle cx="7" cy="17.5" r="1.8" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="17.2" cy="17.5" r="1.8" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}

export function FlameIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M12 3.5c.6 3-3.9 5-3.9 9a5.9 5.9 0 0 0 11.8 0c0-2.6-1.5-4.4-2.7-5.8-.3 1.2-.9 2-1.9 2.6.4-2.3-.7-4.6-3.3-5.8Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MountainIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="m3 19 6.5-11L13 13.5 15.5 10 21 19H3Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LeafIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M5 19C5 9 12 5 19.5 4.5 19 12 15 19 5 19Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path d="M5 19c3-5 7-9 11-11" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function DropIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M12 3.5S6 10 6 14.5a6 6 0 0 0 12 0C18 10 12 3.5 12 3.5Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThermoIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M10 4a2 2 0 1 1 4 0v9.2a4.2 4.2 0 1 1-4 0V4Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path d="M12 9v7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function ScaleIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path d="M12 4v16M6 20h12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path
        d="m12 5-6.5 3.2a3.2 3.2 0 0 0 6.4.4L12 5Zm0 0 6.5 3.2a3.2 3.2 0 0 1-6.4.4L12 5Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GrinderIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M7 9.5h10l-.8 3.5H7.8L7 9.5Zm1.5 3.5L9.5 20h5l1-7M12 9.5V6m0 0a2.5 2.5 0 0 1 2.5-2.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17.5" cy="3.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function PinIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M12 21s-6.5-5.6-6.5-10.4a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.5" r="2.3" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={base(className)} aria-hidden="true">
      <path
        d="m12 3.6 2.5 5.2 5.7.7-4.2 4 1.1 5.6L12 16.4l-5.1 2.7 1.1-5.6-4.2-4 5.7-.7L12 3.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SpinnerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`spin ${base(className)}`} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** 烘焙度指示：五颗咖啡豆 */
export function RoastMeter({ level, className }: { level: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className ?? ""}`} aria-label={`烘焙度 ${level} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 16 16" className="w-3.5 h-3.5" aria-hidden="true">
          <path
            d="M8 1.8c-2.9 0-5.1 2.7-5.1 6.2s2.2 6.2 5.1 6.2 5.1-2.7 5.1-6.2S10.9 1.8 8 1.8Z"
            fill={i <= level ? "currentColor" : "none"}
            stroke="currentColor"
            strokeOpacity={i <= level ? 1 : 0.35}
            strokeWidth="1.3"
          />
          <path
            d="M8 3.4c.9 1.4.9 3.3 0 4.7s-.9 3.5 0 4.9"
            fill="none"
            stroke={i <= level ? "var(--color-espresso-950)" : "currentColor"}
            strokeOpacity={i <= level ? 0.85 : 0.35}
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </span>
  );
}

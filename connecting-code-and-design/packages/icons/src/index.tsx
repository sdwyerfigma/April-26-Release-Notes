import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

function IconBase({
  children,
  title,
  viewBox = "0 0 24 24",
  ...props
}: IconProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      fill="none"
      role={title ? "img" : "presentation"}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      viewBox={viewBox}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 11.5 12 5l8 6.5" />
      <path d="M6.5 10.5V19h11v-8.5" />
      <path d="M10 19v-4.5h4V19" />
    </IconBase>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="5.5" />
      <path d="m16 16 4 4" />
    </IconBase>
  );
}

export function GemIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6.5 8 12 4l5.5 4-5.5 12Z" />
      <path d="M6.5 8h11" />
      <path d="M9.2 8 12 4l2.8 4" />
    </IconBase>
  );
}

export function MapIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 6.5 10 4l4 2 5-2v13.5l-5 2-4-2-5 2Z" />
      <path d="M10 4v13.5" />
      <path d="M14 6v13.5" />
    </IconBase>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 10.25v5" />
      <path d="M12 7.25h.01" />
    </IconBase>
  );
}

export function BackArrowIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="m10 7-5 5 5 5" />
    </IconBase>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 5v10" />
      <path d="m8.5 8.5 3.5-3.5 3.5 3.5" />
      <path d="M6.5 12.5v5h11v-5" />
    </IconBase>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9 7 8 5-8 5Z" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function TicketIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 8.5A2.5 2.5 0 0 0 6.5 6H18v4a2 2 0 0 1 0 4v4H6.5A2.5 2.5 0 0 0 4 15.5Z" />
      <path d="M11 7.5v9" strokeDasharray="1.5 2" />
    </IconBase>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </IconBase>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m9 15 2-6 6-2-2 6Z" />
    </IconBase>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.5 7h15" />
      <path d="M7.5 12h9" />
      <path d="M10.5 17h3" />
    </IconBase>
  );
}

export function WalletIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.5 8.5A2.5 2.5 0 0 1 7 6h9.5a2 2 0 0 1 2 2v9.5a.5.5 0 0 1-.5.5H7A2.5 2.5 0 0 1 4.5 15.5Z" />
      <path d="M18.5 10.5h-5.25a1.25 1.25 0 0 0 0 2.5h5.25" />
    </IconBase>
  );
}

export function DirectionsIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m8 16 8-8" />
      <path d="M8 8h8v8" />
      <path d="M6 5.5h2.5" />
      <path d="M15.5 18.5H18" />
    </IconBase>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4.5 13.75 9 18 10.75 13.75 12.5 12 17l-1.75-4.5L6 10.75 10.25 9Z" />
    </IconBase>
  );
}

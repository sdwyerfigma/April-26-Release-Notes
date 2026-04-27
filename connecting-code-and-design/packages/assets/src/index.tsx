import type { CSSProperties, SVGProps } from "react";

type AssetProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function MuseumWordmark({
  title = "MOSF ticket",
  ...props
}: AssetProps) {
  return (
    <svg role="img" viewBox="0 0 420 155" {...props}>
      <title>{title}</title>
      <text
        fill="currentColor"
        fontFamily='"Arial Black", "Avenir Next Condensed", sans-serif'
        fontSize="104"
        fontWeight="900"
        x="0"
        y="92"
      >
        M
      </text>
      <text
        fill="currentColor"
        fontFamily='"Arial Black", "Avenir Next Condensed", sans-serif'
        fontSize="104"
        fontWeight="900"
        x="162"
        y="92"
      >
        SF
      </text>
      <g fill="currentColor" transform="translate(119 20)">
        <circle cx="12" cy="12" r="8" />
        <circle cx="38" cy="12" r="8" />
        <circle cx="25" cy="25" r="8" />
        <circle cx="12" cy="38" r="8" />
        <circle cx="38" cy="38" r="8" />
        <circle cx="25" cy="51" r="8" />
        <circle cx="12" cy="64" r="8" />
        <circle cx="38" cy="64" r="8" />
        <path d="M12 12 25 25 38 12 25 25 12 38 25 25 38 38 25 51 12 64 25 51 38 64" fill="none" stroke="currentColor" strokeWidth="6" />
      </g>
      <rect fill="#EAFF4E" height="48" rx="12" width="176" x="0" y="104" />
      <text
        fill="#1E1E1E"
        fontFamily='"Arial Black", "Avenir Next Condensed", sans-serif'
        fontSize="56"
        fontWeight="900"
        x="16"
        y="143"
      >
        TICKET
      </text>
    </svg>
  );
}

export function QrCodeArt({
  title = "QR code",
  ...props
}: AssetProps) {
  const cells = [
    "111010010111001",
    "100010111001011",
    "101110010101001",
    "100010111001111",
    "111010010111001",
    "000101001010100",
    "110010111100101",
    "101110100011101",
    "100100111010001",
    "111010001101111",
    "001111010010101",
    "111001101010011",
    "100011010111001",
    "101101001011101",
    "111001111001011"
  ];

  return (
    <svg role="img" viewBox="0 0 150 150" {...props}>
      <title>{title}</title>
      <rect fill="#fff" height="150" rx="12" width="150" />
      {cells.map((row, rowIndex) =>
        [...row].map((cell, columnIndex) =>
          cell === "1" ? (
            <rect
              key={`${rowIndex}-${columnIndex}`}
              fill="currentColor"
              height="8"
              rx="1"
              width="8"
              x={15 + columnIndex * 8}
              y={15 + rowIndex * 8}
            />
          ) : null
        )
      )}
      <rect fill="none" height="34" rx="4" stroke="currentColor" strokeWidth="6" width="34" x="12" y="12" />
      <rect fill="none" height="34" rx="4" stroke="currentColor" strokeWidth="6" width="34" x="104" y="12" />
      <rect fill="none" height="34" rx="4" stroke="currentColor" strokeWidth="6" width="34" x="12" y="104" />
    </svg>
  );
}

export function RouteMapArt({
  title = "Museum route map",
  ...props
}: AssetProps) {
  return (
    <svg role="img" viewBox="0 0 340 290" {...props}>
      <title>{title}</title>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M40 38c32 22 64 44 94 65 13 8 14 19 0 27L92 155c-17 10-16 22 1 31l41 22c10 5 22 4 30-2l31-24c11-8 25-9 37-4l48 21c10 4 22 3 31-3l23-16c10-7 10-21 0-28l-33-23c-10-7-22-7-32-1l-28 18c-11 7-24 8-35 2l-45-25c-12-7-13-18-1-26l46-31c11-7 11-20 0-27L132 0c-10-6-22-6-32 0L42 34c-8 5-8 11-2 4Z" />
        <path d="m165 57 39 22" />
        <path d="m132 120 40 22" />
        <path d="m73 172 43 24" />
        <path d="m240 172 42-27" />
      </g>
      {[
        { label: "A", x: 228, y: 70 },
        { label: "B", x: 94, y: 206 },
        { label: "C", x: 35, y: 146 },
        { label: "D", x: 118, y: 120 },
        { label: "E", x: 106, y: 52 },
        { label: "F", x: 150, y: 8 },
        { label: "H", x: 282, y: 155 }
      ].map((node) => (
        <g key={node.label} transform={`translate(${node.x} ${node.y})`}>
          <line stroke="#737E2A" strokeWidth="2" x1="0" x2="0" y1="10" y2="34" />
          <circle cx="0" cy="0" fill="#EAFF4E" r="13" />
          <text
            fill="#1E1E1E"
            fontFamily='Fragment Mono, "Avenir Next Condensed", sans-serif'
            fontSize="13"
            textAnchor="middle"
            y="4"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function AtriumArtwork({
  title = "Circular atrium illustration",
  style,
  ...props
}: AssetProps & { style?: CSSProperties }) {
  return (
    <svg role="img" viewBox="0 0 430 520" style={style} {...props}>
      <title>{title}</title>
      <defs>
        <linearGradient id="atrium-bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#665D57" />
          <stop offset="58%" stopColor="#D6C5AB" />
          <stop offset="100%" stopColor="#8A765F" />
        </linearGradient>
      </defs>
      <rect fill="url(#atrium-bg)" height="520" rx="26" width="430" />
      <ellipse cx="214" cy="116" fill="#D6E7F7" rx="208" ry="86" />
      <path
        d="M0 406c70-18 126-28 171-30 92-4 168 10 259 42v102H0Z"
        fill="rgba(255,255,255,0.25)"
      />
      <path
        d="m20 362 97-49 63 5 79 29 85 12"
        fill="none"
        stroke="#F8F7F1"
        strokeWidth="8"
      />
      <path
        d="M298 206h96v118h-128c4-37 15-71 32-102 0-11 0-16 0-16Z"
        fill="rgba(49,48,47,0.48)"
      />
      <rect fill="#D9E7F0" height="60" rx="16" width="82" x="314" y="240" />
      <rect fill="rgba(255,255,255,0.58)" height="44" rx="12" width="58" x="326" y="248" />
    </svg>
  );
}

export function OrbitalDiscArtwork({
  title = "Orbital museum disc illustration",
  ...props
}: AssetProps) {
  return (
    <svg role="img" viewBox="0 0 420 260" {...props}>
      <title>{title}</title>
      <defs>
        <linearGradient id="orbital-surface" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#F2F5FF" />
          <stop offset="55%" stopColor="#D4D9E9" />
          <stop offset="100%" stopColor="#9FADCB" />
        </linearGradient>
      </defs>
      <rect fill="#2F2B2A" height="260" rx="28" width="420" />
      <ellipse cx="210" cy="98" fill="#ECEFF9" rx="168" ry="72" />
      <ellipse cx="210" cy="102" fill="url(#orbital-surface)" rx="146" ry="59" />
      <path
        d="M66 128c56 18 102 27 139 27 44 0 96-12 156-34"
        fill="none"
        stroke="#EAFF4E"
        strokeDasharray="8 10"
        strokeWidth="4"
      />
      <circle cx="103" cy="128" fill="#EAFF4E" r="10" />
      <circle cx="301" cy="121" fill="#EAFF4E" r="10" />
      <path
        d="M134 196c22-18 50-27 84-27 39 0 74 10 104 31"
        fill="none"
        stroke="#CADFFF"
        strokeWidth="5"
      />
    </svg>
  );
}

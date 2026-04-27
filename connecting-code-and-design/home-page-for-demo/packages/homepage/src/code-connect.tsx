"use client";

import type { CSSProperties, ReactNode } from "react";

export type HomepageNavTarget = "home" | "explore" | "map" | "information";

export const colors = {
  ink: "#1E1E1E",
  white: "#FFFFFF",
  blue: "#CADFFF",
  lime: "#EAFF4E",
  muted: "rgba(30, 30, 30, 0.62)",
  line: "rgba(30, 30, 30, 0.12)"
} as const;

export const fonts = {
  display: '"Impact", "Arial Narrow", "Arial Black", "Avenir Next Condensed", sans-serif',
  body: '"Helvetica Neue", "Avenir Next", "Segoe UI", sans-serif',
  mono: '"Fragment Mono", "SFMono-Regular", "Menlo", "Monaco", "Liberation Mono", monospace'
} as const;

export const statusAssets = {
  cellular: "https://www.figma.com/api/mcp/asset/5d2b2979-1345-4dc5-ba48-52170561e1dd",
  wifi: "https://www.figma.com/api/mcp/asset/da5516be-26a8-4b36-ad44-bfb03c8b4b2a",
  battery: "https://www.figma.com/api/mcp/asset/835b2cdd-149d-4b40-9a61-8a113b4a2d37"
} as const;

export const homeAssets = {
  logo: "https://www.figma.com/api/mcp/asset/3b1b6164-7de4-41e4-b6d0-7edc29fd46ea",
  menu: "https://www.figma.com/api/mcp/asset/76504f81-4d6d-40d7-ba3a-ab31fc1cf246",
  actionArrow: "https://www.figma.com/api/mcp/asset/d9162f47-cc4b-49d0-bbc4-3ec452c8b149",
  heroDot: "https://www.figma.com/api/mcp/asset/fcce69f1-6017-49e3-8dad-5d66caaf2bef",
  whatsOnHero: "https://www.figma.com/api/mcp/asset/66c777c5-ca11-4011-8667-3560ff420947",
  membershipIllustration: "https://www.figma.com/api/mcp/asset/b4a15d80-f778-45f4-83fd-8e25a41053bd",
  toursDivider: "https://www.figma.com/api/mcp/asset/c08e7e81-171b-462d-b9be-3d3689cbbadd",
  upcomingDot: "https://www.figma.com/api/mcp/asset/a981920f-264d-4bc3-b2fb-bec3928818f1",
  upcomingReFinished: "https://www.figma.com/api/mcp/asset/3267b266-77c4-4bda-b650-fbf64d0af588",
  upcomingQuietSpectrum: "https://www.figma.com/api/mcp/asset/7af3953d-b4df-48f8-8f14-0d17e02e4c2a"
} as const;

export const navAssets = {
  home: "https://www.figma.com/api/mcp/asset/f88f8853-6abe-4059-98d3-10d91ec847ee",
  explore: "https://www.figma.com/api/mcp/asset/69c845bb-1544-4ec9-8288-14b15eadbbe9",
  map: "https://www.figma.com/api/mcp/asset/b64c9db0-abad-419a-9890-ad1f362ecac9",
  information: "https://www.figma.com/api/mcp/asset/0f468523-eecc-483a-9c43-3d3ae28f2ff5"
} as const;

export const homeEvents = [
  {
    date: "07.10.2026",
    title: "Preview: Atmospheric Thresholds",
    image: "https://www.figma.com/api/mcp/asset/4cd26962-4d11-4fc2-93f1-4a8a10d31cb2"
  },
  {
    date: "07.22.2026",
    title: "Opening Weekend: Post-Human Jewelry exhibition",
    image: "https://www.figma.com/api/mcp/asset/2a1db94f-ea54-4d5f-9452-d9bef580b109"
  },
  {
    date: "08.08.2026",
    title: "Artist talk: Keith Ellison discussing Controlled Release",
    image: "https://www.figma.com/api/mcp/asset/3ac37478-d2bb-44a1-b3f2-8d5b31a11e83"
  }
] as const;

export const homeTours = [
  {
    date: "01.29–04.27, 2026",
    title: "Metamaterial",
    badge: "On view",
    image: "https://www.figma.com/api/mcp/asset/dd73d645-18b1-4b13-a08c-2bbb0bfdaaba"
  },
  {
    date: "01.16–02.11, 2026",
    title: "Atmospheric",
    badge: "Ending soon",
    image: "https://www.figma.com/api/mcp/asset/d826f01b-517e-4565-ae76-0cafdd0edcd0"
  },
  {
    date: "03.11–05.07, 2026",
    title: "New Visions",
    badge: "On view",
    image: "https://www.figma.com/api/mcp/asset/e11a375a-99c8-4760-aac4-275e961a24b6"
  }
] as const;

export const homeUpcoming = [
  {
    date: "03.06–06.16, 2026",
    segments: ["Re:", "Finished"],
    image: homeAssets.upcomingReFinished
  },
  {
    date: "05.16–08.21, 2026",
    segments: ["The", "Quiet", "Spectrum"],
    image: homeAssets.upcomingQuietSpectrum
  }
] as const;

const eyebrowLabels = {
  whatsOn: "WHAT'S ON",
  events: "EVENTS",
  tours: "TOURS",
  upcoming: "UPCOMING"
} as const;

const heroVariants = {
  "spaceship-earth": {
    date: "01.29–04.27, 2026",
    image: homeAssets.whatsOnHero,
    segments: ["Spaceship", "Earth"] as const,
    segmentBackgrounds: [colors.blue, colors.lime] as const,
    dotSrc: homeAssets.heroDot,
    alt: "Spaceship Earth"
  },
  "re-furnished": {
    date: homeUpcoming[0].date,
    image: homeUpcoming[0].image,
    segments: homeUpcoming[0].segments,
    segmentBackgrounds: [colors.lime, colors.lime] as const,
    dotSrc: homeAssets.upcomingDot,
    alt: "Re Furnished"
  },
  "quiet-spectrum": {
    date: homeUpcoming[1].date,
    image: homeUpcoming[1].image,
    segments: homeUpcoming[1].segments,
    segmentBackgrounds: [colors.lime, colors.lime, colors.lime] as const,
    dotSrc: homeAssets.upcomingDot,
    alt: "The Quiet Spectrum"
  }
} as const;

const eventVariants = {
  preview: homeEvents[0],
  "opening-weekend": homeEvents[1],
  "artist-talk": homeEvents[2]
} as const;

const verticalVariants = {
  metamaterial: homeTours[0],
  atmospheric: homeTours[1],
  "new-visions": homeTours[2]
} as const;

export const homepageEventVariants = ["preview", "opening-weekend", "artist-talk"] as const;
export const homepageTourVariants = ["metamaterial", "atmospheric", "new-visions"] as const;
export const homepageUpcomingVariants = ["re-furnished", "quiet-spectrum"] as const;

export type HomepageActionButtonVariant = "tickets" | "explore";
export type HomepageHeroCardVariant = keyof typeof heroVariants;
export type HomepageEventRowVariant = keyof typeof eventVariants;
export type HomepageVerticalCardVariant = keyof typeof verticalVariants;
export type HomepageEyebrowLabel = keyof typeof eyebrowLabels;

const surfaceButtonStyle = {
  width: "100%",
  padding: 0,
  border: "none",
  textAlign: "left" as const,
  background: "transparent",
  cursor: "pointer"
};

export function AssetIcon({
  src,
  width,
  height,
  style
}: {
  src: string;
  width: number;
  height: number;
  style?: CSSProperties;
}) {
  return <img alt="" src={src} style={{ display: "block", width, height, ...style }} />;
}

function ActionArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="19"
      viewBox="0 0 19 19"
      width="19"
    >
      <circle cx="3.25" cy="7.1" fill="currentColor" r="1.1" />
      <circle cx="3.25" cy="11.9" fill="currentColor" r="1.1" />
      <circle cx="6.7" cy="9.5" fill="currentColor" r="1.1" />
      <path
        d="M5.8 9.5h8.1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <path
        d="m10.8 5.9 3.7 3.6-3.7 3.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CellularIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="12.226" viewBox="0 0 19.2 12.226" width="19.2">
      <rect x="1.2" y="7.726" width="3" height="3.3" rx="1" fill="currentColor" />
      <rect x="5.8" y="5.426" width="3" height="5.6" rx="1" fill="currentColor" />
      <rect x="10.4" y="3.126" width="3" height="7.9" rx="1" fill="currentColor" />
      <rect x="15" y="0.826" width="3" height="10.2" rx="1" fill="currentColor" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="12.328" viewBox="0 0 17.142 12.328" width="17.142">
      <path
        d="M1.5 4.85a10.35 10.35 0 0 1 14.15 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
      <path
        d="M4.05 7.35a6.55 6.55 0 0 1 9.05 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
      <path
        d="M6.8 9.75a2.55 2.55 0 0 1 3.55 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
      <circle cx="8.571" cy="10.7" r="1.15" fill="currentColor" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="13" viewBox="0 0 27.328 13" width="27.328">
      <rect
        x="1"
        y="1"
        width="22.5"
        height="11"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="3.4" y="3.4" width="17.6" height="6.2" rx="2.2" fill="currentColor" />
      <rect x="24.7" y="4.2" width="1.9" height="4.6" rx="0.95" fill="currentColor" />
    </svg>
  );
}

export function StatusBar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 16px 8px",
        color: colors.ink,
        fontFamily: fonts.body,
        fontSize: 17,
        fontWeight: 600
      }}
    >
      <span>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <CellularIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        color: colors.ink,
        fontFamily: fonts.mono,
        fontSize: 12,
        letterSpacing: 1.1,
        textTransform: "uppercase"
      }}
    >
      [{children}]
    </div>
  );
}

export function SectionDivider() {
  return (
    <div
      style={{
        height: 1,
        width: "100%",
        background: colors.line
      }}
    />
  );
}

export function HighlightSegments({
  segments,
  backgrounds,
  fontSize = 62
}: {
  segments: readonly string[];
  backgrounds?: readonly string[];
  fontSize?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        paddingRight: 2
      }}
    >
      {segments.map((segment, index) => (
        <span
          key={segment}
          style={{
            marginRight: -2,
            marginBottom: -2,
            padding: "0 8px",
            borderRadius: 12,
            background: backgrounds?.[index] ?? colors.lime,
            color: colors.ink,
            fontFamily: fonts.display,
            fontSize,
            lineHeight: 0.95,
            letterSpacing: fontSize >= 60 ? -1.24 : -0.72,
            textTransform: "uppercase"
          }}
        >
          {segment}
        </span>
      ))}
    </div>
  );
}

export function HomeDateRow({
  text,
  dotSrc = homeAssets.heroDot
}: {
  text: string;
  dotSrc?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: colors.muted,
        fontFamily: fonts.body,
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.4
      }}
    >
      <AssetIcon height={12} src={dotSrc} width={12} />
      <span>{text}</span>
    </div>
  );
}

export function HomeIndicator() {
  return (
    <div
      style={{
        width: 152,
        height: 5,
        borderRadius: 999,
        margin: "12px auto 8px",
        background: colors.ink
      }}
    />
  );
}

export function DefaultNav({
  onSelect
}: {
  onSelect?: (target: HomepageNavTarget) => void;
}) {
  const items: readonly HomepageNavTarget[] = ["home", "explore", "map", "information"];

  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        paddingTop: 14,
        background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.96) 78%)"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "fit-content",
          margin: "0 auto",
          gap: 0,
          padding: 4,
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(52px)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.16)"
        }}
      >
        {items.map((item) => {
          const isActive = item === "home";
          const iconWidth = item === "information" ? 13.2 : 22.8;

          return (
            <button
              key={item}
              onClick={() => onSelect?.(item)}
              style={{
                minWidth: 56,
                height: 56,
                padding: "0 24px",
                borderRadius: 999,
                border: "none",
                background: isActive ? colors.blue : "transparent",
                display: "grid",
                placeItems: "center",
                cursor: "pointer"
              }}
              type="button"
            >
              <AssetIcon height={22.8} src={navAssets[item]} width={iconWidth} />
            </button>
          );
        })}
      </div>
      <HomeIndicator />
    </div>
  );
}

function SurfaceButton({
  children,
  onClick
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} style={surfaceButtonStyle} type="button">
      {children}
    </button>
  );
}

export function HomepageActionButton({
  variant,
  label,
  onClick
}: {
  variant: HomepageActionButtonVariant;
  label?: string;
  onClick?: () => void;
}) {
  const resolvedLabel = label ?? (variant === "tickets" ? "Get tickets" : "Explore");

  return (
    <button
      onClick={onClick}
      style={{
        width: 197,
        border: "none",
        padding: 16,
        borderRadius: 32,
        background: "rgba(30,30,30,0.08)",
        display: "grid",
        justifyItems: "start",
        gap: 16,
        cursor: "pointer",
        textAlign: "left"
      }}
      type="button"
    >
      <span
        style={{
          fontFamily: fonts.body,
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 1.4,
          color: colors.ink
        }}
      >
        {resolvedLabel}
      </span>
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: 999,
          background: colors.white,
          display: "grid",
          placeItems: "center",
          color: colors.ink
        }}
      >
        <ActionArrowIcon />
      </span>
    </button>
  );
}

export function HomepageEyebrow({
  label = "whatsOn"
}: {
  label?: HomepageEyebrowLabel;
}) {
  return <Eyebrow>{eyebrowLabels[label]}</Eyebrow>;
}

export function HomepageHeroCard({
  variant,
  onClick
}: {
  variant: HomepageHeroCardVariant;
  onClick?: () => void;
}) {
  const item = heroVariants[variant];

  return (
    <SurfaceButton onClick={onClick}>
      <div
        style={{
          overflow: "hidden",
          borderRadius: 32,
          background: "rgba(30,30,30,0.08)"
        }}
      >
        <div
          style={{
            height: 299,
            overflow: "hidden",
            borderRadius: 24
          }}
        >
          <img
            alt={item.alt}
            className="preserve-image-color"
            src={item.image}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
        <div
          style={{
            display: "grid",
            gap: 24,
            padding: 16
          }}
        >
          <HomeDateRow dotSrc={item.dotSrc} text={item.date} />
          <HighlightSegments backgrounds={item.segmentBackgrounds} segments={item.segments} />
        </div>
      </div>
    </SurfaceButton>
  );
}

export function HomepageEventRow({
  variant,
  onClick
}: {
  variant: HomepageEventRowVariant;
  onClick?: () => void;
}) {
  const event = eventVariants[variant];

  return (
    <SurfaceButton onClick={onClick}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 132px",
          gap: 16,
          alignItems: "start",
          width: 398
        }}
      >
        <div
          style={{
            display: "grid",
            color: colors.ink,
            fontFamily: fonts.body,
            fontSize: 16,
            lineHeight: 1.4
          }}
        >
          <span style={{ color: colors.muted }}>{event.date}</span>
          <span>{event.title}</span>
        </div>
        <div
          style={{
            width: 132,
            height: 106,
            overflow: "hidden",
            borderRadius: 12
          }}
        >
          <img
            alt=""
            className="preserve-image-color"
            src={event.image}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
      </div>
    </SurfaceButton>
  );
}

export function HomepageVerticalCard({
  variant,
  onClick
}: {
  variant: HomepageVerticalCardVariant;
  onClick?: () => void;
}) {
  const tour = verticalVariants[variant];

  return (
    <SurfaceButton onClick={onClick}>
      <div style={{ display: "grid", gap: 16, width: 242 }}>
        <div
          style={{
            width: 242,
            height: 299,
            overflow: "hidden",
            borderRadius: 24
          }}
        >
          <img
            alt={tour.title}
            className="preserve-image-color"
            src={tour.image}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          <div
            style={{
              display: "grid",
              gap: 4,
              color: colors.ink
            }}
          >
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.4,
                color: colors.muted
              }}
            >
              {tour.date}
            </span>
            <span
              style={{
                fontFamily: fonts.display,
                fontSize: 36,
                lineHeight: 0.95,
                letterSpacing: -0.72,
                textTransform: "uppercase"
              }}
            >
              {tour.title}
            </span>
          </div>
          <span
            style={{
              width: "fit-content",
              padding: "8px",
              borderRadius: 8,
              background: colors.lime,
              fontFamily: fonts.mono,
              fontSize: 14,
              lineHeight: 1.3,
              letterSpacing: 0.14,
              textTransform: "uppercase"
            }}
          >
            {tour.badge}
          </span>
        </div>
      </div>
    </SurfaceButton>
  );
}

export function HomepageMembershipCard({
  ctaLabel = "View memberships",
  onClick
}: {
  ctaLabel?: string;
  onClick?: () => void;
}) {
  return (
    <SurfaceButton onClick={onClick}>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          minHeight: 188,
          padding: 16,
          borderRadius: 24,
          background: colors.blue,
          width: 398
        }}
      >
        <img
          alt=""
          className="preserve-image-color"
          src={homeAssets.membershipIllustration}
          style={{
            position: "absolute",
            left: -14,
            top: -46,
            width: 426.121,
            height: 280.121,
            maxWidth: "none"
          }}
        />
        <div
          style={{
            position: "relative",
            display: "grid",
            gap: 4,
            zIndex: 1
          }}
        >
          {["Join", "MOSF"].map((segment) => (
            <span
              key={segment}
              style={{
                width: "fit-content",
                padding: "0 8px",
                borderRadius: 12,
                background: colors.lime,
                color: colors.ink,
                fontFamily: fonts.display,
                fontSize: 62,
                lineHeight: 0.98,
                letterSpacing: -1.24,
                textTransform: "uppercase"
              }}
            >
              {segment}
            </span>
          ))}
        </div>
        <span
          style={{
            position: "relative",
            border: "none",
            padding: "8px 12px",
            borderRadius: 12,
            background: colors.ink,
            color: colors.white,
            fontFamily: fonts.body,
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.4,
            alignSelf: "center",
            flex: "0 0 auto",
            zIndex: 1
          }}
        >
          {ctaLabel}
        </span>
      </div>
    </SurfaceButton>
  );
}

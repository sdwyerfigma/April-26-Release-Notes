"use client";

import type { ReactNode } from "react";

import {
  HighlightSegments,
  HomeIndicator,
  HomeDateRow,
  HomepageActionButton,
  HomepageEyebrow,
  HomepageEventRow,
  HomepageHeroCard,
  HomepageVerticalCard,
  SectionDivider,
  StatusBar,
  colors,
  fonts,
  homeAssets,
  homepageEventVariants,
  homepageTourVariants,
  homepageUpcomingVariants
} from "@connecting-code-and-design/homepage/code-connect";
import type { HomepageNavTarget } from "@connecting-code-and-design/homepage/code-connect";

export type DarkHomepageScreenProps = {
  onOpenMenu?: () => void;
  onGetTickets?: () => void;
  onOpenExplore?: () => void;
  onOpenWhatsOn?: () => void;
  onViewAllTours?: () => void;
  onViewMemberships?: () => void;
  onViewAllUpcoming?: () => void;
  onOpenFeaturedTour?: () => void;
  onOpenFeaturedArt?: () => void;
  onSelectNav?: (target: HomepageNavTarget) => void;
};

const darkHeroVariants = {
  "spaceship-earth": {
    date: "01.29–04.27, 2026",
    image: homeAssets.whatsOnHero,
    segments: ["Spaceship", "Earth"] as const,
    segmentBackgrounds: [colors.lime, colors.lime] as const,
    dotSrc: homeAssets.heroDot,
    alt: "Spaceship Earth"
  }
} as const;

const membershipMarkPath = `M88.0605 109.771C95.2548 109.772 101.087 115.604 101.087 122.798C101.087 123.541 101.024 124.269 100.905 124.977C100.595 126.812 100.9 128.789 102.215 130.104L115.49 143.378C116.805 144.694 118.782 144.999 120.617 144.69C121.326 144.57 122.054 144.508 122.797 144.508C129.991 144.508 135.823 150.34 135.823 157.534C135.823 164.728 129.991 170.561 122.797 170.561C115.603 170.56 109.772 164.728 109.771 157.534C109.771 156.791 109.834 156.062 109.953 155.353C110.262 153.518 109.957 151.541 108.642 150.226L95.3668 136.952C94.0512 135.636 92.0748 135.331 90.2404 135.642C89.5316 135.762 88.8034 135.824 88.0605 135.824C87.3175 135.824 86.589 135.762 85.88 135.642C84.0454 135.332 82.0688 135.636 80.7532 136.952L67.4782 150.227C66.1626 151.542 65.8577 153.519 66.1675 155.354C66.2872 156.063 66.3496 156.791 66.3496 157.534C66.3496 164.728 60.5174 170.561 53.3232 170.561C46.129 170.561 40.2969 164.728 40.2969 157.534C40.2969 150.34 46.129 144.508 53.3232 144.508C54.0664 144.508 54.7951 144.57 55.5043 144.69C57.3391 144.999 59.316 144.694 60.6317 143.378L73.9046 130.105C75.2202 128.79 75.5252 126.813 75.2159 124.978C75.0964 124.269 75.0342 123.541 75.0342 122.798C75.0342 115.604 80.8663 109.771 88.0605 109.771ZM18.5869 40.2979C25.781 40.2979 31.613 46.1292 31.6133 53.3232C31.6133 54.0662 31.551 54.7947 31.4315 55.5038C31.1221 57.3383 31.4271 59.3149 32.7426 60.6304L46.016 73.9045C47.3316 75.2202 49.3083 75.5252 51.143 75.2159C51.8519 75.0964 52.5803 75.0342 53.3232 75.0342C60.5174 75.0342 66.3496 80.8664 66.3496 88.0605C66.3496 95.2548 60.5175 101.087 53.3232 101.087C52.58 101.087 51.8513 101.025 51.1421 100.905C49.3073 100.595 47.3305 100.9 46.0148 102.216L32.7422 115.488C31.4264 116.804 31.1215 118.781 31.4312 120.616C31.5509 121.325 31.6133 122.054 31.6133 122.798C31.6131 129.992 25.781 135.824 18.5869 135.824C11.3928 135.824 5.56077 129.992 5.56055 122.798C5.56055 115.604 11.3927 109.771 18.5869 109.771C19.3296 109.771 20.0577 109.834 20.7664 109.953C22.601 110.263 24.5775 109.958 25.8931 108.642L39.1676 95.3667C40.4831 94.0511 40.788 92.0747 40.4787 90.2402C40.3591 89.5315 40.2969 88.8033 40.2969 88.0605C40.2969 87.3171 40.3591 86.5882 40.4786 85.8787C40.7877 84.0438 40.4828 82.0668 39.167 80.751L25.8943 67.4783C24.5786 66.1626 22.6019 65.8578 20.7673 66.1675C20.0583 66.2872 19.3299 66.3496 18.5869 66.3496C11.3927 66.3496 5.56055 60.5175 5.56055 53.3232C5.56079 46.1292 11.3928 40.2979 18.5869 40.2979ZM157.534 40.2979C164.728 40.2979 170.56 46.1292 170.561 53.3232C170.561 60.5175 164.728 66.3496 157.534 66.3496C156.791 66.3496 156.063 66.2872 155.354 66.1676C153.519 65.8578 151.542 66.1626 150.227 67.4784L136.952 80.7532C135.636 82.0688 135.331 84.0455 135.641 85.8802C135.761 86.5891 135.823 87.3175 135.823 88.0605C135.823 88.8031 135.761 89.531 135.641 90.2395C135.332 92.0739 135.637 94.0501 136.952 95.3656L150.227 108.642C151.542 109.957 153.519 110.262 155.354 109.953C156.063 109.834 156.791 109.772 157.534 109.771C164.728 109.771 170.561 115.604 170.561 122.798C170.56 129.992 164.728 135.824 157.534 135.824C150.34 135.824 144.509 129.992 144.509 122.798C144.509 122.055 144.571 121.326 144.691 120.617C145 118.782 144.695 116.805 143.379 115.489L130.104 102.215C128.789 100.9 126.812 100.595 124.977 100.905C124.268 101.025 123.54 101.087 122.797 101.087C115.603 101.087 109.771 95.2546 109.771 88.0605C109.772 80.8665 115.603 75.0344 122.797 75.0342C123.54 75.0342 124.268 75.0964 124.977 75.216C126.812 75.5253 128.788 75.2204 130.104 73.9048L143.379 60.6305C144.695 59.3149 145 57.3382 144.691 55.5035C144.571 54.7946 144.509 54.0662 144.509 53.3232C144.509 46.1294 150.34 40.2981 157.534 40.2979ZM88.0605 75.0342C95.2547 75.0342 101.087 80.8664 101.087 88.0605C101.087 95.2548 95.2548 101.087 88.0605 101.087C80.8663 101.087 75.0342 95.2548 75.0342 88.0605C75.0342 80.8663 80.8663 75.0342 88.0605 75.0342ZM122.797 5.56055C129.991 5.56055 135.823 11.3927 135.823 18.5869C135.823 25.7811 129.991 31.6133 122.797 31.6133C122.054 31.6133 121.326 31.5509 120.617 31.4312C118.782 31.1215 116.805 31.4264 115.489 32.7421L102.216 46.0159C100.901 47.3316 100.596 49.3082 100.905 51.1429C101.025 51.8519 101.087 52.5803 101.087 53.3232C101.087 60.5175 95.2548 66.3496 88.0605 66.3496C80.8663 66.3496 75.0342 60.5175 75.0342 53.3232C75.0342 52.5803 75.0964 51.8519 75.2159 51.1429C75.5252 49.3082 75.2203 47.3316 73.9047 46.0159L60.6317 32.7422C59.316 31.4264 57.3391 31.1215 55.5043 31.4312C54.7951 31.5509 54.0665 31.6133 53.3232 31.6133C46.129 31.6133 40.2969 25.7811 40.2969 18.5869C40.2969 11.3927 46.129 5.56055 53.3232 5.56055C60.5175 5.56057 66.3496 11.3927 66.3496 18.5869C66.3496 19.3297 66.2872 20.0578 66.1675 20.7665C65.8577 22.601 66.1626 24.5776 67.4782 25.8931L80.7533 39.1675C82.0689 40.483 84.0455 40.7881 85.8802 40.4793C86.5892 40.3599 87.3176 40.2979 88.0605 40.2979C88.8033 40.2979 89.5314 40.36 90.2402 40.4793C92.0747 40.7882 94.0511 40.4832 95.3667 39.1678L108.642 25.8943C109.957 24.5786 110.262 22.6018 109.953 20.767C109.834 20.0581 109.771 19.3298 109.771 18.5869C109.771 11.3928 115.603 5.56078 122.797 5.56055Z`;

function MuseumMarkIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="36.289"
      viewBox="0 0 36.29 36.289"
      width="36.29"
    >
      <g fill="currentColor">
        <circle cx="18.145" cy="4.9" r="2.2" />
        <circle cx="28.2" cy="8.4" r="2.2" />
        <circle cx="8.1" cy="8.4" r="2.2" />
        <circle cx="31.4" cy="18.145" r="2.2" />
        <circle cx="4.9" cy="18.145" r="2.2" />
        <circle cx="28.2" cy="27.9" r="2.2" />
        <circle cx="8.1" cy="27.9" r="2.2" />
        <circle cx="18.145" cy="31.389" r="2.2" />
        <circle cx="18.145" cy="18.145" r="2.2" />
      </g>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      >
        <path d="M8.1 8.4 18.145 18.145 28.2 8.4" />
        <path d="M4.9 18.145h8.2" />
        <path d="M23.2 18.145h8.2" />
        <path d="M8.1 27.9 18.145 18.145 28.2 27.9" />
      </g>
    </svg>
  );
}

function HomepageWordmark() {
  return (
    <div
      aria-label="Museum of Speculative Futures"
      style={{
        width: 180,
        height: 91.728,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: colors.ink,
        fontFamily: '"Arial Black", "Avenir Next Condensed", "Helvetica Neue", sans-serif',
        fontSize: 31,
        fontWeight: 900,
        lineHeight: 0.9,
        letterSpacing: -1.1
      }}
    >
      <span style={{ display: "block" }}>Museum of</span>
      <span style={{ display: "block" }}>Speculative</span>
      <span style={{ display: "block" }}>Futures</span>
    </div>
  );
}

function MembershipLogomark({
  x,
  y
}: {
  x: number;
  y: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${165 / 177})`}>
      <path d={membershipMarkPath} fill="#CADFFF" stroke="#EAFF4E" strokeWidth="2" />
    </g>
  );
}

function NavHomeIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="22.8" viewBox="0 0 23 23" width="22.8">
      <path
        d="M4.8 10.2 11.4 4.9l6.6 5.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
      <path
        d="M6.6 9.4v8h3.2v-4.5h3.2v4.5h3.2v-8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function NavExploreIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="22.8" viewBox="0 0 23 23" width="22.8">
      <circle cx="9.7" cy="9.7" r="4.7" stroke="currentColor" strokeWidth="1.9" />
      <path
        d="m13.1 13.1 4.7 4.7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.9"
      />
      <circle cx="16.8" cy="6.2" fill="currentColor" r="1.1" />
      <circle cx="18.4" cy="9.1" fill="currentColor" r="1.1" />
      <circle cx="15.4" cy="9" fill="currentColor" r="1.1" />
    </svg>
  );
}

function NavMapIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="22.8" viewBox="0 0 23 23" width="22.8">
      <path
        d="m11.4 4.8 4.8 2.8v5.5l-4.8 4.1-4.8-4.1V7.6l4.8-2.8Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
      <circle cx="11.4" cy="10.6" fill="currentColor" r="1.2" />
    </svg>
  );
}

function NavInformationIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="22.8" viewBox="0 0 14 23" width="13.2">
      <circle cx="7" cy="4.4" fill="currentColor" r="1.3" />
      <path
        d="M7 9.1v8.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.9"
      />
      <path
        d="M4.7 17.3H9.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function DarkDefaultNav({
  onSelect
}: {
  onSelect?: (target: HomepageNavTarget) => void;
}) {
  const items: readonly HomepageNavTarget[] = ["home", "explore", "map", "information"];

  const icons: Record<HomepageNavTarget, ReactNode> = {
    home: <NavHomeIcon />,
    explore: <NavExploreIcon />,
    map: <NavMapIcon />,
    information: <NavInformationIcon />
  };

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
                cursor: "pointer",
                color: colors.ink
              }}
              type="button"
            >
              {icons[item]}
            </button>
          );
        })}
      </div>
      <HomeIndicator />
    </div>
  );
}

function DarkMembershipCard({
  ctaLabel = "View memberships",
  onClick
}: {
  ctaLabel?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="preserve-image-color"
      onClick={onClick}
      style={{
        width: "100%",
        padding: 0,
        border: "none",
        textAlign: "left",
        background: "transparent",
        cursor: "pointer"
      }}
      type="button"
    >
      <div
        style={{
          position: "relative",
          width: 398,
          height: 148,
          overflow: "hidden",
          borderRadius: 24,
          background: "#352000"
        }}
      >
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0
          }}
          viewBox="0 0 398 148"
        >
          <MembershipLogomark x={84.5605} y={-86.4395} />
          <MembershipLogomark x={-22.4395} y={17.5605} />
          <MembershipLogomark x={227.5605} y={-15.4395} />
        </svg>

        <div
          style={{
            position: "absolute",
            left: 16,
            top: 16,
            width: 162,
            height: 116
          }}
        >
          {[
            { label: "JOIN", width: 127 },
            { label: "MOSF", width: 162 }
          ].map((item, index) => (
            <span
              key={item.label}
              style={{
                position: "absolute",
                left: 0,
                top: index === 0 ? 0 : 63,
                width: item.width,
                height: 59,
                padding: "1px 7px 2px 7px",
                borderRadius: 12,
                background: "#1500B1",
                color: "#E1E1E1",
                display: "flex",
                alignItems: "flex-start",
                fontFamily: fonts.display,
                fontSize: 62,
                lineHeight: "58.9px",
                letterSpacing: -1.24,
                textTransform: "uppercase"
              }}
            >
              {item.label}
            </span>
          ))}
        </div>

        <span
          style={{
            position: "absolute",
            left: 225,
            top: 94,
            width: 157,
            height: 38,
            borderRadius: 12,
            background: "#E1E1E1",
            color: "#1E1E1E",
            display: "grid",
            placeItems: "center",
            fontFamily: fonts.body,
            fontSize: 16,
            fontWeight: 600,
            lineHeight: 1.4
          }}
        >
          {ctaLabel}
        </span>
      </div>
    </button>
  );
}

function DarkHomepageHeroCard({
  variant,
  onClick
}: {
  variant: keyof typeof darkHeroVariants;
  onClick?: () => void;
}) {
  const item = darkHeroVariants[variant];

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: 0,
        border: "none",
        textAlign: "left",
        background: "transparent",
        cursor: "pointer"
      }}
      type="button"
    >
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
    </button>
  );
}

export function DarkHomepageScreen({
  onOpenMenu,
  onGetTickets,
  onOpenExplore,
  onOpenWhatsOn,
  onViewAllTours,
  onViewMemberships,
  onViewAllUpcoming,
  onOpenFeaturedTour,
  onOpenFeaturedArt,
  onSelectNav
}: DarkHomepageScreenProps) {
  return (
    <div style={{ minHeight: "100dvh", background: colors.white }}>
      <div
        style={{
          marginBottom: -32,
          background: colors.blue,
          overflow: "hidden"
        }}
      >
        <StatusBar />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "16px 16px 56px"
          }}
        >
          <HomepageWordmark />
          <button
            onClick={onOpenMenu}
            style={{
              width: 36.29,
              height: 36.289,
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              color: colors.ink
            }}
            type="button"
          >
            <MuseumMarkIcon />
          </button>
        </div>
      </div>
      <div
        style={{
          marginBottom: -32,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          background: colors.white,
          boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
          padding: "24px 16px 160px",
          display: "grid",
          gap: 48
        }}
      >
        <div style={{ display: "grid", gap: 24 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 4
            }}
          >
            <HomepageActionButton onClick={onGetTickets} variant="tickets" />
            <HomepageActionButton onClick={onOpenExplore} variant="explore" />
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            <HomepageEyebrow label="whatsOn" />
            <DarkHomepageHeroCard onClick={onOpenWhatsOn} variant="spaceship-earth" />
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            <HomepageEyebrow label="events" />
            <div style={{ display: "grid", gap: 16 }}>
              {homepageEventVariants.map((variant, index) => (
                <div key={variant} style={{ display: "grid", gap: 16 }}>
                  <HomepageEventRow variant={variant} />
                  {index < homepageEventVariants.length - 1 ? <SectionDivider /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <HomepageEyebrow label="tours" />
            <button
              onClick={onViewAllTours}
              style={{
                border: "none",
                padding: "8px 12px",
                borderRadius: 12,
                background: "rgba(30,30,30,0.08)",
                fontFamily: fonts.body,
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.4,
                color: colors.ink,
                cursor: "pointer"
              }}
              type="button"
            >
              View all
            </button>
          </div>
          <div
            style={{
              display: "flex",
              gap: 32,
              alignItems: "flex-end",
              overflowX: "auto",
              paddingBottom: 4,
              scrollbarWidth: "none"
            }}
          >
            {homepageTourVariants.map((variant, index) => (
              <div
                key={variant}
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "flex-end"
                }}
              >
                <HomepageVerticalCard variant={variant} />
                {index < homepageTourVariants.length - 1 ? (
                  <img
                    alt=""
                    src={homeAssets.toursDivider}
                    style={{
                      width: 1,
                      height: 223,
                      flex: "0 0 auto"
                    }}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <DarkMembershipCard onClick={onViewMemberships} />

        <div style={{ display: "grid", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <HomepageEyebrow label="upcoming" />
            <button
              onClick={onViewAllUpcoming}
              style={{
                border: "none",
                padding: "8px 12px",
                borderRadius: 12,
                background: "rgba(30,30,30,0.08)",
                fontFamily: fonts.body,
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.4,
                color: colors.ink,
                cursor: "pointer"
              }}
              type="button"
            >
              View all
            </button>
          </div>
          <div style={{ display: "grid", gap: 24 }}>
            {homepageUpcomingVariants.map((variant, index) => (
              <HomepageHeroCard
                key={variant}
                onClick={index === 0 ? onOpenFeaturedTour : onOpenFeaturedArt}
                variant={variant}
              />
            ))}
          </div>
        </div>
      </div>
      <DarkDefaultNav onSelect={onSelectNav} />
    </div>
  );
}

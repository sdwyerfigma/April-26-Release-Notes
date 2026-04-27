"use client";

import {
  DefaultNav,
  HomepageActionButton,
  HomepageEyebrow,
  HomepageEventRow,
  HomepageHeroCard,
  HomepageMembershipCard,
  HomepageVerticalCard,
  SectionDivider,
  StatusBar,
  colors,
  homeAssets,
  homepageEventVariants,
  homepageTourVariants,
  homepageUpcomingVariants
} from "./code-connect";
import type { HomepageNavTarget } from "./code-connect";

export type HomepageScreenProps = {
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

export function HomepageScreen({
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
}: HomepageScreenProps) {
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
          padding: "24px 16px 120px",
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
            <HomepageHeroCard onClick={onOpenWhatsOn} variant="spaceship-earth" />
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
                fontFamily: '"Helvetica Neue", "Avenir Next", "Segoe UI", sans-serif',
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

        <HomepageMembershipCard onClick={onViewMemberships} />

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
                fontFamily: '"Helvetica Neue", "Avenir Next", "Segoe UI", sans-serif',
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
      <DefaultNav onSelect={onSelectNav} />
    </div>
  );
}

export * from "./code-connect";

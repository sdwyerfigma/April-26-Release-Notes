"use client";

import { startTransition, useState } from "react";
import { HomepageScreen } from "@connecting-code-and-design/homepage";
import { DirectionsIcon, PlusIcon } from "@connecting-code-and-design/icons";

type ScreenId =
  | "home"
  | "explore"
  | "art-detail"
  | "tour-landing"
  | "virtual-tour"
  | "map"
  | "information"
  | "ticket";

type Category =
  | "All"
  | "Technology"
  | "Fashion"
  | "Bio Art"
  | "Soundscapes"
  | "Architecture";

type ArtItem = {
  id: string;
  title: string;
  label: string;
  category: Exclude<Category, "All">;
  image: string;
  size: "small" | "large";
  description: string;
  artist: string;
  materials: string;
  dimensions: string;
};

const colors = {
  ink: "#1E1E1E",
  white: "#FFFFFF",
  paper: "#F6F5F1",
  line: "rgba(30, 30, 30, 0.12)",
  lineDark: "rgba(255, 255, 255, 0.14)",
  muted: "rgba(30, 30, 30, 0.62)",
  mutedDark: "rgba(255, 255, 255, 0.62)",
  slate: "#323131",
  slateRaised: "#3D3A39",
  slateSoft: "rgba(255, 255, 255, 0.08)",
  blue: "#CADFFF",
  lime: "#EAFF4E",
  shadow: "0 20px 40px rgba(17, 17, 17, 0.18)"
} as const;

const fonts = {
  display: '"Impact", "Arial Narrow", "Arial Black", "Avenir Next Condensed", sans-serif',
  body: '"Helvetica Neue", "Avenir Next", "Segoe UI", sans-serif',
  mono: '"Fragment Mono", "SFMono-Regular", "Menlo", "Monaco", "Liberation Mono", monospace'
} as const;

const figmaAssets = {
  searchField: "https://www.figma.com/api/mcp/asset/0d059fc4-0774-41e3-b02b-113c536abf74",
  headers: {
    artDetailBack: "https://www.figma.com/api/mcp/asset/83cb9323-4004-48f4-8a46-5fcec35aaa72",
    artDetailShare: "https://www.figma.com/api/mcp/asset/0bb56525-23fc-40c8-9086-95884b09c931",
    ticketBack: "https://www.figma.com/api/mcp/asset/485cd557-1af5-4161-bbe1-d0d966bbe6dd",
    ticketHome: "https://www.figma.com/api/mcp/asset/ee3a6d15-74d9-457f-b2a9-6640b6a3d7e9",
    virtualBack: "https://www.figma.com/api/mcp/asset/f46b0115-d6bf-403e-b533-d153b1370ab0",
    virtualShare: "https://www.figma.com/api/mcp/asset/2f0bddc7-8984-4cac-b3b8-26384f02bbf0"
  },
  nav: {
    home: {
      home: "https://www.figma.com/api/mcp/asset/f88f8853-6abe-4059-98d3-10d91ec847ee",
      explore: "https://www.figma.com/api/mcp/asset/69c845bb-1544-4ec9-8288-14b15eadbbe9",
      map: "https://www.figma.com/api/mcp/asset/b64c9db0-abad-419a-9890-ad1f362ecac9",
      information: "https://www.figma.com/api/mcp/asset/0f468523-eecc-483a-9c43-3d3ae28f2ff5"
    },
    explore: {
      home: "https://www.figma.com/api/mcp/asset/d3f34e59-93e7-4821-950d-415db62664a6",
      explore: "https://www.figma.com/api/mcp/asset/8c4287e9-e774-4831-a5cc-a2deb70a4345",
      map: "https://www.figma.com/api/mcp/asset/1c25e923-658d-47a2-a454-f6219ce366c2",
      information: "https://www.figma.com/api/mcp/asset/5882b70a-8d27-4f74-a878-8585a10d28ea"
    },
    map: {
      home: "https://www.figma.com/api/mcp/asset/26bcad3d-0c5a-48fb-8417-f1bc7d4c7d72",
      explore: "https://www.figma.com/api/mcp/asset/286718a7-c7ed-4104-a8cc-339b03b62fd3",
      map: "https://www.figma.com/api/mcp/asset/c440a157-dff6-48b5-993c-73dd9402859d",
      information: "https://www.figma.com/api/mcp/asset/b0c3cc80-0321-4dcb-be3a-c55001543e08"
    },
    information: {
      home: "https://www.figma.com/api/mcp/asset/df158026-1183-407b-a788-53a29ede392d",
      explore: "https://www.figma.com/api/mcp/asset/893a4d50-4a13-4cb2-9ee2-aa950aef784f",
      map: "https://www.figma.com/api/mcp/asset/c8288b7f-40a4-4a7e-af9d-dbb5a0ba856c",
      information: "https://www.figma.com/api/mcp/asset/fb11af6b-f9de-469e-984f-e2d9d1b8bba0"
    }
  },
  tourLanding: {
    leftGlow: "https://www.figma.com/api/mcp/asset/61844fbc-3bf1-4cc3-a996-241bdefeeed7",
    leftIcon: "https://www.figma.com/api/mcp/asset/2027324b-c8ae-4d2c-b0c0-fe7451c77fe5",
    centerIcon: "https://www.figma.com/api/mcp/asset/21b6b3e0-dee3-4929-892e-b9638c6fafae",
    rightGlow: "https://www.figma.com/api/mcp/asset/c68bc88b-29bf-4d9a-915a-660b1770cebd",
    rightIcon: "https://www.figma.com/api/mcp/asset/b17dc5be-9896-4f44-b35d-bce00e2695fb"
  },
  virtualTourPlayer: {
    expand: "https://www.figma.com/api/mcp/asset/bc974901-815d-4dea-9d3a-72b03cefdf0e",
    pauseLeft: "https://www.figma.com/api/mcp/asset/248623f3-7099-4754-ae60-fa340d49c628",
    pauseRight: "https://www.figma.com/api/mcp/asset/d37d47fb-e4c1-41b7-877e-98d084c5fc0c",
    playhead: "https://www.figma.com/api/mcp/asset/cef60f74-0436-4bbd-b9fb-f3233eab8f39"
  }
} as const;

const statusLight = {
  cellular: "https://www.figma.com/api/mcp/asset/5d2b2979-1345-4dc5-ba48-52170561e1dd",
  wifi: "https://www.figma.com/api/mcp/asset/da5516be-26a8-4b36-ad44-bfb03c8b4b2a",
  battery: "https://www.figma.com/api/mcp/asset/835b2cdd-149d-4b40-9a61-8a113b4a2d37"
} as const;

const statusDark = {
  cellular: "https://www.figma.com/api/mcp/asset/e2e6ddf6-4552-4c26-bb68-e4c4d46060b6",
  wifi: "https://www.figma.com/api/mcp/asset/c5088624-967b-4a5c-bf2f-3b554489bc24",
  battery: "https://www.figma.com/api/mcp/asset/4c77e624-eae2-4e3c-b432-36506b7baa5f"
} as const;

const images = {
  featured: "https://www.figma.com/api/mcp/asset/dff0513c-d848-45f0-b746-2952d0e02b3e",
  syntheticBioCapsule: "https://www.figma.com/api/mcp/asset/9dfcc564-0a03-44c7-8327-ad693d567054",
  arborealBiodome: "https://www.figma.com/api/mcp/asset/86498485-e99f-4df8-b773-e976a21a902e",
  adaptiveSuit: "https://www.figma.com/api/mcp/asset/7844540c-58bc-4fd3-8eb3-b2777ce351e2",
  aridResearchStation: "https://www.figma.com/api/mcp/asset/3038f4ff-611c-4991-8952-caaccd425062",
  subterraneanAtrium: "https://www.figma.com/api/mcp/asset/0d4b7b53-58cc-4b4b-832b-370dfba39e4a",
  modularLiving: "https://www.figma.com/api/mcp/asset/57d119ab-5838-408e-8caa-eb9e6a2ccdcd",
  atmosphericHarvester: "https://www.figma.com/api/mcp/asset/421be2b5-3311-44f1-a26a-b1111b3d79cb",
  terraformTopography: "https://www.figma.com/api/mcp/asset/37ab6908-2a3c-4ebe-a261-440b8142a120",
  tourLandingHero: "https://www.figma.com/api/mcp/asset/038b47b0-228c-4d0c-9c72-1acc1741f7e8",
  virtualTourPanel: "https://www.figma.com/api/mcp/asset/7092869b-66bb-4f90-b109-6a44c43ca1be",
  membershipIllustration: "https://www.figma.com/api/mcp/asset/bc39695c-d653-4abf-918d-6964c1f85163",
  mapVector: "https://www.figma.com/api/mcp/asset/9aa8998b-5fb5-41ed-bf7f-c62a8ab1dd1e",
  mapCardImage: "https://www.figma.com/api/mcp/asset/c86aa480-00c0-49a4-995c-75c643d2c9fc",
  artistCamille: "https://www.figma.com/api/mcp/asset/6a837480-a3cc-44ea-a2d0-15c41604d26a",
  artistJiyheon: "https://www.figma.com/api/mcp/asset/6f337e38-b831-420c-80de-3fa78015a8c3",
  artistDan: "https://www.figma.com/api/mcp/asset/791e5972-db38-4c73-8d1f-14de2a18604b",
  ticketLogo: "https://www.figma.com/api/mcp/asset/e061f3ab-5b47-4c28-ae8e-2861398b73ed",
  qr0: "https://www.figma.com/api/mcp/asset/23b2fa78-7b24-4876-a717-25ac9cea5ffa",
  qr1: "https://www.figma.com/api/mcp/asset/2b3bf580-eac9-4426-9191-d4264295c89c",
  qr2: "https://www.figma.com/api/mcp/asset/8cace791-a2a2-4f3e-9af9-09159bca95d2",
  qr3: "https://www.figma.com/api/mcp/asset/46d5cce1-f422-4adb-8a54-dde2ea3904c2",
  qr4: "https://www.figma.com/api/mcp/asset/0b2dfd07-ec0c-4470-864b-66f23b687053",
  qr5: "https://www.figma.com/api/mcp/asset/d4c4d9a6-633d-4f07-a699-cf09301da3c7",
  qr6: "https://www.figma.com/api/mcp/asset/041f1083-13f1-464e-84b1-1d90bc0c9fb1",
  qr7: "https://www.figma.com/api/mcp/asset/faf31cf9-90eb-450b-b977-24dc053739d7"
} as const;

const categories: readonly Category[] = [
  "All",
  "Technology",
  "Fashion",
  "Bio Art",
  "Soundscapes",
  "Architecture"
];

const artItems: readonly ArtItem[] = [
  {
    id: "synthetic-bio-capsule",
    title: "Synthetic Bio-Capsule",
    label: "Food & Agriculture",
    category: "Technology",
    image: images.syntheticBioCapsule,
    size: "small",
    description:
      "Synthetic Bio-Capsule reframes future food systems as ceremonial objects, mixing bio-resin form with candy-toned nutrient pods and mirrored surfaces.",
    artist: "Camille Vosk",
    materials: "Bio-resin shell, nutrient gel cores, mirrored cellulose film.",
    dimensions: "18 x 8 x 8 in. (45.7 x 20.3 x 20.3 cm)"
  },
  {
    id: "arboreal-biodome",
    title: "Arboreal Biodome",
    label: "Fashion",
    category: "Fashion",
    image: images.arborealBiodome,
    size: "large",
    description:
      "Arboreal Biodome proposes an amber geodesic refuge whose translucent skin adapts to weather, crowds, and shifting social rituals.",
    artist: "Ana Voss",
    materials: "Amber composite lattice, adaptive membrane, brass node system.",
    dimensions: "24 ft diameter, variable canopy sections"
  },
  {
    id: "adaptive-suit",
    title: "Adaptive Suit",
    label: "Fashion",
    category: "Fashion",
    image: images.adaptiveSuit,
    size: "large",
    description:
      "Adaptive Suit turns outerwear into a responsive interface through quilted chambers, reflective piping, and embedded light panels.",
    artist: "Noor Fallon",
    materials: "Shape-memory nylon, reflective quilting, micro-led piping.",
    dimensions: "Collection of 4 silhouettes"
  },
  {
    id: "arid-research-station",
    title: "Arid Research Station",
    label: "Architecture",
    category: "Architecture",
    image: images.aridResearchStation,
    size: "small",
    description:
      "Arid Research Station imagines a portable desert observatory with a compact shell and climate-tuned interior chamber.",
    artist: "Rafi Sol",
    materials: "Ceramic shell, mirrored canopy, insulated air channels.",
    dimensions: "30 x 18 x 14 ft"
  },
  {
    id: "subterranean-atrium",
    title: "Subterranean Atrium",
    label: "Soundscapes",
    category: "Soundscapes",
    image: images.subterraneanAtrium,
    size: "small",
    description:
      "Subterranean Atrium explores a below-ground chamber where light wells, acoustics, and circulation merge into a civic sound instrument.",
    artist: "Lina Eames",
    materials: "Cast concrete shell, reflective plaster, suspended ring seating.",
    dimensions: "46 ft chamber diameter"
  },
  {
    id: "modular-living",
    title: "Modular Living",
    label: "Label",
    category: "Architecture",
    image: images.modularLiving,
    size: "large",
    description:
      "Modular Living examines the intersection of innovative construction and environmental responsibility, proposing a new language for how we build and inhabit space.",
    artist: "Camille Vosk",
    materials: "Powder-coated steel, tempered glass, embedded LED lattice, reinforced polymer resin.",
    dimensions: "14 x 8 in. (35.6 x 20.3 x 20.3 cm), scale 1:75"
  },
  {
    id: "atmospheric-harvester",
    title: "Atmospheric Harvester",
    label: "Fashion",
    category: "Fashion",
    image: images.atmosphericHarvester,
    size: "large",
    description:
      "Atmospheric Harvester visualizes a wearable climate collector that traps fog, data, and movement inside a translucent soft shell.",
    artist: "Ana Voss",
    materials: "Inflatable polymer cells, reflective mesh, pressure seams.",
    dimensions: "Body-scale installation"
  },
  {
    id: "terraform-topography",
    title: "Terraform Topography",
    label: "Speculative Environments",
    category: "Technology",
    image: images.terraformTopography,
    size: "small",
    description:
      "Terraform Topography maps future excavation sites through layered mineral pigments, resin insets, and weathered contour lines.",
    artist: "Dan Brady",
    materials: "Dyed plaster, mineral wash, resin insets.",
    dimensions: "6 x 10 ft survey table"
  }
];

const heroCards = [
  {
    id: "tour-landing" as const,
    title: "Re:Finished",
    subtitle: "A Collection",
    image: images.tourLandingHero
  },
  {
    id: "modular-living",
    title: "Modular Living",
    subtitle: "Camille Vosk",
    image: images.featured
  }
] as const;

const mapPins = [
  { label: "A", top: 330, left: 275, dark: false },
  { label: "A", top: 235, left: 197, dark: false },
  { label: "B", top: 298, left: 85, dark: false },
  { label: "C", top: 226, left: 25, dark: false },
  { label: "A", top: 76, left: 247, dark: false },
  { label: "F", top: 14, left: 158, dark: true },
  { label: "D", top: 187, left: 108, dark: false },
  { label: "E", top: 84, left: 99, dark: false },
  { label: "H", top: 241, left: 297, dark: false }
] as const;

const artists = [
  { name: "Camille Vosk", image: images.artistCamille },
  { name: "Jiyheon Cho", image: images.artistJiyheon },
  { name: "Dan Brady", image: images.artistDan }
] as const;

const artistAvatarByName = {
  "Camille Vosk": images.artistCamille,
  "Jiyheon Cho": images.artistJiyheon,
  "Dan Brady": images.artistDan,
  "Ana Voss": images.artistCamille,
  "Noor Fallon": images.artistJiyheon,
  "Rafi Sol": images.artistDan,
  "Lina Eames": images.artistJiyheon
} as const;

const qrLayers = [
  images.qr0,
  images.qr1,
  images.qr2,
  images.qr3,
  images.qr4,
  images.qr5,
  images.qr6,
  images.qr7
] as const;

function appBackground(screen: ScreenId) {
  if (screen === "map" || screen === "virtual-tour") {
    return colors.slate;
  }

  if (screen === "tour-landing") {
    return "#ECEBE5";
  }

  if (screen === "ticket") {
    return colors.blue;
  }

  if (screen === "information") {
    return colors.paper;
  }

  return colors.white;
}

function StatusBar({ dark }: { dark?: boolean }) {
  const assets = dark ? statusDark : statusLight;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 16px 8px",
        color: dark ? colors.white : colors.ink,
        fontFamily: fonts.body,
        fontSize: 17,
        fontWeight: 600
      }}
    >
      <span>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <img alt="" height={12.226} src={assets.cellular} style={{ display: "block", width: 19.2 }} width={19.2} />
        <img alt="" height={12.328} src={assets.wifi} style={{ display: "block", width: 17.142 }} width={17.142} />
        <img alt="" height={13} src={assets.battery} style={{ display: "block", width: 27.328 }} width={27.328} />
      </div>
    </div>
  );
}

function AssetIcon({
  src,
  width,
  height,
  style
}: {
  src: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
}) {
  return <img alt="" src={src} style={{ display: "block", width, height, ...style }} />;
}

function RoundAssetButton({
  src,
  onClick,
  size = 40,
  iconWidth = 19,
  iconHeight = 19,
  background = "rgba(30,30,30,0.08)",
  transform,
  light
}: {
  src: string;
  onClick?: () => void;
  size?: number;
  iconWidth?: number;
  iconHeight?: number;
  background?: string;
  transform?: string;
  light?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        border: "none",
        background,
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        color: light ? colors.white : colors.ink
      }}
      type="button"
    >
      <AssetIcon
        height={iconHeight}
        src={src}
        style={{
          transform
        }}
        width={iconWidth}
      />
    </button>
  );
}

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div
      style={{
        color: light ? colors.white : colors.ink,
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

function IconButton({
  children,
  onClick,
  light,
  size = 40,
  fill
}: {
  children: React.ReactNode;
  onClick?: () => void;
  light?: boolean;
  size?: number;
  fill?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        border: "none",
        background: fill ?? (light ? "rgba(255,255,255,0.2)" : colors.white),
        color: light ? colors.white : colors.ink,
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        boxShadow: fill ? undefined : "0 6px 24px rgba(17,17,17,0.08)"
      }}
      type="button"
    >
      {children}
    </button>
  );
}

function SectionDivider({ dark }: { dark?: boolean }) {
  return (
    <div
      style={{
        height: 1,
        width: "100%",
        background: dark ? colors.lineDark : colors.line
      }}
    />
  );
}

function TitleHighlight({ title, subtitle }: { title: string; subtitle: string }) {
  const words = title.toUpperCase().split(" ");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <div style={{ display: "grid", gap: 2 }}>
        {words.map((word) => (
          <span
            key={word}
            style={{
              width: "fit-content",
              padding: "0 6px",
              borderRadius: 8,
              background: colors.lime,
              color: colors.ink,
              fontFamily: fonts.display,
              fontSize: 56,
              lineHeight: 0.88,
              letterSpacing: -1.6,
              textTransform: "uppercase"
            }}
          >
            {word}
          </span>
        ))}
      </div>
      <span
        style={{
          width: "fit-content",
          marginLeft: 2,
          padding: "0 8px",
          borderRadius: 10,
          background: colors.lime,
          color: colors.ink,
          fontFamily: fonts.mono,
          fontSize: 16,
          letterSpacing: 0.8,
          textTransform: "uppercase"
        }}
      >
        {subtitle}
      </span>
    </div>
  );
}

function HomeIndicator({ light }: { light?: boolean }) {
  return (
    <div
      style={{
        width: 152,
        height: 5,
        borderRadius: 999,
        margin: "12px auto 8px",
        background: light ? colors.ink : colors.white
      }}
    />
  );
}

function DefaultNav({
  active,
  dark,
  onSelect
}: {
  active: "home" | "explore" | "map" | "information";
  dark?: boolean;
  onSelect: (screen: ScreenId) => void;
}) {
  const items = [
    { id: "home" as const },
    { id: "explore" as const },
    { id: "map" as const },
    { id: "information" as const }
  ];
  const iconSet = dark
    ? figmaAssets.nav.map
    : active === "information"
      ? figmaAssets.nav.information
      : active === "explore"
        ? figmaAssets.nav.explore
        : figmaAssets.nav.home;

  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        paddingTop: 14,
        background: dark
          ? "linear-gradient(180deg, rgba(50,49,49,0) 0%, rgba(30,30,30,0.7) 100%)"
          : "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.96) 78%)"
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
          border: `1px solid ${dark ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.2)"}`,
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(52px)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.16)"
        }}
      >
        {items.map((item) => {
          const isActive = item.id === active;
          const iconWidth = item.id === "information" ? 13.2 : 22.8;

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              style={{
                minWidth: 56,
                height: 56,
                padding: "0 24px",
                borderRadius: 999,
                border: "none",
                background: isActive ? (dark ? colors.lime : colors.blue) : "transparent",
                display: "grid",
                placeItems: "center",
                cursor: "pointer"
              }}
              type="button"
            >
              <AssetIcon
                height={22.8}
                src={iconSet[item.id]}
                width={iconWidth}
              />
            </button>
          );
        })}
      </div>
      <HomeIndicator light={!dark} />
    </div>
  );
}

function SearchField({
  value,
  onChange,
  dark
}: {
  value: string;
  onChange: (value: string) => void;
  dark?: boolean;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        minHeight: 56,
        padding: "0 24px",
        borderRadius: 999,
        border: `1px solid ${dark ? colors.lineDark : colors.line}`,
        color: dark ? colors.white : colors.ink,
        background: dark ? "transparent" : colors.white
      }}
    >
      <AssetIcon height={22.8} src={figmaAssets.searchField} width={22.8} />
      <input
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search"
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "inherit",
          fontFamily: fonts.body,
          fontSize: 18
        }}
        value={value}
      />
    </label>
  );
}

function Tabs({
  active,
  onSelect,
  dark
}: {
  active: Category;
  onSelect: (value: Category) => void;
  dark?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        overflowX: "auto",
        paddingBottom: 4
      }}
    >
      {categories.map((category) => {
        const isActive = category === active;

        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            style={{
              minHeight: 32,
              padding: "0 16px",
              borderRadius: 12,
              border: `1px solid ${isActive ? "transparent" : dark ? colors.lineDark : colors.line}`,
              background: isActive ? (dark ? colors.lime : colors.blue) : "transparent",
              color: isActive && dark ? colors.ink : dark ? colors.white : colors.ink,
              fontFamily: fonts.body,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
            type="button"
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

function ArtCard({
  item,
  onClick
}: {
  item: ArtItem;
  onClick?: () => void;
}) {
  const imageHeight = item.size === "large" ? 222 : 126;

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        border: "none",
        background: "transparent",
        padding: 0,
        textAlign: "left",
        cursor: "pointer"
      }}
      type="button"
    >
      <div
        style={{
          overflow: "hidden",
          borderRadius: 24,
          background: "rgba(30,30,30,0.08)",
          boxShadow: "0 8px 24px rgba(17,17,17,0.06)"
        }}
      >
        <img
          alt={item.title}
          src={item.image}
          style={{
            display: "block",
            width: "100%",
            height: imageHeight,
            objectFit: "cover"
          }}
        />
        <div style={{ padding: "8px 12px 10px" }}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 16,
              fontWeight: 600,
              lineHeight: 1.4,
              color: colors.ink
            }}
          >
            {item.title}
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 14,
              lineHeight: 1.3,
              color: "rgba(30,30,30,0.5)"
            }}
          >
            {item.label}
          </div>
        </div>
      </div>
    </button>
  );
}

function ArtistsList() {
  return (
    <div
      style={{
        display: "grid",
        gap: 10,
        padding: 16,
        borderRadius: 24,
        background: "rgba(30,30,30,0.08)"
      }}
    >
      {artists.map((artist) => (
        <div
          key={artist.name}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img
              alt={artist.name}
              src={artist.image}
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: 1.4,
                  color: colors.ink
                }}
              >
                {artist.name}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 14,
                  lineHeight: 1.3,
                  color: colors.muted
                }}
              >
                Read more
              </div>
            </div>
          </div>
          <IconButton size={40}>
            <DirectionsIcon height={18} width={18} />
          </IconButton>
        </div>
      ))}
    </div>
  );
}

function MembershipCard() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: 148,
        overflow: "hidden",
        borderRadius: 24,
        background: colors.blue
      }}
    >
      <img
        alt=""
        src={images.membershipIllustration}
        style={{
          position: "absolute",
          inset: "-46px -14px auto -14px",
          width: "calc(100% + 28px)",
          maxWidth: "none"
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          minHeight: 148,
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "16px 16px 16px 16px"
        }}
      >
        <div style={{ display: "grid", gap: 2 }}>
          {["Join", "MOSF"].map((word) => (
            <span
              key={word}
              style={{
                width: "fit-content",
                padding: "0 8px",
                borderRadius: 12,
                background: colors.lime,
                color: colors.ink,
                fontFamily: fonts.display,
                fontSize: 50,
                lineHeight: 0.9,
                letterSpacing: -1.2,
                textTransform: "uppercase"
              }}
            >
              {word}
            </span>
          ))}
        </div>
        <button
          style={{
            height: 38,
            marginRight: -8,
            padding: "0 12px",
            borderRadius: 12,
            border: "none",
            background: colors.ink,
            color: colors.white,
            fontFamily: fonts.body,
            fontSize: 16,
            fontWeight: 500,
            cursor: "pointer"
          }}
          type="button"
        >
          View memberships
        </button>
      </div>
    </div>
  );
}

function TicketLogo() {
  return (
    <img
      alt="MOSF logo"
      src={images.ticketLogo}
      style={{
        display: "block",
        width: "100%"
      }}
    />
  );
}

function TicketQr() {
  return (
    <div
      style={{
        position: "relative",
        width: 189.296,
        height: 189.296
      }}
    >
      {qrLayers.map((src, index) => (
        <img
          key={src}
          alt=""
          src={src}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            opacity: index === 0 ? 1 : 0.999
          }}
        />
      ))}
    </div>
  );
}

function MapSurface() {
  return (
    <div
      style={{
        position: "relative",
        width: 343.49,
        height: 416.632,
        margin: "0 auto"
      }}
    >
      <img
        alt="Map"
        src={images.mapVector}
        style={{
          display: "block",
          width: "100%",
          height: "100%"
        }}
      />
      {mapPins.map((pin, index) => (
        <div
          key={`${pin.label}-${index}`}
          style={{
            position: "absolute",
            left: pin.left,
            top: pin.top,
            display: "grid",
            justifyItems: "center",
            width: 30
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 999,
              background: pin.dark ? colors.ink : colors.lime,
              color: colors.white,
              display: "grid",
              placeItems: "center",
              fontFamily: fonts.mono,
              fontSize: 14,
              textTransform: "uppercase"
            }}
          >
            {pin.label}
          </div>
          <div
            style={{
              width: 1,
              height: 24,
              background: pin.dark ? "rgba(255,255,255,0.4)" : "rgba(234,255,78,0.5)"
            }}
          />
          <div
            style={{
              width: 16,
              height: 6,
              borderRadius: 999,
              background: "rgba(0,0,0,0.22)"
            }}
          />
        </div>
      ))}
    </div>
  );
}

function ActionButton({
  label,
  dark,
  onClick,
  fullWidth,
  tone = "solid"
}: {
  label: string;
  dark?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
  tone?: "solid" | "soft" | "invert";
}) {
  const palette =
    tone === "soft"
      ? {
          background: dark ? colors.slateSoft : "rgba(30,30,30,0.08)",
          color: dark ? colors.white : colors.ink
        }
      : tone === "invert"
        ? {
            background: colors.lime,
            color: colors.ink
          }
        : {
            background: dark ? colors.white : colors.ink,
            color: dark ? colors.ink : colors.white
          };

  return (
    <button
      onClick={onClick}
      style={{
        minHeight: 46,
        width: fullWidth ? "100%" : undefined,
        padding: "0 18px",
        borderRadius: 12,
        border: "none",
        fontFamily: fonts.body,
        fontSize: 16,
        fontWeight: 600,
        cursor: "pointer",
        ...palette
      }}
      type="button"
    >
      {label}
    </button>
  );
}

export default function Page() {
  const [screen, setScreen] = useState<ScreenId>("home");
  const [selectedArtId, setSelectedArtId] = useState<ArtItem["id"]>("modular-living");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [selectedDay, setSelectedDay] = useState(5);

  const selectedArt = artItems.find((item) => item.id === selectedArtId) ?? artItems[0]!;

  const filteredItems = artItems.filter((item) => {
    const categoryMatch = category === "All" || item.category === category;
    const searchMatch =
      search.trim() === "" ||
      `${item.title} ${item.label} ${item.category}`.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  function go(next: ScreenId) {
    startTransition(() => setScreen(next));
  }

  function openArt(id: ArtItem["id"]) {
    setSelectedArtId(id);
    go("art-detail");
  }

  function renderHome() {
    return (
      <HomepageScreen
        onGetTickets={() => go("information")}
        onOpenExplore={() => go("explore")}
        onOpenFeaturedArt={() => openArt("subterranean-atrium")}
        onOpenFeaturedTour={() => go("tour-landing")}
        onOpenWhatsOn={() => go("map")}
        onSelectNav={go}
      />
    );
  }

  function renderExplore() {
    return (
      <div style={{ minHeight: "100dvh", background: colors.white }}>
        <StatusBar />
        <div style={{ padding: "0 16px 16px" }}>
          <div style={{ display: "grid", justifyItems: "center", gap: 16 }}>
            <Eyebrow>Explore</Eyebrow>
            <div style={{ width: "100%", display: "grid", gap: 16 }}>
              <SearchField onChange={setSearch} value={search} />
              <Tabs active={category} onSelect={setCategory} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
                {filteredItems.map((item) => (
                  <ArtCard key={item.id} item={item} onClick={() => openArt(item.id)} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <DefaultNav active="explore" onSelect={go} />
      </div>
    );
  }

  function renderArtDetail() {
    const relatedItems = artItems.filter((item) => item.id !== selectedArt.id);
    const artistAvatar = artistAvatarByName[selectedArt.artist as keyof typeof artistAvatarByName] ?? images.artistCamille;

    return (
      <div style={{ minHeight: "100dvh", background: colors.white }}>
        <StatusBar />
        <div style={{ padding: "0 16px 24px" }}>
          <div style={{ display: "grid", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <RoundAssetButton
                background="rgba(30,30,30,0.08)"
                iconHeight={19}
                iconWidth={19}
                onClick={() => go("explore")}
                src={figmaAssets.headers.artDetailBack}
                transform="rotate(180deg) scaleY(-1)"
              />
              <RoundAssetButton
                background="rgba(30,30,30,0.08)"
                iconHeight={19}
                iconWidth={19}
                src={figmaAssets.headers.artDetailShare}
              />
            </div>
            <div style={{ display: "grid", gap: 16 }}>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 12,
                  letterSpacing: 0.8,
                  color: colors.muted,
                  textTransform: "uppercase"
                }}
              >
                05.16-08.21, 2026
              </div>
              <TitleHighlight subtitle={selectedArt.artist.toUpperCase()} title={selectedArt.title} />
            </div>
            <img
              alt={selectedArt.title}
              src={selectedArt.image}
              style={{
                display: "block",
                width: "100%",
                borderRadius: 24,
                height: 318,
                objectFit: "cover"
              }}
            />
            <div style={{ display: "grid", gap: 16 }}>
              <Eyebrow>About</Eyebrow>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 18,
                  lineHeight: 1.3,
                  color: colors.ink
                }}
              >
                {selectedArt.description}
              </div>
              <ActionButton label="Read more" tone="soft" />
            </div>
            <SectionDivider />
            <div style={{ display: "grid", gap: 16 }}>
              <Eyebrow>Artist</Eyebrow>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: 16,
                  borderRadius: 24,
                  background: "rgba(30,30,30,0.08)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <img
                    alt={selectedArt.artist}
                    src={artistAvatar}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      objectFit: "cover"
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: fonts.body,
                        fontSize: 16,
                        fontWeight: 600,
                        lineHeight: 1.4,
                        color: colors.ink
                      }}
                    >
                      {selectedArt.artist}
                    </div>
                    <div
                      style={{
                        fontFamily: fonts.body,
                        fontSize: 14,
                        lineHeight: 1.3,
                        color: colors.muted
                      }}
                    >
                      Read more
                    </div>
                  </div>
                </div>
                <IconButton size={40}>
                  <DirectionsIcon height={18} width={18} />
                </IconButton>
              </div>
            </div>
            <SectionDivider />
            <div style={{ display: "grid", gap: 16 }}>
              <Eyebrow>Details</Eyebrow>
              <div style={{ display: "grid", gap: 16 }}>
                <div>
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 16,
                      fontWeight: 500,
                      lineHeight: 1.4
                    }}
                  >
                    Materials
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 14,
                      lineHeight: 1.45,
                      color: colors.muted
                    }}
                  >
                    {selectedArt.materials}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 16,
                      fontWeight: 500,
                      lineHeight: 1.4
                    }}
                  >
                    Dimensions
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 14,
                      lineHeight: 1.45,
                      color: colors.muted
                    }}
                  >
                    {selectedArt.dimensions}
                  </div>
                </div>
              </div>
            </div>
            <SectionDivider />
            <MembershipCard />
            <div style={{ display: "grid", gap: 16 }}>
              <Eyebrow>View More</Eyebrow>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
                {relatedItems.map((item) => (
                  <ArtCard key={item.id} item={item} onClick={() => openArt(item.id)} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <DefaultNav active="explore" onSelect={go} />
      </div>
    );
  }

  function renderTourLanding() {
    return (
      <div style={{ minHeight: "100dvh", background: "#ECEBE5" }}>
        <div style={{ position: "relative", minHeight: 555 }}>
          <img
            alt=""
            src={images.tourLandingHero}
            style={{
              display: "block",
              width: "100%",
              height: 555,
              objectFit: "cover"
            }}
          />
          <div style={{ position: "absolute", inset: 0 }}>
            <StatusBar dark />
            <div style={{ padding: "0 16px" }}>
              <RoundAssetButton
                background="rgba(30,30,30,0.24)"
                iconHeight={19}
                iconWidth={19}
                light
                onClick={() => go("home")}
                src={figmaAssets.headers.artDetailBack}
                transform="rotate(180deg) scaleY(-1)"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: -32,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            background: colors.white,
            boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
            padding: "24px 16px 120px"
          }}
        >
          <div style={{ display: "grid", gap: 24 }}>
            <div style={{ display: "grid", justifyItems: "center", gap: 16 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: fonts.body,
                  fontSize: 21,
                  fontWeight: 500,
                  color: colors.ink
                }}
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: colors.blue
                  }}
                />
                03.06-06.16, 2026
              </div>
              <div style={{ display: "grid", justifyItems: "center", gap: 10 }}>
                <div style={{ display: "grid", gap: 2, justifyItems: "center" }}>
                  <span
                    style={{
                      width: "fit-content",
                      padding: "0 8px",
                      borderRadius: 12,
                      background: colors.lime,
                      color: colors.ink,
                      fontFamily: fonts.display,
                      fontSize: 58,
                      lineHeight: 0.88,
                      letterSpacing: -1.6,
                      textTransform: "uppercase"
                    }}
                  >
                    Re: Finished
                  </span>
                  <span
                    style={{
                      width: "fit-content",
                      padding: "0 10px",
                      borderRadius: 10,
                      background: colors.lime,
                      color: colors.ink,
                      fontFamily: fonts.mono,
                      fontSize: 16,
                      letterSpacing: 1,
                      textTransform: "uppercase"
                    }}
                  >
                    A Collection
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 14,
                    letterSpacing: 1,
                    color: colors.muted,
                    textTransform: "uppercase"
                  }}
                >
                  16 min • 7 artworks
                </div>
              </div>
            </div>
            <SectionDivider />
            <div style={{ display: "grid", gap: 16 }}>
              <Eyebrow>About</Eyebrow>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 18,
                  lineHeight: 1.3,
                  fontWeight: 600,
                  color: colors.ink
                }}
              >
                Re: Finished is an exploration of new materials at the threshold of
                the everyday. Bringing together new fabrics and textiles engineered
                from emerging materials, the exhibition asks a deceptively simple
                question: how can the materials of the future shape our everyday
                lives today?
              </div>
              <ActionButton label="Read more" tone="soft" />
            </div>
            <SectionDivider />
            <div style={{ display: "grid", gap: 16 }}>
              <Eyebrow>Artists</Eyebrow>
              <ArtistsList />
            </div>
          </div>
        </div>
        <div
          style={{
            position: "sticky",
            bottom: 0,
            padding: "0 16px 8px",
            marginTop: -104,
            background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 100%)"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "52px 137px 52px",
              justifyContent: "center",
              alignItems: "center",
              gap: 32
            }}
          >
            <button
              style={{
                position: "relative",
                width: 52,
                height: 52,
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer"
              }}
              type="button"
            >
              <img
                alt=""
                src={figmaAssets.tourLanding.leftGlow}
                style={{
                  position: "absolute",
                  inset: "-6px -10px -14px -10px",
                  width: "calc(100% + 20px)",
                  height: "calc(100% + 20px)",
                  maxWidth: "none"
                }}
              />
              <AssetIcon
                height={19}
                src={figmaAssets.tourLanding.leftIcon}
                style={{
                  position: "relative",
                  margin: "16px auto 0",
                  transform: "rotate(180deg) scaleY(-1)"
                }}
                width={19}
              />
            </button>
            <button
              onClick={() => go("virtual-tour")}
              style={{
                position: "relative",
                width: 137,
                height: 85,
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(52px)",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.16)",
                cursor: "pointer"
              }}
              type="button"
            >
              <AssetIcon height={45.6} src={figmaAssets.tourLanding.centerIcon} width={45.6} />
            </button>
            <button
              onClick={() => go("home")}
              style={{
                position: "relative",
                width: 52,
                height: 52,
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer"
              }}
              type="button"
            >
              <img
                alt=""
                src={figmaAssets.tourLanding.rightGlow}
                style={{
                  position: "absolute",
                  inset: "-6px -10px -14px -10px",
                  width: "calc(100% + 20px)",
                  height: "calc(100% + 20px)",
                  maxWidth: "none"
                }}
              />
              <AssetIcon
                height={19}
                src={figmaAssets.tourLanding.rightIcon}
                style={{
                  position: "relative",
                  margin: "16px auto 0",
                  transform: "rotate(180deg) scaleY(-1)"
                }}
                width={19}
              />
            </button>
          </div>
          <HomeIndicator light />
        </div>
      </div>
    );
  }

  function renderVirtualTour() {
    return (
      <div style={{ minHeight: "100dvh", background: colors.slate, color: colors.white }}>
        <div style={{ background: colors.lime, color: colors.ink }}>
          <StatusBar />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 16px 56px"
            }}
          >
            <RoundAssetButton
              background="rgba(30,30,30,0.08)"
              iconHeight={19}
              iconWidth={19}
              onClick={() => go("tour-landing")}
              src={figmaAssets.headers.virtualBack}
              transform="rotate(180deg) scaleY(-1)"
            />
            <div style={{ display: "grid", justifyItems: "center", gap: 2 }}>
              <Eyebrow>Virtual Tour</Eyebrow>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 14,
                  letterSpacing: 1,
                  textTransform: "uppercase"
                }}
              >
                1 of 7
              </div>
            </div>
            <RoundAssetButton
              background="rgba(30,30,30,0.08)"
              iconHeight={19}
              iconWidth={19}
              src={figmaAssets.headers.virtualShare}
            />
          </div>
        </div>
        <div style={{ position: "relative", marginTop: -8, minHeight: "calc(100dvh - 116px)" }}>
          <img
            alt=""
            src={images.virtualTourPanel}
            style={{
              display: "block",
              width: "100%",
              height: "calc(100dvh - 132px)",
              objectFit: "cover",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "0 0 auto",
              height: 220,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              background: "linear-gradient(180deg, rgba(0,0,0,0.66) 0%, rgba(0,0,0,0) 100%)"
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 16,
              right: 16,
              top: 24,
              display: "grid",
              gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
              gap: 8
            }}
          >
            {Array.from({ length: 7 }).map((_, index) => (
              <span
                key={index}
                style={{
                  height: 4,
                  borderRadius: 999,
                  background: index < 3 ? colors.lime : "rgba(255,255,255,0.28)"
                }}
              />
            ))}
          </div>
          <div
            style={{
              position: "sticky",
              bottom: 0,
              padding: "0 16px 8px",
              marginTop: -184,
              background: "linear-gradient(180deg, rgba(50,49,49,0) 0%, rgba(30,30,30,0.7) 100%)"
            }}
          >
            <div
              style={{
                borderRadius: 24,
                background: "rgba(194,199,207,0.56)",
                backdropFilter: "blur(52px)",
                color: colors.white,
                padding: 16
              }}
            >
              <div style={{ display: "grid", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                  <div>
                    <div
                      style={{
                        fontFamily: fonts.display,
                        fontSize: 42,
                        lineHeight: 0.88,
                        letterSpacing: -1,
                        textTransform: "uppercase"
                      }}
                    >
                      Re:Finished
                    </div>
                    <div
                      style={{
                        fontFamily: fonts.mono,
                        fontSize: 14,
                        lineHeight: 1.3,
                        letterSpacing: 0.14,
                        opacity: 0.7,
                        textTransform: "uppercase"
                      }}
                    >
                      by Ana Voss
                    </div>
                  </div>
                  <RoundAssetButton
                    background="rgba(255,255,255,0.08)"
                    iconHeight={19}
                    iconWidth={19}
                    light
                    src={figmaAssets.virtualTourPlayer.expand}
                    transform="rotate(-45deg)"
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gap: 12
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "72px 1fr",
                      gap: 12,
                      alignItems: "center"
                    }}
                  >
                    <button
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 999,
                        border: "none",
                        background: "rgba(255,255,255,0.08)",
                        display: "grid",
                        placeItems: "center"
                      }}
                      type="button"
                    >
                      <div style={{ position: "relative", width: 16.197, height: 30.396 }}>
                        <AssetIcon
                          height={30.396}
                          src={figmaAssets.virtualTourPlayer.pauseLeft}
                          style={{ position: "absolute", inset: 0, width: 4.8 }}
                          width={4.8}
                        />
                        <AssetIcon
                          height={30.396}
                          src={figmaAssets.virtualTourPlayer.pauseRight}
                          style={{ position: "absolute", right: 0, top: 0, width: 4.8 }}
                          width={4.8}
                        />
                      </div>
                    </button>
                    <div style={{ display: "grid", gap: 10 }}>
                      <div
                        style={{
                          position: "relative",
                          height: 9,
                          borderRadius: 999,
                          overflow: "hidden",
                          background: "rgba(255,255,255,0.18)"
                        }}
                      >
                        <div style={{ position: "absolute", inset: "1px 0 0 0", opacity: 0.3, background: "rgba(255,255,255,0.6)" }} />
                        <div style={{ position: "absolute", left: 10, top: 2, display: "flex", gap: 8, alignItems: "center" }}>
                          <span style={{ width: 6, height: 6, borderRadius: 999, background: colors.blue }} />
                          <span style={{ width: 6, height: 6, borderRadius: 999, background: colors.blue }} />
                          <span style={{ width: 23, height: 6, borderRadius: 999, background: colors.lime }} />
                        </div>
                        <span style={{ position: "absolute", left: 62, top: 2, width: 16, height: 6, borderRadius: 999, background: colors.lime }} />
                        <span style={{ position: "absolute", left: 91, top: 2, width: 53, height: 6, borderRadius: 999, background: colors.lime }} />
                        <span style={{ position: "absolute", left: 164, top: 2, width: 6, height: 6, borderRadius: 999, background: colors.lime }} />
                        <span style={{ position: "absolute", left: 170, top: 2, width: 23, height: 6, borderRadius: 999, background: colors.blue }} />
                        <span style={{ position: "absolute", left: 198, top: 2, width: 46, height: 6, borderRadius: 999, background: colors.lime }} />
                        <span style={{ position: "absolute", left: 263, top: 2, width: 34, height: 6, borderRadius: 999, background: colors.blue }} />
                        <AssetIcon
                          height={18}
                          src={figmaAssets.virtualTourPlayer.playhead}
                          style={{ position: "absolute", left: 109, top: 0, width: 11 }}
                          width={11}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 12,
                          fontFamily: fonts.mono,
                          fontSize: 14,
                          letterSpacing: 0.6,
                          textTransform: "uppercase",
                          opacity: 0.88
                        }}
                      >
                        <span>Artist Tour</span>
                        <span>2:48 / 8:25</span>
                      </div>
                    </div>
                  </div>
                  <HomeIndicator />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderMap() {
    return (
      <div style={{ minHeight: "100dvh", background: colors.slate, color: colors.white }}>
        <StatusBar dark />
        <div style={{ padding: "0 16px 16px" }}>
          <div style={{ display: "grid", gap: 24 }}>
            <SearchField dark onChange={() => undefined} value="" />
            <Tabs active={category} dark onSelect={setCategory} />
            <MapSurface />
            <div
              style={{
                overflow: "hidden",
                borderRadius: 32,
                background: "rgba(255,255,255,0.08)"
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "162px 1fr", gap: 16, padding: 8 }}>
                <img
                  alt=""
                  src={images.mapCardImage}
                  style={{
                    display: "block",
                    width: 162,
                    height: 146,
                    objectFit: "cover",
                    borderRadius: 24
                  }}
                />
                <div style={{ display: "grid", alignContent: "space-between", padding: "8px 0" }}>
                  <div style={{ display: "grid", gap: 4 }}>
                    <div
                      style={{
                        fontFamily: fonts.body,
                        fontSize: 16,
                        fontWeight: 500,
                        lineHeight: 1.4,
                        opacity: 0.74
                      }}
                    >
                      Camille Vosk
                    </div>
                    <div
                      style={{
                        fontFamily: fonts.display,
                        fontSize: 42,
                        lineHeight: 0.88,
                        letterSpacing: -1,
                        textTransform: "uppercase"
                      }}
                    >
                      Spaceship Earth
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontFamily: fonts.mono,
                      fontSize: 14,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      opacity: 0.78
                    }}
                  >
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 999,
                        background: colors.ink,
                        color: colors.white,
                        display: "grid",
                        placeItems: "center"
                      }}
                    >
                      F
                    </span>
                    <span>The Forum</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DefaultNav active="map" dark onSelect={go} />
      </div>
    );
  }

  function renderInformation() {
    const days = [28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    return (
      <div style={{ minHeight: "100dvh", background: colors.paper }}>
        <div style={{ background: colors.lime }}>
          <StatusBar />
          <div style={{ padding: "24px 16px 56px", display: "grid", justifyItems: "center" }}>
            <Eyebrow>Information</Eyebrow>
          </div>
        </div>
        <div style={{ padding: "0 16px 24px", marginTop: -2 }}>
          <div style={{ display: "grid", gap: 18 }}>
            <div
              style={{
                borderRadius: 24,
                background: colors.white,
                padding: 16,
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
              }}
            >
              <div style={{ display: "grid", gap: 16 }}>
                <Eyebrow>Book Tickets</Eyebrow>
                <div
                  style={{
                    borderRadius: 16,
                    border: `1px solid ${colors.line}`,
                    padding: 16,
                    display: "grid",
                    gap: 16
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: colors.ink,
                      fontFamily: fonts.body,
                      fontSize: 18,
                      fontWeight: 500
                    }}
                  >
                    <span style={{ opacity: 0.65 }}>‹</span>
                    <span>October 2023</span>
                    <span style={{ opacity: 0.65 }}>›</span>
                  </div>
                  <div style={{ display: "grid", gap: 12 }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                        color: colors.muted,
                        fontFamily: fonts.body,
                        fontSize: 11,
                        textAlign: "center",
                        textTransform: "uppercase"
                      }}
                    >
                      {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                        <span key={day}>{day}</span>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                        gap: 8
                      }}
                    >
                      {days.map((day) => {
                        const isActive = day === selectedDay;

                        return (
                          <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            style={{
                              aspectRatio: "1 / 1",
                              borderRadius: 999,
                              border: "none",
                              background: isActive ? colors.ink : "transparent",
                              color: isActive ? colors.white : colors.ink,
                              fontFamily: fonts.body,
                              fontSize: 13,
                              cursor: "pointer"
                            }}
                            type="button"
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <SectionDivider />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
                    {[
                      ["Time Slot", "11:00 AM"],
                      ["Visitors", "1 Adult"]
                    ].map(([label, value]) => (
                      <div key={label} style={{ display: "grid", gap: 8 }}>
                        <Eyebrow>{label}</Eyebrow>
                        <div
                          style={{
                            minHeight: 42,
                            borderRadius: 8,
                            padding: "0 14px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: "rgba(30,30,30,0.08)",
                            fontFamily: fonts.body,
                            fontSize: 14,
                            fontWeight: 500
                          }}
                        >
                          <span>{value}</span>
                          <span style={{ opacity: 0.5 }}>v</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <ActionButton fullWidth label="Confirm Booking" onClick={() => go("ticket")} />
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              <Eyebrow>Hours</Eyebrow>
              {[
                ["Mon-Wed", "10:00-17:00"],
                ["Thursday", "Closed"],
                ["Fri-Sat", "10:00-19:00"],
                ["Sunday", "12:00-19:00"]
              ].map(([label, value], index, rows) => (
                <div key={label}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontFamily: fonts.body,
                      fontSize: 16,
                      fontWeight: 500,
                      color: colors.ink
                    }}
                  >
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                  {index < rows.length - 1 ? <div style={{ marginTop: 12 }}><SectionDivider /></div> : null}
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              <Eyebrow>Hours</Eyebrow>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 44,
                  lineHeight: 0.9,
                  letterSpacing: -1,
                  textTransform: "uppercase",
                  color: colors.ink
                }}
              >
                4217 Ashenmoor Drive, Portland, Oregon 97204
              </div>
              <ActionButton label="View map" tone="soft" />
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              <Eyebrow>Pricing</Eyebrow>
              {[
                ["General Admission", "Adults", "$25"],
                ["Seniors", "65+ with ID", "$18"],
                ["Students", "With valid ID", "$14"],
                ["Children", "Under 12 years", "Free"]
              ].map(([label, helper, value], index, rows) => (
                <div key={label}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 16
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: fonts.body,
                          fontSize: 16,
                          fontWeight: 500,
                          lineHeight: 1.4,
                          color: colors.ink
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontFamily: fonts.body,
                          fontSize: 14,
                          lineHeight: 1.3,
                          color: colors.muted
                        }}
                      >
                        {helper}
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily: fonts.body,
                        fontSize: 16,
                        fontWeight: 500,
                        lineHeight: 1.4,
                        color: colors.ink
                      }}
                    >
                      {value}
                    </div>
                  </div>
                  {index < rows.length - 1 ? <div style={{ marginTop: 12 }}><SectionDivider /></div> : null}
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <Eyebrow>FAQ</Eyebrow>
              {["Accessibility", "Directions", "Membership"].map((item) => (
                <div
                  key={item}
                  style={{
                    minHeight: 56,
                    borderRadius: 12,
                    padding: "0 16px",
                    background: "rgba(30,30,30,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 18,
                      fontWeight: 500,
                      color: colors.ink
                    }}
                  >
                    {item}
                  </span>
                  <PlusIcon height={18} width={18} />
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              <Eyebrow>Contact</Eyebrow>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 15,
                  lineHeight: 1.45,
                  color: colors.ink
                }}
              >
                Have any other questions?
              </div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 44,
                  lineHeight: 0.92,
                  letterSpacing: -1,
                  textTransform: "uppercase",
                  color: colors.ink
                }}
              >
                Info@MOSF.com
              </div>
            </div>
          </div>
        </div>
        <DefaultNav active="information" onSelect={go} />
      </div>
    );
  }

  function renderTicket() {
    return (
      <div style={{ minHeight: "100dvh", background: colors.blue }}>
        <StatusBar />
        <div style={{ padding: "0 16px 24px" }}>
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <RoundAssetButton
                background="rgba(30,30,30,0.08)"
                iconHeight={19}
                iconWidth={19}
                onClick={() => go("information")}
                src={figmaAssets.headers.ticketBack}
                transform="rotate(180deg) scaleY(-1)"
              />
              <Eyebrow>Confirmation</Eyebrow>
              <RoundAssetButton
                background="rgba(30,30,30,0.08)"
                iconHeight={19}
                iconWidth={19}
                onClick={() => go("home")}
                src={figmaAssets.headers.ticketHome}
              />
            </div>
            <div
              style={{
                borderRadius: 24,
                background: colors.white,
                padding: "24px 16px 120px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.25)"
              }}
            >
              <div style={{ display: "grid", gap: 24 }}>
                <div style={{ display: "grid", gap: 16 }}>
                  <TicketLogo />
                  <span
                    style={{
                      width: "fit-content",
                      padding: "0 8px",
                      borderRadius: 12,
                      background: colors.lime,
                      color: colors.ink,
                      fontFamily: fonts.display,
                      fontSize: 58,
                      lineHeight: 0.88,
                      letterSpacing: -1.6,
                      textTransform: "uppercase"
                    }}
                  >
                    Ticket
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                  <div style={{ display: "grid", gap: 32 }}>
                    <div style={{ display: "grid", gap: 8 }}>
                      <Eyebrow>Date</Eyebrow>
                      <div
                        style={{
                          fontFamily: fonts.body,
                          fontSize: 21,
                          fontWeight: 500,
                          lineHeight: 1.1,
                          color: colors.ink
                        }}
                      >
                        Thursday
                        <br />
                        May 09, 2026
                      </div>
                    </div>
                    <div style={{ display: "grid", gap: 8 }}>
                      <Eyebrow>ID</Eyebrow>
                      <div
                        style={{
                          fontFamily: fonts.body,
                          fontSize: 21,
                          fontWeight: 500,
                          lineHeight: 1.1,
                          color: colors.ink
                        }}
                      >
                        093810390
                      </div>
                    </div>
                  </div>
                  <TicketQr />
                </div>
                <SectionDivider />
                <div style={{ display: "grid", gap: 56, paddingTop: 8 }}>
                  <Eyebrow>Guest</Eyebrow>
                  <div style={{ display: "grid", gap: 4, justifyItems: "center" }}>
                    <div
                      style={{
                        fontFamily: fonts.display,
                        fontSize: 54,
                        lineHeight: 0.88,
                        letterSpacing: -1.2,
                        textTransform: "uppercase",
                        color: colors.ink
                      }}
                    >
                      Alyssa Jefferson
                    </div>
                    <div
                      style={{
                        fontFamily: fonts.body,
                        fontSize: 21,
                        lineHeight: 1.1,
                        color: colors.muted
                      }}
                    >
                      ajefferson@gmail.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "sticky",
            bottom: 0,
            padding: "0 16px 8px",
            marginTop: -96,
            background: "linear-gradient(180deg, rgba(202,223,255,0) 0%, rgba(202,223,255,0.94) 36%, rgba(202,223,255,1) 100%)"
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
            <button
              style={{
                minHeight: 54,
                borderRadius: 12,
                border: "none",
                background: colors.ink,
                color: colors.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: fonts.body,
                fontSize: 16,
                fontWeight: 600
              }}
              type="button"
            >
              Save to wallet
            </button>
            <button
              style={{
                minHeight: 54,
                borderRadius: 12,
                border: "none",
                background: colors.ink,
                color: colors.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: fonts.body,
                fontSize: 16,
                fontWeight: 600
              }}
              type="button"
            >
              Get directions
            </button>
          </div>
          <HomeIndicator light />
        </div>
      </div>
    );
  }

  let content = renderHome();

  if (screen === "explore") {
    content = renderExplore();
  } else if (screen === "art-detail") {
    content = renderArtDetail();
  } else if (screen === "tour-landing") {
    content = renderTourLanding();
  } else if (screen === "virtual-tour") {
    content = renderVirtualTour();
  } else if (screen === "map") {
    content = renderMap();
  } else if (screen === "information") {
    content = renderInformation();
  } else if (screen === "ticket") {
    content = renderTicket();
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: appBackground(screen),
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          background: appBackground(screen)
        }}
      >
        {content}
      </div>
    </main>
  );
}

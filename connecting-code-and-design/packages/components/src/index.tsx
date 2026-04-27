import type { CSSProperties, ChangeEventHandler, ReactNode } from "react";
import {
  getMuseumTheme,
  museumColors,
  museumMotion,
  museumRadii,
  museumShadows,
  museumSpacing,
  museumTypography,
  type PrototypeMode
} from "@connecting-code-and-design/tokens";

export type { PrototypeMode } from "@connecting-code-and-design/tokens";

type LayoutProps = {
  children: ReactNode;
  style?: CSSProperties;
};

type ButtonTone = "accent" | "ghost" | "solid" | "inverted";

type NavItem<T extends string> = {
  id: T;
  label: string;
  icon: ReactNode;
};

export function PhoneShell({
  children,
  mode = "light"
}: {
  children: ReactNode;
  mode?: PrototypeMode;
}) {
  const theme = getMuseumTheme(mode);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        borderRadius: 36,
        background: theme.background,
        color: theme.ink,
        boxShadow: museumShadows.float,
        border: `1px solid ${
          mode === "light" ? "rgba(255,255,255,0.65)" : museumColors.lineDark
        }`
      }}
    >
      {children}
    </div>
  );
}

export function ScreenScroll({ children, style }: LayoutProps) {
  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        scrollbarWidth: "none",
        ...style
      }}
    >
      {children}
    </div>
  );
}

export function StatusBar({
  mode = "light",
  emphasize = false
}: {
  mode?: PrototypeMode;
  emphasize?: boolean;
}) {
  const theme = getMuseumTheme(mode);
  const color = emphasize ? museumColors.ink : theme.ink;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `${museumSpacing.sm}px ${museumSpacing.lg}px ${museumSpacing.xs}px`,
        fontFamily: museumTypography.mono,
        fontSize: 12,
        letterSpacing: 0.2,
        color
      }}
    >
      <span>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            display: "inline-flex",
            gap: 2,
            alignItems: "flex-end",
            height: 12
          }}
        >
          {[5, 8, 11].map((height) => (
            <span
              key={height}
              style={{
                display: "block",
                width: 3,
                height,
                borderRadius: 999,
                background: color
              }}
            />
          ))}
        </span>
        <span
          style={{
            display: "block",
            width: 14,
            height: 10,
            borderRadius: 10,
            border: `1.5px solid ${color}`,
            position: "relative"
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 1,
              borderRadius: 6,
              background: color
            }}
          />
        </span>
      </div>
    </div>
  );
}

export function HeaderRow({ children, style }: LayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: museumSpacing.sm,
        padding: `0 ${museumSpacing.sm}px`,
        ...style
      }}
    >
      {children}
    </div>
  );
}

export function HeaderButton({
  children,
  mode = "light",
  onClick
}: {
  children: ReactNode;
  mode?: PrototypeMode;
  onClick?: () => void;
}) {
  const theme = getMuseumTheme(mode);

  return (
    <button
      onClick={onClick}
      style={{
        width: 42,
        height: 42,
        border: "none",
        borderRadius: museumRadii.full,
        background:
          mode === "light" ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.08)",
        color: theme.ink,
        display: "grid",
        placeItems: "center",
        cursor: "pointer"
      }}
      type="button"
    >
      {children}
    </button>
  );
}

export function Label({
  children,
  mode = "light",
  style
}: LayoutProps & { mode?: PrototypeMode }) {
  const theme = getMuseumTheme(mode);

  return (
    <div
      style={{
        fontFamily: museumTypography.mono,
        fontSize: 12,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        color: theme.ink,
        opacity: 0.9,
        ...style
      }}
    >
      [{children}]
    </div>
  );
}

export function ActionButton({
  label,
  onClick,
  tone = "accent",
  mode = "light",
  fullWidth = false
}: {
  label: string;
  onClick?: () => void;
  tone?: ButtonTone;
  mode?: PrototypeMode;
  fullWidth?: boolean;
}) {
  const theme = getMuseumTheme(mode);

  const palette: Record<ButtonTone, CSSProperties> = {
    accent: {
      background: museumColors.brand,
      color: museumColors.ink
    },
    ghost: {
      background: mode === "light" ? museumColors.soft : museumColors.softDark,
      color: theme.ink
    },
    solid: {
      background: mode === "light" ? museumColors.ink : museumColors.white,
      color: mode === "light" ? museumColors.white : museumColors.ink
    },
    inverted: {
      background: theme.panel,
      color: theme.ink,
      border: `1px solid ${theme.border}`
    }
  };

  return (
    <button
      onClick={onClick}
      style={{
        minHeight: 46,
        padding: `0 ${museumSpacing.md}px`,
        borderRadius: museumRadii.md,
        border: "none",
        fontFamily: museumTypography.body,
        fontSize: 16,
        fontWeight: 700,
        width: fullWidth ? "100%" : "auto",
        cursor: "pointer",
        transition: `transform ${museumMotion.fast} ${museumMotion.easing}`,
        ...palette[tone]
      }}
      type="button"
    >
      {label}
    </button>
  );
}

export function SurfaceCard({
  children,
  mode = "light",
  style
}: LayoutProps & { mode?: PrototypeMode }) {
  const theme = getMuseumTheme(mode);

  return (
    <div
      style={{
        borderRadius: museumRadii.lg,
        background: mode === "light" ? theme.panel : theme.elevated,
        border: `1px solid ${theme.border}`,
        boxShadow: mode === "light" ? museumShadows.card : "none",
        ...style
      }}
    >
      {children}
    </div>
  );
}

export function SearchField({
  mode = "light",
  value,
  placeholder,
  icon,
  onChange
}: {
  mode?: PrototypeMode;
  value: string;
  placeholder: string;
  icon: ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const theme = getMuseumTheme(mode);

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: museumSpacing.sm,
        minHeight: 56,
        padding: `0 ${museumSpacing.sm}px`,
        borderRadius: museumRadii.full,
        border: `1px solid ${theme.border}`,
        background: mode === "light" ? theme.panel : theme.elevated,
        color: theme.ink
      }}
    >
      <span style={{ display: "grid", placeItems: "center", opacity: 0.68 }}>
        {icon}
      </span>
      <input
        onChange={onChange}
        placeholder={placeholder}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          color: theme.ink,
          fontFamily: museumTypography.body,
          fontSize: 18
        }}
        value={value}
      />
    </label>
  );
}

export function ChipTabs<T extends string>({
  tabs,
  active,
  onSelect,
  mode = "light"
}: {
  tabs: readonly T[];
  active: T;
  onSelect: (tab: T) => void;
  mode?: PrototypeMode;
}) {
  const theme = getMuseumTheme(mode);

  return (
    <div
      style={{
        display: "flex",
        gap: museumSpacing.xs,
        overflowX: "auto",
        paddingBottom: 4
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            onClick={() => onSelect(tab)}
            style={{
              whiteSpace: "nowrap",
              minHeight: 36,
              padding: `0 ${museumSpacing.sm}px`,
              borderRadius: museumRadii.md,
              border: `1px solid ${isActive ? "transparent" : theme.border}`,
              background: isActive
                ? mode === "light"
                  ? museumColors.periwinkle
                  : museumColors.brand
                : "transparent",
              color: mode === "light" || !isActive ? theme.ink : museumColors.ink,
              fontFamily: museumTypography.body,
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer"
            }}
            type="button"
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

export function CollectionCard({
  mode = "light",
  visual,
  title,
  subtitle,
  onClick,
  style
}: {
  mode?: PrototypeMode;
  visual: ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
  style?: CSSProperties;
}) {
  const theme = getMuseumTheme(mode);

  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: museumSpacing.xs,
        width: "100%",
        padding: 0,
        border: "none",
        background: "transparent",
        textAlign: "left",
        cursor: "pointer",
        ...style
      }}
      type="button"
    >
      <div
        style={{
          borderRadius: museumRadii.lg,
          overflow: "hidden",
          background: mode === "light" ? theme.panel : theme.elevated,
          boxShadow: mode === "light" ? museumShadows.card : "none"
        }}
      >
        {visual}
      </div>
      <div style={{ display: "grid", gap: 2 }}>
        <strong
          style={{
            fontFamily: museumTypography.body,
            fontSize: 15,
            lineHeight: 1.08,
            color: theme.ink
          }}
        >
          {title}
        </strong>
        <span
          style={{
            fontFamily: museumTypography.body,
            fontSize: 13,
            color: theme.muted
          }}
        >
          {subtitle}
        </span>
      </div>
    </button>
  );
}

export function CalendarGrid({
  mode = "light",
  activeDay,
  onSelect
}: {
  mode?: PrototypeMode;
  activeDay: number;
  onSelect: (day: number) => void;
}) {
  const theme = getMuseumTheme(mode);
  const days = [28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div
      style={{
        display: "grid",
        gap: museumSpacing.xs,
        fontFamily: museumTypography.body
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          fontSize: 11,
          color: theme.muted,
          textTransform: "uppercase"
        }}
      >
        {["S", "M", "T", "W", "T", "F", "S"].map((label) => (
          <span key={label} style={{ textAlign: "center" }}>
            {label}
          </span>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: museumSpacing.xxs,
          fontSize: 13
        }}
      >
        {days.map((day) => {
          const isActive = day === activeDay;
          return (
            <button
              key={day}
              onClick={() => onSelect(day)}
              style={{
                aspectRatio: "1 / 1",
                borderRadius: museumRadii.full,
                border: "none",
                background: isActive ? museumColors.ink : "transparent",
                color: isActive ? museumColors.white : theme.ink,
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
  );
}

export function InlineSelect({
  mode = "light",
  label,
  value
}: {
  mode?: PrototypeMode;
  label: string;
  value: string;
}) {
  const theme = getMuseumTheme(mode);

  return (
    <div style={{ display: "grid", gap: museumSpacing.xxs, minWidth: 0 }}>
      <Label mode={mode}>{label}</Label>
      <div
        style={{
          minHeight: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: museumSpacing.xs,
          padding: `0 ${museumSpacing.sm}px`,
          borderRadius: museumRadii.sm,
          background: mode === "light" ? museumColors.soft : museumColors.softDark,
          color: theme.ink,
          fontFamily: museumTypography.body,
          fontSize: 14,
          fontWeight: 700
        }}
      >
        <span>{value}</span>
        <span style={{ opacity: 0.5 }}>v</span>
      </div>
    </div>
  );
}

export function Divider({
  mode = "light",
  style
}: {
  mode?: PrototypeMode;
  style?: CSSProperties;
}) {
  const theme = getMuseumTheme(mode);
  return (
    <div
      style={{
        height: 1,
        width: "100%",
        background: theme.border,
        ...style
      }}
    />
  );
}

export function InfoRow({
  label,
  value,
  helper,
  mode = "light"
}: {
  label: string;
  value: string;
  helper?: string;
  mode?: PrototypeMode;
}) {
  const theme = getMuseumTheme(mode);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: museumSpacing.sm
      }}
    >
      <div style={{ display: "grid", gap: 2 }}>
        <span
          style={{
            fontFamily: museumTypography.body,
            fontSize: 16,
            fontWeight: 700,
            color: theme.ink
          }}
        >
          {label}
        </span>
        {helper ? (
          <span
            style={{
              fontFamily: museumTypography.body,
              fontSize: 13,
              color: theme.muted
            }}
          >
            {helper}
          </span>
        ) : null}
      </div>
      <span
        style={{
          fontFamily: museumTypography.body,
          fontSize: 16,
          fontWeight: 700,
          color: theme.ink
        }}
      >
        {value}
      </span>
    </div>
  );
}

export function AccordionRow({
  label,
  mode = "light",
  action
}: {
  label: string;
  mode?: PrototypeMode;
  action?: ReactNode;
}) {
  const theme = getMuseumTheme(mode);

  return (
    <div
      style={{
        minHeight: 56,
        padding: `0 ${museumSpacing.md}px`,
        borderRadius: museumRadii.md,
        background: mode === "light" ? museumColors.soft : museumColors.softDark,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: museumSpacing.sm,
        color: theme.ink
      }}
    >
      <span
        style={{
          fontFamily: museumTypography.body,
          fontSize: 18,
          fontWeight: 700
        }}
      >
        {label}
      </span>
      {action}
    </div>
  );
}

export function BottomNav<T extends string>({
  mode = "light",
  items,
  active,
  onSelect
}: {
  mode?: PrototypeMode;
  items: readonly NavItem<T>[];
  active: T;
  onSelect: (id: T) => void;
}) {
  const theme = getMuseumTheme(mode);

  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        padding: `${museumSpacing.sm}px ${museumSpacing.sm}px ${museumSpacing.md}px`,
        background:
          mode === "light"
            ? "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.96) 32%, rgba(255,255,255,1) 100%)"
            : "linear-gradient(180deg, rgba(53,50,49,0) 0%, rgba(53,50,49,0.96) 32%, rgba(53,50,49,1) 100%)"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
          alignItems: "center",
          gap: museumSpacing.xs,
          padding: 8,
          borderRadius: museumRadii.full,
          background: mode === "light" ? "rgba(247,247,244,0.96)" : museumColors.slateRaised,
          border: `1px solid ${theme.border}`
        }}
      >
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              style={{
                height: 42,
                borderRadius: museumRadii.full,
                border: "none",
                background: isActive
                  ? mode === "light"
                    ? museumColors.periwinkle
                    : museumColors.brand
                  : "transparent",
                color: isActive && mode === "dark" ? museumColors.ink : theme.ink,
                display: "grid",
                placeItems: "center",
                cursor: "pointer"
              }}
              type="button"
            >
              {item.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}

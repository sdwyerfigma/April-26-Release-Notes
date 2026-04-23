import type { CSSProperties, ReactNode } from "react";

import styles from "./savings-screen.module.css";

const ASSETS = {
  artBook: "https://www.figma.com/api/mcp/asset/52022201-aeb6-4a5f-9ce7-d01b389992be",
  camera: "https://www.figma.com/api/mcp/asset/3c6c25b4-d122-403a-95c8-b9a100c12e61",
  clothesIcon: "https://www.figma.com/api/mcp/asset/fe0c7150-8fd3-4a19-93cb-597bedfe5142",
  coin: "https://www.figma.com/api/mcp/asset/b2028845-b3e9-4268-a5ea-73e0cc16e3f5",
  entertainmentIcon: "https://www.figma.com/api/mcp/asset/44678e45-b43d-4bb5-9930-161dcd9d87b3",
  foodIcon: "https://www.figma.com/api/mcp/asset/a171ea1b-8901-4b85-91fe-78b478a7be7f",
  goggles: "https://www.figma.com/api/mcp/asset/577d2bcc-e1ba-4bec-9337-6acbd3f6c1d9",
  headphones: "https://www.figma.com/api/mcp/asset/8085f1da-9513-408e-b993-1a678d680865",
  pieChart: "https://www.figma.com/api/mcp/asset/c872ca23-9847-4dfa-ab4a-be910773ff6a",
  skateboard: "https://www.figma.com/api/mcp/asset/f0e6d071-9c95-4cc3-bf3d-9441a9ea1a63",
  sneaker: "https://www.figma.com/api/mcp/asset/9e75d0b0-b07b-48fb-9fc7-6e2f15168547",
  tripsIcon: "https://www.figma.com/api/mcp/asset/69a3cd32-f19a-44f6-8afc-4a8025c4ef1e",
};

type Category = {
  amount: number;
  icon: string;
  label: string;
  percentage: number;
};

type Goal = {
  amountSaved: number;
  background: string;
  image: string;
  imageClassName?: string;
  label: string;
  remaining: number;
  target: number;
  trackColor: string;
};

type CompletedGoal = {
  accent: string;
  amount: number;
  image: string;
  imageClassName?: string;
  label: string;
};

const CATEGORIES: Category[] = [
  { amount: 212.2, icon: ASSETS.tripsIcon, label: "Trips", percentage: 65 },
  { amount: 56.1, icon: ASSETS.entertainmentIcon, label: "Entertainment", percentage: 17 },
  { amount: 29.34, icon: ASSETS.foodIcon, label: "Food", percentage: 10 },
  { amount: 27.24, icon: ASSETS.clothesIcon, label: "Clothes", percentage: 8 },
];

const GOALS: Goal[] = [
  {
    amountSaved: 76.5,
    background: "#ffc6f8",
    image: ASSETS.headphones,
    imageClassName: styles.goalImageHeadphones,
    label: "Headphones",
    remaining: 203.5,
    target: 280,
    trackColor: "#c9109b",
  },
  {
    amountSaved: 100,
    background: "#cebeff",
    image: ASSETS.sneaker,
    imageClassName: styles.goalImageSneaker,
    label: "Sneakers",
    remaining: 20,
    target: 120,
    trackColor: "#7747ff",
  },
  {
    amountSaved: 18.2,
    background: "#d4ff72",
    image: ASSETS.goggles,
    imageClassName: styles.goalImageTrip,
    label: "Freshman Trip",
    remaining: 481.8,
    target: 500,
    trackColor: "#5aba00",
  },
];

const COMPLETED_GOALS: CompletedGoal[] = [
  {
    accent: "#ff91f2",
    amount: 120,
    image: ASSETS.skateboard,
    imageClassName: styles.completedImageSkateboard,
    label: "Skateboard",
  },
  {
    accent: "#56d7ff",
    amount: 260,
    image: ASSETS.camera,
    imageClassName: styles.completedImageCamera,
    label: "Camera",
  },
  {
    accent: "#b0fe00",
    amount: 80,
    image: ASSETS.artBook,
    imageClassName: styles.completedImageBook,
    label: "Art Book",
  },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  style: "currency",
});

const totalSavings = CATEGORIES.reduce((sum, category) => sum + category.amount, 0);
const [wholeDollars, cents] = totalSavings.toFixed(2).split(".");

export function SavingsScreen() {
  return (
    <main className={styles.page}>
      <section className={styles.phoneFrame}>
        <div className={styles.phone}>
          <header className={styles.statusBar}>
            <p className={styles.time}>9:41</p>
            <div className={styles.statusIcons} aria-hidden="true">
              <CellularIcon />
              <WifiIcon />
              <BatteryIcon />
            </div>
          </header>

          <div className={styles.content}>
            <h1 className={styles.title}>Savings</h1>

            <section className={styles.chartCard} aria-labelledby="total-savings">
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle} id="total-savings">
                  Total savings
                </h2>
                <div className={styles.datePill}>
                  <span>Mar 2-Mar 29</span>
                  <ChevronDownIcon />
                </div>
              </div>

              <div className={styles.chartArea}>
                <img alt="" className={styles.chartGraphic} src={ASSETS.pieChart} />
                <div className={styles.chartAmount}>
                  <span className={styles.amountWhole}>${wholeDollars}</span>
                  <span className={styles.amountCents}>.{cents}</span>
                </div>
              </div>

              <ul className={styles.categoryList}>
                {CATEGORIES.map((category) => (
                  <li className={styles.categoryRow} key={category.label}>
                    <div className={styles.categoryInfo}>
                      <img alt="" className={styles.categoryIcon} src={category.icon} />
                      <div className={styles.categoryCopy}>
                        <p className={styles.categoryLabel}>{category.label}</p>
                        <p className={styles.categoryMeta}>{category.percentage}%</p>
                      </div>
                    </div>
                    <p className={styles.categoryAmount}>{currencyFormatter.format(category.amount)}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.noticeCard} aria-labelledby="watch-out-title">
              <div className={styles.noticeCoinFrame} aria-hidden="true">
                <img alt="" className={styles.noticeCoin} src={ASSETS.coin} />
              </div>

              <div className={styles.noticeCopy}>
                <div className={styles.noticeHeader}>
                  <h2 className={styles.noticeTitle} id="watch-out-title">
                    Watch out!
                  </h2>
                  <span className={styles.closeBadge} aria-hidden="true">
                    <CloseIcon />
                  </span>
                </div>
                <p className={styles.noticeText}>
                  You're spending 35% more than you usually are by this point each month.
                </p>
                <p className={styles.noticeLink}>
                  Learn more
                  <ArrowRightIcon />
                </p>
              </div>
            </section>

            <section className={styles.section} aria-labelledby="goals-title">
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle} id="goals-title">
                  Your goals
                </h2>
              </div>

              <div className={styles.goalList}>
                {GOALS.map((goal) => {
                  const goalStyle = {
                    "--goal-background": goal.background,
                    "--goal-progress": `${(goal.amountSaved / goal.target) * 100}%`,
                    "--goal-progress-color": goal.trackColor,
                  } as CSSProperties;

                  return (
                    <article className={styles.goalCard} key={goal.label} style={goalStyle}>
                      <div className={styles.goalIllustration}>
                        <img alt="" className={goal.imageClassName} src={goal.image} />
                      </div>

                      <div className={styles.goalBody}>
                        <div className={styles.goalTopRow}>
                          <p className={styles.goalLabel}>{goal.label}</p>
                          <p className={styles.goalTarget}>{currencyFormatter.format(goal.target)}</p>
                        </div>

                        <div className={styles.goalProgressTrack}>
                          <div className={styles.goalProgressFill} />
                        </div>

                        <div className={styles.goalBottomRow}>
                          <p className={styles.goalMeta}>{currencyFormatter.format(goal.amountSaved)}</p>
                          <p className={styles.goalMeta}>{currencyFormatter.format(goal.remaining)}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className={styles.section} aria-labelledby="completed-title">
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle} id="completed-title">
                  Completed goals
                </h2>
                <p className={styles.sectionLink}>
                  View all
                  <ArrowRightIcon />
                </p>
              </div>

              <div className={styles.completedScroller}>
                <div className={styles.completedRail}>
                  {COMPLETED_GOALS.map((goal) => {
                    const completedStyle = {
                      "--completed-accent": goal.accent,
                    } as CSSProperties;

                    return (
                      <article className={styles.completedCard} key={goal.label} style={completedStyle}>
                        <div className={styles.completedArt}>
                          <img alt="" className={goal.imageClassName} src={goal.image} />
                        </div>
                        <div className={styles.completedCopy}>
                          <p className={styles.completedLabel}>{goal.label}</p>
                          <p className={styles.completedAmount}>{currencyFormatter.format(goal.amount)}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          <nav aria-label="Primary" className={styles.bottomNav}>
            <div className={styles.navRow}>
              <div className={styles.navItem}>
                <NavBubble>
                  <HomeIcon />
                </NavBubble>
              </div>

              <div className={styles.navItem}>
                <NavBubble active>
                  <SparkIcon />
                </NavBubble>
              </div>

              <div className={styles.navItem}>
                <div className={`${styles.navBubble} ${styles.navBubbleCenter}`}>
                  <CenterAddIcon />
                </div>
              </div>

              <div className={styles.navItem}>
                <NavBubble>
                  <TargetIcon />
                </NavBubble>
              </div>

              <div className={styles.navItem}>
                <NavBubble>
                  <ProfileIcon />
                </NavBubble>
              </div>
            </div>

            <div className={styles.homeIndicator} />
          </nav>
        </div>
      </section>
    </main>
  );
}

function NavBubble({ active = false, children }: { active?: boolean; children: ReactNode }) {
  return (
    <div className={`${styles.navBubble} ${active ? styles.navBubbleActive : ""}`}>
      {children}
      {active ? <span aria-hidden="true" className={styles.navIndicator} /> : null}
    </div>
  );
}

function HomeIcon() {
  return (
    <svg aria-hidden="true" className={styles.navIcon} viewBox="0 0 24 24">
      <path
        d="M4.5 10.6 12 4.5l7.5 6.1v8.1a1.3 1.3 0 0 1-1.3 1.3H5.8a1.3 1.3 0 0 1-1.3-1.3z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
      <path d="M10 20v-5.1h4V20" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" className={styles.navIcon} viewBox="0 0 24 24">
      <path
        d="M12 3.6 13.8 8l4.4 1.8-4.4 1.8L12 16l-1.8-4.4L5.8 9.8 10.2 8z"
        fill="currentColor"
      />
      <circle cx="18.5" cy="5.5" r="2.2" fill="currentColor" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg aria-hidden="true" className={styles.navIcon} viewBox="0 0 24 24">
      <path
        d="M12 20s5.6-5.4 5.6-9.6a5.6 5.6 0 1 0-11.2 0C6.4 14.6 12 20 12 20Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
      <circle cx="12" cy="10.5" r="1.9" fill="currentColor" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg aria-hidden="true" className={styles.navIcon} viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <path
        d="M6.2 18.3c1.2-2.5 3.2-3.8 5.8-3.8s4.6 1.3 5.8 3.8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function CenterAddIcon() {
  return (
    <svg aria-hidden="true" className={styles.navCenterIcon} viewBox="0 0 24 24">
      <path d="M12 6.2v11.6M6.2 12h11.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
    </svg>
  );
}

function CellularIcon() {
  return (
    <svg aria-hidden="true" className={styles.statusCellular} viewBox="0 0 20 13">
      <path d="M1.2 11.8h2.2V9.6H1.2zm3.9 0h2.2V7.4H5.1zm3.9 0h2.2V5.2H9zm3.9 0h2.2V3h-2.2zm3.9 0h2.2V.8h-2.2z" fill="currentColor" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg aria-hidden="true" className={styles.statusWifi} viewBox="0 0 18 13">
      <path
        d="M1.2 4.3A11.2 11.2 0 0 1 9 1.2a11.2 11.2 0 0 1 7.8 3.1M3.9 7a7.4 7.4 0 0 1 10.2 0M6.6 9.8a3.7 3.7 0 0 1 4.8 0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
      <circle cx="9" cy="11.2" r="1.1" fill="currentColor" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg aria-hidden="true" className={styles.statusBattery} viewBox="0 0 28 13">
      <rect x="1" y="1.2" width="23.5" height="10.6" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3.2" y="3.3" width="17.2" height="6.4" rx="1.8" fill="currentColor" />
      <rect x="25.2" y="4.2" width="1.8" height="4.6" rx="0.8" fill="currentColor" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" className={styles.inlineIcon} viewBox="0 0 12 12">
      <path
        d="M3 4.5 6 7.5l3-3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" className={styles.inlineIcon} viewBox="0 0 12 12">
      <path
        d="M3 6h5.5M6.8 3.4 9.4 6l-2.6 2.6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className={styles.closeIcon} viewBox="0 0 16 16">
      <path
        d="M4.2 4.2 11.8 11.8M11.8 4.2 4.2 11.8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

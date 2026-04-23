"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState, type CSSProperties } from "react";

import styles from "./cheddar-onboarding-flow.module.css";

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

type Step = {
  id: string;
  label: string;
  subtitle: string;
  title: string;
};

export type OnboardingStepId = "connect" | "goals" | "tracking" | "completed";

type Connection = {
  accent: string;
  detail: string;
  icon: string;
  id: string;
  label: string;
};

type GoalOption = {
  accent: string;
  background: string;
  image: string;
  imageClassName?: string;
  label: string;
  saved: number;
  target: number;
  trackColor: string;
};

type Category = {
  amount: number;
  icon: string;
  label: string;
  percentage: number;
};

type CompletedGoal = {
  accent: string;
  amount: number;
  image: string;
  imageClassName?: string;
  label: string;
  note: string;
};

const STEPS: Array<Step & { id: OnboardingStepId }> = [
  {
    id: "connect",
    label: "Connect data",
    subtitle: "Bring in balances and spending so the app can tell a believable story.",
    title: "Connect your money story",
  },
  {
    id: "goals",
    label: "Set goals",
    subtitle: "Pick the things you are saving for first so Cheddar can personalize the experience.",
    title: "Start with goals that feel real",
  },
  {
    id: "tracking",
    label: "Track progress",
    subtitle: "Preview the same chart, nudges, and goal progress patterns from the Savings screen.",
    title: "Track progress like the live screen",
  },
  {
    id: "completed",
    label: "Completed goals",
    subtitle: "Celebrate wins with a finished-goals rail so the experience feels lived in from day one.",
    title: "Show completed goals too",
  },
];

const CONNECTIONS: Connection[] = [
  {
    accent: "#56d7ff",
    detail: "Import balances and recurring deposits to start the savings story with real numbers.",
    icon: ASSETS.coin,
    id: "balances",
    label: "Balance snapshots",
  },
  {
    accent: "#ff91f2",
    detail: "Pull monthly spending so Trips, Entertainment, Food, and Clothes appear automatically.",
    icon: ASSETS.tripsIcon,
    id: "spending",
    label: "Spending history",
  },
  {
    accent: "#b0fe00",
    detail: "Turn spare-change habits into nudges, milestones, and better tracking moments.",
    icon: ASSETS.foodIcon,
    id: "roundups",
    label: "Round-ups and habits",
  },
];

const CATEGORIES: Category[] = [
  { amount: 212.2, icon: ASSETS.tripsIcon, label: "Trips", percentage: 65 },
  { amount: 56.1, icon: ASSETS.entertainmentIcon, label: "Entertainment", percentage: 17 },
  { amount: 29.34, icon: ASSETS.foodIcon, label: "Food", percentage: 10 },
  { amount: 27.24, icon: ASSETS.clothesIcon, label: "Clothes", percentage: 8 },
];

const GOAL_OPTIONS: GoalOption[] = [
  {
    accent: "#ff91f2",
    background: "#ffc6f8",
    image: ASSETS.headphones,
    imageClassName: styles.goalImageHeadphones,
    label: "Headphones",
    saved: 76.5,
    target: 280,
    trackColor: "#c9109b",
  },
  {
    accent: "#aa8bff",
    background: "#cebeff",
    image: ASSETS.sneaker,
    imageClassName: styles.goalImageSneaker,
    label: "Sneakers",
    saved: 100,
    target: 120,
    trackColor: "#7747ff",
  },
  {
    accent: "#b0fe00",
    background: "#d4ff72",
    image: ASSETS.goggles,
    imageClassName: styles.goalImageTrip,
    label: "Freshman Trip",
    saved: 18.2,
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
    note: "Completed in March",
  },
  {
    accent: "#56d7ff",
    amount: 260,
    image: ASSETS.camera,
    imageClassName: styles.completedImageCamera,
    label: "Camera",
    note: "Completed in February",
  },
  {
    accent: "#b0fe00",
    amount: 80,
    image: ASSETS.artBook,
    imageClassName: styles.completedImageBook,
    label: "Art Book",
    note: "Completed in January",
  },
];

const formatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: "currency",
});

export function CheddarOnboardingFlow({ initialStep }: { initialStep?: OnboardingStepId }) {
  const router = useRouter();
  const initialStepIndex = initialStep ? STEPS.findIndex((step) => step.id === initialStep) : 0;
  const [stepIndex, setStepIndex] = useState(initialStepIndex >= 0 ? initialStepIndex : 0);
  const [connectedIds, setConnectedIds] = useState<string[]>(["balances", "spending"]);
  const [selectedGoalLabels, setSelectedGoalLabels] = useState<string[]>(["Headphones", "Sneakers"]);

  const activeStep = STEPS[stepIndex];
  const selectedGoals = GOAL_OPTIONS.filter((goal) => selectedGoalLabels.includes(goal.label));
  const connectedSources = CONNECTIONS.filter((connection) => connectedIds.includes(connection.id));
  const projectedSavings = CATEGORIES.reduce((sum, category) => sum + category.amount, 0);
  const [wholeDollars, cents] = projectedSavings.toFixed(2).split(".");

  const canContinue =
    stepIndex === 0 ? connectedIds.length > 0 : stepIndex === 1 ? selectedGoals.length > 0 : true;
  const isLastStep = stepIndex === STEPS.length - 1;

  useEffect(() => {
    if (initialStepIndex >= 0) {
      setStepIndex(initialStepIndex);
    }
  }, [initialStepIndex]);

  function moveToStep(nextIndex: number) {
    startTransition(() => {
      const normalizedIndex = Math.max(0, Math.min(STEPS.length - 1, nextIndex));
      const nextStep = STEPS[normalizedIndex];

      setStepIndex(normalizedIndex);
      router.replace(`/onboarding?step=${nextStep.id}`, { scroll: false });
    });
  }

  function toggleConnection(connectionId: string) {
    setConnectedIds((current) =>
      current.includes(connectionId)
        ? current.filter((id) => id !== connectionId)
        : [...current, connectionId],
    );
  }

  function toggleGoal(goalLabel: string) {
    setSelectedGoalLabels((current) => {
      if (current.includes(goalLabel)) {
        return current.filter((label) => label !== goalLabel);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, goalLabel];
    });
  }

  return (
    <main className={styles.page}>
      <section className={styles.phoneFrame} id="onboarding-phone-frame">
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
            <header className={styles.hero}>
              <p className={styles.eyebrow}>Cheddar onboarding</p>
              <h1 className={styles.title}>{activeStep.title}</h1>
              <p className={styles.subtitle}>{activeStep.subtitle}</p>
            </header>

            <div className={styles.progressTrack} aria-hidden="true">
              <div
                className={styles.progressFill}
                style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
              />
            </div>

            <div className={styles.stepRail}>
              {STEPS.map((step, index) => {
                const state =
                  index === stepIndex ? styles.stepButtonActive : index < stepIndex ? styles.stepButtonDone : "";

                return (
                  <button
                    key={step.id}
                    type="button"
                    className={`${styles.stepButton} ${state}`}
                    onClick={() => moveToStep(index)}
                  >
                    <span className={styles.stepIndex}>{index + 1}</span>
                    <span className={styles.stepLabel}>{step.label}</span>
                  </button>
                );
              })}
            </div>

            {stepIndex === 0 ? (
              <section className={styles.stage}>
                <div className={`${styles.card} ${styles.softCard}`}>
                  <p className={styles.cardEyebrow}>Connected sources</p>
                  <div className={styles.metricRow}>
                    <div>
                      <p className={styles.metricValue}>{connectedIds.length}/3</p>
                      <p className={styles.metricCaption}>sources live</p>
                    </div>
                    <div className={styles.tagRow}>
                      {connectedSources.map((connection) => (
                        <span className={styles.tag} key={connection.id}>
                          {connection.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.optionList}>
                  {CONNECTIONS.map((connection) => {
                    const active = connectedIds.includes(connection.id);

                    return (
                      <button
                        key={connection.id}
                        type="button"
                        className={`${styles.optionCard} ${active ? styles.optionCardActive : ""}`}
                        onClick={() => toggleConnection(connection.id)}
                        aria-pressed={active}
                      >
                        <div
                          className={styles.optionIconWrap}
                          style={{ "--option-accent": connection.accent } as CSSProperties}
                        >
                          <img alt="" className={styles.optionIcon} src={connection.icon} />
                        </div>
                        <div className={styles.optionBody}>
                          <p className={styles.optionTitle}>{connection.label}</p>
                          <p className={styles.optionText}>{connection.detail}</p>
                        </div>
                        <span className={`${styles.optionBadge} ${active ? styles.optionBadgeActive : ""}`}>
                          {active ? "Connected" : "Add"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className={styles.card}>
                  <p className={styles.cardTitle}>What this unlocks</p>
                  <p className={styles.cardText}>
                    Once connected, the onboarding flow can preload the same category mix as the Savings screen.
                  </p>
                  <div className={styles.tagRow}>
                    {CATEGORIES.map((category) => (
                      <span className={styles.tag} key={category.label}>
                        {category.label}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {stepIndex === 1 ? (
              <section className={styles.stage}>
                <div className={`${styles.card} ${styles.softCard}`}>
                  <p className={styles.cardEyebrow}>Goal setup</p>
                  <div className={styles.metricRow}>
                    <div>
                      <p className={styles.metricValue}>{selectedGoals.length || 0}</p>
                      <p className={styles.metricCaption}>goals selected</p>
                    </div>
                    <p className={styles.inlineMeta}>Pick up to three to mirror the final screen.</p>
                  </div>
                </div>

                <div className={styles.goalPicker}>
                  {GOAL_OPTIONS.map((goal) => {
                    const active = selectedGoalLabels.includes(goal.label);
                    const goalStyle = {
                      "--goal-background": goal.background,
                      "--goal-accent": goal.accent,
                    } as CSSProperties;

                    return (
                      <button
                        key={goal.label}
                        type="button"
                        className={`${styles.goalSelectCard} ${active ? styles.goalSelectCardActive : ""}`}
                        style={goalStyle}
                        onClick={() => toggleGoal(goal.label)}
                        aria-pressed={active}
                      >
                        <div className={styles.goalSelectArt}>
                          <img alt="" className={goal.imageClassName} src={goal.image} />
                        </div>
                        <div className={styles.goalSelectBody}>
                          <p className={styles.optionTitle}>{goal.label}</p>
                          <p className={styles.optionText}>Target {formatter.format(goal.target)}</p>
                        </div>
                        <span className={`${styles.optionBadge} ${active ? styles.optionBadgeActive : ""}`}>
                          {active ? "Selected" : "Choose"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className={styles.card}>
                  <p className={styles.cardTitle}>Selected goals preview</p>
                  <div className={styles.goalListCompact}>
                    {selectedGoals.map((goal) => (
                      <div className={styles.goalCompactRow} key={goal.label}>
                        <span className={styles.goalCompactName}>{goal.label}</span>
                        <span className={styles.goalCompactValue}>{formatter.format(goal.target)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {stepIndex === 2 ? (
              <section className={styles.stage}>
                <section className={styles.chartCard} aria-labelledby="tracking-preview-title">
                  <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle} id="tracking-preview-title">
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
                        <p className={styles.categoryAmount}>{formatter.format(category.amount)}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Tracking goals</h2>
                  </div>

                  <div className={styles.goalList}>
                    {selectedGoals.map((goal) => {
                      const goalStyle = {
                        "--goal-background": goal.background,
                        "--goal-progress": `${(goal.saved / goal.target) * 100}%`,
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
                              <p className={styles.goalTarget}>{formatter.format(goal.target)}</p>
                            </div>

                            <div className={styles.goalProgressTrack}>
                              <div className={styles.goalProgressFill} />
                            </div>

                            <div className={styles.goalBottomRow}>
                              <p className={styles.goalMeta}>{formatter.format(goal.saved)}</p>
                              <p className={styles.goalMeta}>{formatter.format(goal.target - goal.saved)}</p>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>

                <div className={`${styles.card} ${styles.noticeCard}`}>
                  <div className={styles.noticeCoinFrame} aria-hidden="true">
                    <img alt="" className={styles.noticeCoin} src={ASSETS.coin} />
                  </div>
                  <div className={styles.noticeCopy}>
                    <p className={styles.noticeTitle}>Proactive nudges</p>
                    <p className={styles.noticeText}>
                      The onboarding flow can seed watch-outs and progress checkpoints so the screen feels alive immediately.
                    </p>
                  </div>
                </div>
              </section>
            ) : null}

            {stepIndex === 3 ? (
              <section className={styles.stage}>
                <div className={`${styles.card} ${styles.softCard}`}>
                  <p className={styles.cardEyebrow}>Completed goals rail</p>
                  <p className={styles.cardTitle}>Keep old wins visible</p>
                  <p className={styles.cardText}>
                    This mirrors the prior screen so users can see finished purchases alongside current targets.
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
                            <p className={styles.completedAmount}>{formatter.format(goal.amount)}</p>
                            <p className={styles.completedNote}>{goal.note}</p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.card}>
                  <p className={styles.cardTitle}>Onboarding outcome</p>
                  <ul className={styles.summaryList}>
                    <li>{connectedIds.length} connected data sources prime the categories and chart.</li>
                    <li>{selectedGoals.length} starter goals show progress from the first session.</li>
                    <li>Completed goals make the experience feel trustworthy before users add more money.</li>
                  </ul>
                </div>
              </section>
            ) : null}
          </div>

          <footer className={styles.footer}>
            <div className={styles.footerActions}>
              {stepIndex > 0 ? (
                <button type="button" className={styles.secondaryAction} onClick={() => moveToStep(stepIndex - 1)}>
                  Back
                </button>
              ) : (
                <Link className={styles.secondaryAction} href="/">
                  Skip to savings
                </Link>
              )}

              {isLastStep ? (
                <Link className={styles.primaryAction} href="/">
                  Open savings home
                </Link>
              ) : (
                <button
                  type="button"
                  className={styles.primaryAction}
                  onClick={() => moveToStep(stepIndex + 1)}
                  disabled={!canContinue}
                >
                  Next step
                </button>
              )}
            </div>
          </footer>
        </div>
      </section>
    </main>
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

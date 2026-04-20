"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Home,
  Lightbulb,
  PiggyBank,
  Plus,
  Settings2,
  UserRound,
  X,
} from "lucide-react";

import {
  COMPLETED_GOAL_PRESETS,
  GOAL_PRESETS,
  formatCurrency,
  useCheddarPrototype,
} from "./cheddar-prototype-state";
import styles from "./cheddar-savings.module.css";

type DrawerState =
  | { type: "deposit" }
  | { type: "categories" }
  | { type: "goal-create" }
  | { type: "goal-detail"; goalId: string }
  | { type: "completed" }
  | { type: "tools" }
  | null;

const DEPOSIT_OPTIONS = [25, 50, 100, 200];

type CaptureState =
  | "empty"
  | "deposit-sheet"
  | "spending-loaded"
  | "goal-create-sheet"
  | "goal-detail-sheet"
  | "completed-sheet"
  | "filled";

export function CheddarSavings({ captureState }: { captureState?: string }) {
  const {
    addCompletedGoal,
    addDeposit,
    categories,
    completeGoal,
    completedGoals,
    createGoal,
    fundGoal,
    goals,
    loadStarterCategories,
    resetPrototype,
    totalSavings,
  } = useCheddarPrototype();
  const [depositAmount, setDepositAmount] = useState(50);
  const [selectedGoalId, setSelectedGoalId] = useState(GOAL_PRESETS[0]?.id ?? "");
  const [selectedCompletedId, setSelectedCompletedId] = useState(
    COMPLETED_GOAL_PRESETS[0]?.id ?? "",
  );
  const [drawer, setDrawer] = useState<DrawerState>(null);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const lastCaptureState = useRef<string | null>(null);

  const usedGoalIds = new Set([
    ...goals.map((goal) => goal.presetId),
    ...completedGoals.map((goal) => goal.presetId),
  ]);
  const availableGoalPresets = GOAL_PRESETS.filter((preset) => !usedGoalIds.has(preset.id));
  const availableCompletedPresets = COMPLETED_GOAL_PRESETS.filter(
    (preset) => !completedGoals.some((goal) => goal.presetId === preset.id),
  );
  const selectedGoal =
    drawer?.type === "goal-detail"
      ? goals.find((goal) => goal.id === drawer.goalId) ?? null
      : null;
  const spentSoFar = categories.reduce((sum, category) => sum + category.spent, 0);
  const storySteps = [
    {
      id: "deposit",
      done: totalSavings > 0,
      label: "Add deposit",
      onClick: () => setDrawer({ type: "deposit" }),
    },
    {
      id: "categories",
      done: categories.length > 0,
      label: "Load month",
      onClick: () => setDrawer({ type: "categories" }),
    },
    {
      id: "goals",
      done: goals.length >= GOAL_PRESETS.length,
      label: "Create goals",
      onClick: () => setDrawer({ type: "goal-create" }),
    },
    {
      id: "wins",
      done: completedGoals.length >= COMPLETED_GOAL_PRESETS.length,
      label: "Load wins",
      onClick: () => setDrawer({ type: "completed" }),
    },
  ];
  const completedStorySteps = storySteps.filter((step) => step.done).length;
  const storyComplete = completedStorySteps === storySteps.length;
  const summaryCopy =
    categories.length > 0
      ? "Trips are still leading your spending, but you're staying pretty balanced across the month."
      : "Start with a deposit, then load April spending to turn this empty screen into a believable savings story.";

  useEffect(() => {
    if (!availableGoalPresets.length) {
      return;
    }

    if (!availableGoalPresets.some((preset) => preset.id === selectedGoalId)) {
      setSelectedGoalId(availableGoalPresets[0].id);
    }
  }, [availableGoalPresets, selectedGoalId]);

  useEffect(() => {
    if (!availableCompletedPresets.length) {
      return;
    }

    if (!availableCompletedPresets.some((preset) => preset.id === selectedCompletedId)) {
      setSelectedCompletedId(availableCompletedPresets[0].id);
    }
  }, [availableCompletedPresets, selectedCompletedId]);

  useEffect(() => {
    if (categories.length > 0) {
      setAlertDismissed(false);
    }
  }, [categories.length]);

  useEffect(() => {
    if (!captureState || lastCaptureState.current === captureState) {
      return;
    }

    if (typeof window !== "undefined") {
      const captureWindow = window as Window & { __cheddarCaptureApplied?: string };

      if (captureWindow.__cheddarCaptureApplied === captureState) {
        lastCaptureState.current = captureState;
        return;
      }

      captureWindow.__cheddarCaptureApplied = captureState;
    }

    lastCaptureState.current = captureState;
    resetPrototype();
    setAlertDismissed(false);

    const normalizedCaptureState = captureState as CaptureState;

    if (
      normalizedCaptureState === "spending-loaded" ||
      normalizedCaptureState === "goal-create-sheet" ||
      normalizedCaptureState === "goal-detail-sheet" ||
      normalizedCaptureState === "completed-sheet" ||
      normalizedCaptureState === "filled"
    ) {
      addDeposit(50);
      loadStarterCategories();
    }

    if (
      normalizedCaptureState === "goal-detail-sheet" ||
      normalizedCaptureState === "completed-sheet" ||
      normalizedCaptureState === "filled"
    ) {
      createGoal("headphones");
    }

    if (normalizedCaptureState === "completed-sheet" || normalizedCaptureState === "filled") {
      createGoal("sneakers");
      createGoal("trip");
    }

    if (normalizedCaptureState === "filled") {
      addCompletedGoal("skateboard");
      addCompletedGoal("camera");
      addCompletedGoal("art-books");
    }

    if (normalizedCaptureState === "deposit-sheet") {
      setDrawer({ type: "deposit" });
      return;
    }

    if (normalizedCaptureState === "goal-create-sheet") {
      setDrawer({ type: "goal-create" });
      return;
    }

    if (normalizedCaptureState === "goal-detail-sheet") {
      setDrawer({ type: "goal-detail", goalId: "capture-headphones" });
      return;
    }

    if (normalizedCaptureState === "completed-sheet") {
      setDrawer({ type: "completed" });
      return;
    }

    setDrawer(null);
  }, [
    addCompletedGoal,
    addDeposit,
    captureState,
    createGoal,
    loadStarterCategories,
    resetPrototype,
  ]);

  useEffect(() => {
    if (drawer?.type !== "goal-detail" || drawer.goalId !== "capture-headphones") {
      return;
    }

    if (goals[0]) {
      setDrawer({ type: "goal-detail", goalId: goals[0].id });
    }
  }, [drawer, goals]);

  function closeDrawer() {
    setDrawer(null);
  }

  function handleDeposit() {
    addDeposit(depositAmount);
    closeDrawer();
  }

  function handleCreateGoal() {
    if (!selectedGoalId) {
      return;
    }

    createGoal(selectedGoalId);
    closeDrawer();
  }

  function handleCreateCompletedGoal() {
    if (!selectedCompletedId) {
      return;
    }

    addCompletedGoal(selectedCompletedId);
    closeDrawer();
  }

  function handleLoadAllCompletedGoals() {
    availableCompletedPresets.forEach((preset) => addCompletedGoal(preset.id));
    closeDrawer();
  }

  function handleFundGoal(goalId: string, amount: number) {
    fundGoal(goalId, amount);
    closeDrawer();
  }

  function handleCompleteGoal(goalId: string) {
    completeGoal(goalId);
    closeDrawer();
  }

  return (
    <main className={styles.page}>
      <div className={styles.phoneFrame}>
        <div className={styles.phone}>
          <div className={styles.statusBar}>
            <span>9:41</span>
            <div className={styles.statusIcons}>
              <span className={styles.signal} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className={styles.battery} aria-hidden="true" />
            </div>
          </div>

          <div className={styles.content}>
            <header className={styles.header}>
              <div>
                <p className={styles.kicker}>Savings</p>
                <h1 className={styles.title}>Keep your spending honest.</h1>
              </div>
              <button
                type="button"
                className={styles.settingsButton}
                aria-label="Open prototype controls"
                onClick={() => setDrawer({ type: "tools" })}
              >
                <Settings2 size={16} strokeWidth={2.2} />
              </button>
            </header>

            <section className={`${styles.panel} ${styles.summaryCard}`}>
              <p className={styles.summaryLabel}>Spent so far</p>
              <p className={styles.summaryAmount}>
                {categories.length > 0 ? formatCurrency(spentSoFar, 0) : "$0"}
              </p>
              <div className={styles.summaryChip}>April</div>
              <p className={styles.summaryText}>{summaryCopy}</p>

              {!storyComplete ? (
                <div className={styles.storyRail}>
                  {storySteps.map((step) =>
                    step.done ? (
                      <span key={step.id} className={`${styles.storyPill} ${styles.storyPillDone}`}>
                        <Check size={13} /> {step.label}
                      </span>
                    ) : (
                      <button
                        key={step.id}
                        type="button"
                        className={styles.storyPillButton}
                        onClick={step.onClick}
                      >
                        {step.label}
                      </button>
                    ),
                  )}
                </div>
              ) : null}
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Categories</h2>
                <span className={styles.viewAll}>This month</span>
              </div>

              {categories.length > 0 ? (
                <div className={styles.categoryList}>
                  {categories.map((category) => (
                    <article key={category.id} className={`${styles.panel} ${styles.categoryCard}`}>
                      <div
                        className={styles.categoryIcon}
                        style={{ "--category-tint": category.tint } as CSSProperties}
                        aria-hidden="true"
                      >
                        {category.icon}
                      </div>
                      <div className={styles.categoryBody}>
                        <div className={styles.categoryTop}>
                          <div>
                            <p className={styles.categoryName}>{category.name}</p>
                            <p className={styles.categoryNote}>{category.note}</p>
                          </div>
                          <div className={styles.categorySpend}>
                            <strong>{formatCurrency(category.spent, 0)}</strong>
                            <span>{formatCurrency(category.budget, 0)} budget</span>
                          </div>
                        </div>
                        <div className={styles.progressTrack}>
                          <div
                            className={styles.progressFill}
                            style={
                              {
                                "--progress": `${Math.min((category.spent / category.budget) * 100, 100)}%`,
                                "--progress-color": category.color,
                              } as CSSProperties
                            }
                          />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className={`${styles.panel} ${styles.emptyStateCard}`}>
                  <h3 className={styles.emptyStateTitle}>No categories yet</h3>
                  <p className={styles.emptyStateText}>
                    Load April spending to reveal the four category cards, progress bars, and the
                    alert state from the final design.
                  </p>
                  <button
                    type="button"
                    className={styles.secondaryActionButton}
                    onClick={() => setDrawer({ type: "categories" })}
                  >
                    Load April spending
                  </button>
                </div>
              )}
            </section>

            {categories.length > 0 && !alertDismissed ? (
              <section className={styles.section}>
                <div className={`${styles.panel} ${styles.alertCard}`}>
                  <div className={styles.alertCoin} aria-hidden="true">
                    <div className={styles.alertCoinInner} />
                  </div>
                  <div className={styles.alertBody}>
                    <p className={styles.alertTitle}>Watch out!</p>
                    <p className={styles.alertText}>
                      You&apos;re spending 35% more than you usually are by this point each month.
                    </p>
                    <button
                      type="button"
                      className={styles.alertLink}
                      onClick={() => setDrawer({ type: "tools" })}
                    >
                      Learn more <ArrowRight size={14} />
                    </button>
                  </div>
                  <button
                    type="button"
                    className={styles.alertClose}
                    aria-label="Dismiss alert"
                    onClick={() => setAlertDismissed(true)}
                  >
                    <X size={14} />
                  </button>
                </div>
              </section>
            ) : null}

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Goals</h2>
                {availableGoalPresets.length > 0 ? (
                  <button
                    type="button"
                    className={styles.sectionAction}
                    onClick={() => setDrawer({ type: "goal-create" })}
                  >
                    Add goal <ArrowRight size={12} />
                  </button>
                ) : (
                  <span className={styles.viewAll}>
                    View all <ArrowRight size={12} />
                  </span>
                )}
              </div>

              {goals.length > 0 ? (
                <div className={styles.goalList}>
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      className={`${styles.panel} ${styles.goalCard}`}
                      onClick={() => setDrawer({ type: "goal-detail", goalId: goal.id })}
                    >
                      <div
                        className={styles.goalIcon}
                        style={{ "--goal-bg": goal.background } as CSSProperties}
                        aria-hidden="true"
                      >
                        {goal.icon}
                      </div>
                      <div className={styles.goalBody}>
                        <div className={styles.goalTop}>
                          <div>
                            <p className={styles.goalName}>{goal.name}</p>
                            <p className={styles.goalDetail}>{formatCurrency(goal.saved)} saved</p>
                          </div>
                          <p className={styles.goalTarget}>{formatCurrency(goal.target, 0)}</p>
                        </div>
                        <div className={styles.progressTrack}>
                          <div
                            className={styles.progressFill}
                            style={
                              {
                                "--progress": `${Math.min((goal.saved / goal.target) * 100, 100)}%`,
                                "--progress-color": goal.color,
                              } as CSSProperties
                            }
                          />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className={`${styles.panel} ${styles.emptyStateCard}`}>
                  <h3 className={styles.emptyStateTitle}>No goals yet</h3>
                  <p className={styles.emptyStateText}>
                    Create your first savings goal and tap the card later to fund it or move it to
                    completed.
                  </p>
                  <button
                    type="button"
                    className={styles.secondaryActionButton}
                    onClick={() => setDrawer({ type: "goal-create" })}
                  >
                    Create first goal
                  </button>
                </div>
              )}
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Completed goals</h2>
                {availableCompletedPresets.length > 0 ? (
                  <button
                    type="button"
                    className={styles.sectionAction}
                    onClick={() => setDrawer({ type: "completed" })}
                  >
                    Load wins <ArrowRight size={12} />
                  </button>
                ) : (
                  <span className={styles.viewAll}>Nice work</span>
                )}
              </div>

              {completedGoals.length > 0 ? (
                <div className={styles.completedScroller}>
                  <div className={styles.completedRail}>
                    {completedGoals.map((goal) => (
                      <article
                        key={goal.id}
                        className={`${styles.panel} ${styles.completedCard}`}
                        style={
                          {
                            "--completed-accent": goal.accent,
                            "--completed-tint": goal.tint,
                          } as CSSProperties
                        }
                      >
                        <div className={styles.completedArt} aria-hidden="true">
                          <span className={styles.completedEmoji}>{goal.icon}</span>
                        </div>
                        <div className={styles.completedMeta}>
                          <p className={styles.completedName}>{goal.name}</p>
                          <p className={styles.completedNote}>{goal.note}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={`${styles.panel} ${styles.emptyStateCard}`}>
                  <h3 className={styles.emptyStateTitle}>No past wins yet</h3>
                  <p className={styles.emptyStateText}>
                    Load your previous completed goals to unlock the finished-goals rail from the
                    final screen.
                  </p>
                  <button
                    type="button"
                    className={styles.secondaryActionButton}
                    onClick={() => setDrawer({ type: "completed" })}
                  >
                    Load past wins
                  </button>
                </div>
              )}
            </section>
          </div>

          <nav className={styles.bottomNav} aria-label="Primary">
            <div className={styles.navRow}>
              <Link href="/" className={styles.navButton} aria-label="Go to home">
                <Home size={20} />
              </Link>
              <Link
                href="/savings"
                className={`${styles.navButton} ${styles.navButtonActive}`}
                aria-current="page"
                aria-label="Go to savings"
              >
                <PiggyBank size={20} />
              </Link>
              <button
                type="button"
                className={styles.navFab}
                onClick={() => setDrawer({ type: "deposit" })}
                aria-label="Add savings"
              >
                <Plus size={24} strokeWidth={2.8} />
              </button>
              <div className={styles.navButton}>
                <Lightbulb size={20} />
              </div>
              <div className={styles.navButton}>
                <UserRound size={20} />
              </div>
            </div>
            <div className={styles.homeIndicator} />
          </nav>

          {drawer ? (
            <div className={styles.sheetBackdrop} onClick={closeDrawer}>
              <div
                className={styles.sheet}
                role="dialog"
                aria-modal="true"
                onClick={(event) => event.stopPropagation()}
              >
                <div className={styles.sheetHandle} />

                {drawer.type === "deposit" ? (
                  <>
                    <div className={styles.sheetHeader}>
                      <div>
                        <p className={styles.sheetEyebrow}>Savings action</p>
                        <h2 className={styles.sheetTitle}>Add to savings</h2>
                      </div>
                      <button
                        type="button"
                        className={styles.sheetClose}
                        onClick={closeDrawer}
                        aria-label="Close"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <p className={styles.sheetText}>
                      Pick a deposit amount. This helps wake up the empty state and gives the rest
                      of the prototype something to build on.
                    </p>
                    <div className={styles.amountPicker}>
                      {DEPOSIT_OPTIONS.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          className={`${styles.amountChip} ${
                            depositAmount === amount ? styles.amountChipActive : ""
                          }`}
                          onClick={() => setDepositAmount(amount)}
                        >
                          {formatCurrency(amount)}
                        </button>
                      ))}
                    </div>
                    <button type="button" className={styles.primarySheetAction} onClick={handleDeposit}>
                      <ArrowDown size={16} /> Add {formatCurrency(depositAmount)}
                    </button>
                  </>
                ) : null}

                {drawer.type === "categories" ? (
                  <>
                    <div className={styles.sheetHeader}>
                      <div>
                        <p className={styles.sheetEyebrow}>April setup</p>
                        <h2 className={styles.sheetTitle}>Load starter spending</h2>
                      </div>
                      <button
                        type="button"
                        className={styles.sheetClose}
                        onClick={closeDrawer}
                        aria-label="Close"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <p className={styles.sheetText}>
                      This loads Trips, Entertainment, Food, and Clothes so the category list and
                      spending alert populate immediately.
                    </p>
                    <div className={styles.previewPills}>
                      <span className={styles.previewPill}>Trips</span>
                      <span className={styles.previewPill}>Entertainment</span>
                      <span className={styles.previewPill}>Food</span>
                      <span className={styles.previewPill}>Clothes</span>
                    </div>
                    <button
                      type="button"
                      className={styles.primarySheetAction}
                      onClick={() => {
                        loadStarterCategories();
                        closeDrawer();
                      }}
                      disabled={categories.length > 0}
                    >
                      {categories.length > 0 ? "April already loaded" : "Load April spending"}
                    </button>
                  </>
                ) : null}

                {drawer.type === "goal-create" ? (
                  <>
                    <div className={styles.sheetHeader}>
                      <div>
                        <p className={styles.sheetEyebrow}>Goal builder</p>
                        <h2 className={styles.sheetTitle}>Create a savings goal</h2>
                      </div>
                      <button
                        type="button"
                        className={styles.sheetClose}
                        onClick={closeDrawer}
                        aria-label="Close"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <p className={styles.sheetText}>
                      Each starter goal arrives with realistic progress so the final screen fills in
                      quickly without feeling fake.
                    </p>
                    {availableGoalPresets.length > 0 ? (
                      <div className={styles.optionList}>
                        {availableGoalPresets.map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            className={`${styles.optionCard} ${
                              selectedGoalId === preset.id ? styles.optionCardActive : ""
                            }`}
                            onClick={() => setSelectedGoalId(preset.id)}
                          >
                            <span className={styles.optionEmoji}>{preset.icon}</span>
                            <span className={styles.optionBody}>
                              <span className={styles.optionTitle}>{preset.name}</span>
                              <span className={styles.optionMeta}>
                                Starts with {formatCurrency(preset.seedSaved)} saved toward{" "}
                                {formatCurrency(preset.target, 0)}
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className={styles.sheetText}>All starter goals are already on the screen.</p>
                    )}
                    <button
                      type="button"
                      className={styles.primarySheetAction}
                      onClick={handleCreateGoal}
                      disabled={availableGoalPresets.length === 0}
                    >
                      Create goal
                    </button>
                  </>
                ) : null}

                {drawer.type === "goal-detail" && selectedGoal ? (
                  <>
                    <div className={styles.sheetHeader}>
                      <div>
                        <p className={styles.sheetEyebrow}>Goal details</p>
                        <h2 className={styles.sheetTitle}>{selectedGoal.name}</h2>
                      </div>
                      <button
                        type="button"
                        className={styles.sheetClose}
                        onClick={closeDrawer}
                        aria-label="Close"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <p className={styles.sheetText}>
                      Fund this goal or move it to the completed rail when you want the prototype to
                      show a finished win.
                    </p>
                    <div className={styles.goalDetailCard}>
                      <div className={styles.goalDetailHeader}>
                        <span
                          className={styles.goalDetailIcon}
                          style={{ "--goal-bg": selectedGoal.background } as CSSProperties}
                          aria-hidden="true"
                        >
                          {selectedGoal.icon}
                        </span>
                        <div>
                          <p className={styles.goalDetailAmount}>
                            {formatCurrency(selectedGoal.saved)} of{" "}
                            {formatCurrency(selectedGoal.target, 0)}
                          </p>
                          <p className={styles.goalDetailRemaining}>
                            {formatCurrency(Math.max(selectedGoal.target - selectedGoal.saved, 0))} left
                          </p>
                        </div>
                      </div>
                      <div className={styles.progressTrack}>
                        <div
                          className={styles.progressFill}
                          style={
                            {
                              "--progress": `${Math.min(
                                (selectedGoal.saved / selectedGoal.target) * 100,
                                100,
                              )}%`,
                              "--progress-color": selectedGoal.color,
                            } as CSSProperties
                          }
                        />
                      </div>
                    </div>
                    <div className={styles.amountPicker}>
                      {[25, 50, 100].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          className={styles.amountChip}
                          onClick={() => handleFundGoal(selectedGoal.id, amount)}
                        >
                          + {formatCurrency(amount)}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      className={styles.primarySheetAction}
                      onClick={() => handleCompleteGoal(selectedGoal.id)}
                    >
                      Move to completed
                    </button>
                  </>
                ) : null}

                {drawer.type === "completed" ? (
                  <>
                    <div className={styles.sheetHeader}>
                      <div>
                        <p className={styles.sheetEyebrow}>History</p>
                        <h2 className={styles.sheetTitle}>Load past wins</h2>
                      </div>
                      <button
                        type="button"
                        className={styles.sheetClose}
                        onClick={closeDrawer}
                        aria-label="Close"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <p className={styles.sheetText}>
                      Add archived completed goals so the horizontal celebration rail matches the
                      final Savings screen.
                    </p>
                    {availableCompletedPresets.length > 0 ? (
                      <div className={styles.optionList}>
                        {availableCompletedPresets.map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            className={`${styles.optionCard} ${
                              selectedCompletedId === preset.id ? styles.optionCardActive : ""
                            }`}
                            onClick={() => setSelectedCompletedId(preset.id)}
                          >
                            <span className={styles.optionEmoji}>{preset.icon}</span>
                            <span className={styles.optionBody}>
                              <span className={styles.optionTitle}>{preset.name}</span>
                              <span className={styles.optionMeta}>{preset.note}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className={styles.sheetText}>All starter wins are already loaded.</p>
                    )}
                    <div className={styles.sheetActionRow}>
                      <button
                        type="button"
                        className={styles.secondarySheetAction}
                        onClick={handleLoadAllCompletedGoals}
                        disabled={availableCompletedPresets.length === 0}
                      >
                        Load all wins
                      </button>
                      <button
                        type="button"
                        className={styles.primarySheetAction}
                        onClick={handleCreateCompletedGoal}
                        disabled={availableCompletedPresets.length === 0}
                      >
                        Add selected win
                      </button>
                    </div>
                  </>
                ) : null}

                {drawer.type === "tools" ? (
                  <>
                    <div className={styles.sheetHeader}>
                      <div>
                        <p className={styles.sheetEyebrow}>Prototype controls</p>
                        <h2 className={styles.sheetTitle}>Savings progress</h2>
                      </div>
                      <button
                        type="button"
                        className={styles.sheetClose}
                        onClick={closeDrawer}
                        aria-label="Close"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <p className={styles.sheetText}>
                      {storyComplete
                        ? "The full Savings story is live. You can still add more deposits or reset to replay the flow."
                        : `${completedStorySteps} of ${storySteps.length} core story beats are live. Use the buttons below to keep building.`}
                    </p>
                    <div className={styles.progressMeter}>
                      <div className={styles.progressTrack}>
                        <div
                          className={styles.progressFill}
                          style={
                            {
                              "--progress": `${(completedStorySteps / storySteps.length) * 100}%`,
                              "--progress-color": "var(--cheddar-accent)",
                            } as CSSProperties
                          }
                        />
                      </div>
                    </div>
                    <div className={styles.toolList}>
                      <button
                        type="button"
                        className={styles.secondarySheetAction}
                        onClick={() => setDrawer({ type: "deposit" })}
                      >
                        Add deposit
                      </button>
                      <button
                        type="button"
                        className={styles.secondarySheetAction}
                        onClick={() => setDrawer({ type: "goal-create" })}
                      >
                        Create goal
                      </button>
                      {categories.length === 0 ? (
                        <button
                          type="button"
                          className={styles.secondarySheetAction}
                          onClick={() => setDrawer({ type: "categories" })}
                        >
                          Load April spending
                        </button>
                      ) : null}
                      {alertDismissed ? (
                        <button
                          type="button"
                          className={styles.secondarySheetAction}
                          onClick={() => {
                            setAlertDismissed(false);
                            closeDrawer();
                          }}
                        >
                          Show insight card
                        </button>
                      ) : null}
                      <button
                        type="button"
                        className={styles.primarySheetAction}
                        onClick={() => {
                          resetPrototype();
                          setAlertDismissed(false);
                          closeDrawer();
                        }}
                      >
                        Reset prototype
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}

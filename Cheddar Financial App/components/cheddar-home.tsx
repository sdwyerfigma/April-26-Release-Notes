"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Home,
  Lightbulb,
  PiggyBank,
  Plus,
  Send,
  Settings2,
  UserRound,
} from "lucide-react";

import { formatCurrency, useCheddarPrototype } from "./cheddar-prototype-state";
import styles from "./cheddar-home.module.css";

function PiggyArt() {
  return (
    <div className={styles.pigStage} aria-hidden="true">
      <div className={styles.pigBlob} />
      <div className={styles.pig}>
        <div className={styles.pigCoinSlot} />
        <div className={styles.pigSnout} />
        <div className={`${styles.pigLeg} ${styles.pigLegLeft}`} />
        <div className={`${styles.pigLeg} ${styles.pigLegMid}`} />
        <div className={`${styles.pigLeg} ${styles.pigLegRight}`} />
      </div>
    </div>
  );
}

export function CheddarHome() {
  const { activities, addDeposit, categories, goals, totalSavings } = useCheddarPrototype();
  const totalSpent = categories.reduce((sum, category) => sum + category.spent, 0);
  const hasSavings = totalSavings > 0;
  const hasCategories = categories.length > 0;
  const hasGoals = goals.length > 0;

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
            <section className={styles.hero}>
              <div className={styles.heroHeader}>
                <h1>Hi, Jamie</h1>
                <Link href="/savings" className={styles.settingsButton} aria-label="Open savings setup">
                  <Settings2 size={16} strokeWidth={2.2} />
                </Link>
              </div>

              <div className={`${styles.panel} ${styles.savingsCard}`}>
                <div className={styles.panelHeader}>
                  <div>
                    <p className={styles.eyebrow}>{hasSavings ? "Total savings" : "Savings starts here"}</p>
                    <p className={styles.displayAmount}>{formatCurrency(totalSavings)}</p>
                    <p className={styles.summaryNote}>
                      {hasSavings
                        ? `You have ${goals.length} active goal${goals.length === 1 ? "" : "s"} and ${categories.length} spending categories live.`
                        : "Start in Savings, then add your first deposit, spending categories, and a goal."}
                    </p>
                  </div>
                  <div className={styles.sparkleBadge} />
                </div>

                <div className={styles.actionRow}>
                  {hasSavings ? (
                    <button type="button" className={styles.actionButton} onClick={() => addDeposit(25)}>
                      <span className={styles.actionIcon}>
                        <ArrowDown size={18} strokeWidth={2.2} />
                      </span>
                      Add $25
                    </button>
                  ) : (
                    <Link href="/savings" className={styles.actionButton}>
                      <span className={styles.actionIcon}>
                        <PiggyBank size={18} strokeWidth={2.2} />
                      </span>
                      Start setup
                    </Link>
                  )}
                  {hasSavings ? (
                    <Link href="/savings" className={styles.actionButton}>
                      <span className={styles.actionIcon}>
                        <Send size={18} strokeWidth={2.2} />
                      </span>
                      Build goals
                    </Link>
                  ) : (
                    <button type="button" className={styles.actionButton} onClick={() => addDeposit(50)}>
                      <span className={styles.actionIcon}>
                        <ArrowDown size={18} strokeWidth={2.2} />
                      </span>
                      Quick add
                    </button>
                  )}
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Recent spending</h2>
                <Link href="/savings" className={styles.viewAll}>
                  {hasCategories ? "View all" : "Set up"} <ArrowRight size={12} />
                </Link>
              </div>

              {hasCategories ? (
                <div className={`${styles.panel} ${styles.sectionBody} ${styles.spendingPanel}`}>
                  <div className={styles.spendingBars}>
                    {categories.map((item) => (
                      <div
                        key={item.id}
                        className={styles.spendingBar}
                        style={
                          {
                            "--bar-color": item.color,
                            "--weight": item.spent,
                          } as CSSProperties
                        }
                      >
                        <span className={styles.spendingValue}>{formatCurrency(item.spent, 0)}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.legend}>
                    {categories.map((item) => (
                      <span key={item.id} className={styles.legendItem}>
                        <span
                          className={styles.legendDot}
                          style={{ "--dot-color": item.color } as CSSProperties}
                        />
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={`${styles.panel} ${styles.emptyStatePanel}`}>
                  <h3 className={styles.emptyStateTitle}>No spending data yet</h3>
                  <p className={styles.emptyStateText}>
                    Add starter categories in Savings and this dashboard will turn into a real month
                    view instead of a blank shell.
                  </p>
                  <div className={styles.emptyStateActions}>
                    <Link href="/savings" className={styles.secondaryActionButton}>
                      Set up categories
                    </Link>
                  </div>
                </div>
              )}
            </section>

            {hasCategories ? (
              <div className={`${styles.panel} ${styles.trendPanel}`}>
                <div className={styles.trendOrb} />
                <div>
                  <p className={styles.trendTitle}>New trend</p>
                  <p className={styles.trendText}>
                    You&apos;ve spent <strong>{formatCurrency(totalSpent, 0)}</strong> so far this
                    month, with Travel still doing most of the damage.
                  </p>
                  <Link href="/savings" className={styles.trendLink}>
                    Review spending <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className={`${styles.panel} ${styles.emptyStatePanel}`}>
                <h3 className={styles.emptyStateTitle}>Nothing to analyze yet</h3>
                <p className={styles.emptyStateText}>
                  Once you load a few categories, Cheddar will start surfacing trends and warnings
                  here automatically.
                </p>
              </div>
            )}

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Goals</h2>
                <Link href="/savings" className={styles.viewAll}>
                  {hasGoals ? "View all" : "Create one"} <ArrowRight size={12} />
                </Link>
              </div>

              {hasGoals ? (
                <div className={styles.goalList}>
                  {goals.map((goal) => {
                    const progress = `${Math.min((goal.saved / goal.target) * 100, 100)}%`;
                    const remaining = Math.max(goal.target - goal.saved, 0);

                    return (
                      <article key={goal.id} className={`${styles.panel} ${styles.goalCard}`}>
                        <div
                          className={styles.goalIcon}
                          style={{ "--goal-bg": goal.background } as CSSProperties}
                          aria-hidden="true"
                        >
                          {goal.icon}
                        </div>
                        <div className={styles.goalMeta}>
                          <div className={styles.goalTop}>
                            <p className={styles.goalName}>{goal.name}</p>
                            <p className={styles.goalTarget}>{formatCurrency(goal.target, 0)}</p>
                          </div>
                          <div className={styles.progressTrack}>
                            <div
                              className={styles.progressFill}
                              style={
                                {
                                  "--progress": progress,
                                  "--progress-color": goal.color,
                                } as CSSProperties
                              }
                            />
                          </div>
                          <div className={styles.goalBottom}>
                            <span>{formatCurrency(goal.saved)} saved</span>
                            <span>{formatCurrency(remaining)} left</span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className={`${styles.panel} ${styles.emptyStatePanel}`}>
                  <h3 className={styles.emptyStateTitle}>No goals yet</h3>
                  <p className={styles.emptyStateText}>
                    Create the first goal in Savings and it will show up here with progress,
                    remaining amount, and quick status.
                  </p>
                  <div className={styles.emptyStateActions}>
                    <Link href="/savings" className={styles.secondaryActionButton}>
                      Create first goal
                    </Link>
                  </div>
                </div>
              )}
            </section>

            <article className={`${styles.panel} ${styles.articleCard}`}>
              <PiggyArt />
              <h2 className={styles.articleTitle}>How to decide what to save for</h2>
              <p className={styles.articleText}>
                Use the Savings flow to load sample data, then keep clicking to build a complete
                story for designers and reviewers.
              </p>
              <Link href="/savings" className={styles.readMore}>
                Open savings flow
              </Link>
            </article>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Recent activity</h2>
                <Link href="/savings" className={styles.viewAll}>
                  {activities.length > 0 ? "View all" : "Get started"} <ArrowRight size={12} />
                </Link>
              </div>

              {activities.length > 0 ? (
                <div className={`${styles.panel} ${styles.activityCard}`}>
                  <div className={styles.activityList}>
                    {activities.map((activity) => (
                      <div key={activity.id} className={styles.activityItem}>
                        <span className={styles.activityIcon} aria-hidden="true">
                          {activity.type === "milestone" ? "✓" : activity.negative ? "↑" : "↓"}
                        </span>
                        <div>
                          <p className={styles.activityName}>{activity.label}</p>
                          <p className={styles.activityTime}>{activity.time}</p>
                        </div>
                        <span
                          className={`${styles.activityAmount} ${
                            activity.negative
                              ? styles.activityAmountNegative
                              : activity.type === "milestone"
                                ? styles.activityAmountNeutral
                                : ""
                          }`}
                        >
                          {activity.amountLabel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={`${styles.panel} ${styles.emptyStatePanel}`}>
                  <h3 className={styles.emptyStateTitle}>No activity yet</h3>
                  <p className={styles.emptyStateText}>
                    Your first deposit or completed goal will populate this feed and make the
                    dashboard feel alive.
                  </p>
                </div>
              )}
            </section>
          </div>

          <nav className={styles.bottomNav} aria-label="Primary">
            <div className={styles.navRow}>
              <Link
                href="/"
                className={`${styles.navButton} ${styles.navButtonActive}`}
                aria-current="page"
                aria-label="Go to home"
              >
                <Home size={20} />
              </Link>
              <Link href="/savings" className={styles.navButton} aria-label="Go to savings">
                <PiggyBank size={20} />
              </Link>
              <button
                type="button"
                className={styles.navFab}
                onClick={() => addDeposit(25)}
                aria-label="Add a demo deposit"
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
        </div>
      </div>
    </main>
  );
}

import type { CSSProperties } from "react";
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
  X,
} from "lucide-react";

import styles from "./cheddar-home.module.css";

const spending = [
  { label: "Trips", value: "$212", weight: 212, color: "#b0fe00" },
  { label: "Entertainment", value: "$56", weight: 56, color: "#56d7ff" },
  { label: "Food", value: "$29", weight: 29, color: "#ff91f2" },
  { label: "Clothes", value: "$16", weight: 16, color: "#aa8bff" },
];

const goals = [
  {
    name: "Headphones",
    icon: "🎧",
    saved: "$76.50",
    target: "$280.00",
    remaining: "$203.50",
    progress: "27.3%",
    color: "#c9109b",
    background: "#ffc6f8",
  },
  {
    name: "Sneakers",
    icon: "👟",
    saved: "$100.00",
    target: "$120.00",
    remaining: "$20.00",
    progress: "83.3%",
    color: "#7747ff",
    background: "#cebeff",
  },
  {
    name: "Freshman Trip",
    icon: "✈️",
    saved: "$18.20",
    target: "$500.00",
    remaining: "$481.80",
    progress: "3.6%",
    color: "#5aba00",
    background: "#d4ff72",
  },
];

const activities = [
  { type: "deposit", label: "Deposit", time: "Today, 11:17am", amount: "$20.00" },
  { type: "deposit", label: "Deposit", time: "Today, 1:34pm", amount: "$45.00" },
  { type: "withdrawal", label: "Withdrawal", time: "Mon, 8:22am", amount: "- $13.75" },
  { type: "deposit", label: "Deposit", time: "Sat, 11:00am", amount: "$16.00" },
  { type: "withdrawal", label: "Withdrawal", time: "Thu, 7:45pm", amount: "- $7.00" },
];

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
                <button type="button" className={styles.settingsButton} aria-label="Open settings">
                  <Settings2 size={16} strokeWidth={2.2} />
                </button>
              </div>

              <div className={`${styles.panel} ${styles.savingsCard}`}>
                <div className={styles.panelHeader}>
                  <div>
                    <p className={styles.eyebrow}>Total savings</p>
                    <p className={styles.displayAmount}>$194.70</p>
                  </div>
                  <div className={styles.sparkleBadge} />
                </div>

                <div className={styles.actionRow}>
                  <button type="button" className={styles.actionButton}>
                    <span className={styles.actionIcon}>
                      <ArrowDown size={18} strokeWidth={2.2} />
                    </span>
                    Deposit
                  </button>
                  <button type="button" className={styles.actionButton}>
                    <span className={styles.actionIcon}>
                      <Send size={18} strokeWidth={2.2} />
                    </span>
                    Transfer
                  </button>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Recent spending</h2>
                <span className={styles.viewAll}>
                  View all <ArrowRight size={12} />
                </span>
              </div>

              <div className={`${styles.panel} ${styles.sectionBody} ${styles.spendingPanel}`}>
                <div className={styles.spendingBars}>
                  {spending.map((item) => (
                    <div
                      key={item.label}
                      className={styles.spendingBar}
                      style={
                        {
                          "--bar-color": item.color,
                          "--weight": item.weight,
                        } as CSSProperties
                      }
                    >
                      <span className={styles.spendingValue}>{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.legend}>
                  {spending.map((item) => (
                    <span key={item.label} className={styles.legendItem}>
                      <span
                        className={styles.legendDot}
                        style={{ "--dot-color": item.color } as CSSProperties}
                      />
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <div className={`${styles.panel} ${styles.trendPanel}`}>
              <div className={styles.trendOrb} />
              <div>
                <p className={styles.trendTitle}>New trend</p>
                <p className={styles.trendText}>
                  You&apos;re spending more on <strong>Travel</strong> this month than you usually
                  do.
                </p>
                <span className={styles.trendLink}>
                  Learn more <ArrowRight size={14} />
                </span>
              </div>
              <button type="button" className={styles.dismissButton} aria-label="Dismiss trend">
                <X size={14} />
              </button>
            </div>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Goals</h2>
                <span className={styles.viewAll}>
                  View all <ArrowRight size={12} />
                </span>
              </div>

              <div className={styles.goalList}>
                {goals.map((goal) => (
                  <article key={goal.name} className={`${styles.panel} ${styles.goalCard}`}>
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
                        <p className={styles.goalTarget}>{goal.target}</p>
                      </div>
                      <div className={styles.progressTrack}>
                        <div
                          className={styles.progressFill}
                          style={
                            {
                              "--progress": goal.progress,
                              "--progress-color": goal.color,
                            } as CSSProperties
                          }
                        />
                      </div>
                      <div className={styles.goalBottom}>
                        <span>{goal.saved}</span>
                        <span>{goal.remaining}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <article className={`${styles.panel} ${styles.articleCard}`}>
              <PiggyArt />
              <h2 className={styles.articleTitle}>How to decide what to save for</h2>
              <p className={styles.articleText}>
                With so much noise, figure out what&apos;s actually worth saving and what you can
                let go of.
              </p>
              <button type="button" className={styles.readMore}>
                Read more
              </button>
            </article>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Recent activity</h2>
                <span className={styles.viewAll}>
                  View all <ArrowRight size={12} />
                </span>
              </div>

              <div className={`${styles.panel} ${styles.activityCard}`}>
                <div className={styles.activityList}>
                  {activities.map((activity) => {
                    const isNegative = activity.type === "withdrawal";

                    return (
                      <div key={`${activity.label}-${activity.time}`} className={styles.activityItem}>
                        <span className={styles.activityIcon} aria-hidden="true">
                          {isNegative ? "↑" : "↓"}
                        </span>
                        <div>
                          <p className={styles.activityName}>{activity.label}</p>
                          <p className={styles.activityTime}>{activity.time}</p>
                        </div>
                        <span
                          className={`${styles.activityAmount} ${
                            isNegative ? styles.activityAmountNegative : ""
                          }`}
                        >
                          {activity.amount}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          <nav className={styles.bottomNav} aria-label="Primary">
            <div className={styles.navRow}>
              <div className={`${styles.navButton} ${styles.navButtonActive}`}>
                <Home size={20} />
              </div>
              <div className={styles.navButton}>
                <PiggyBank size={20} />
              </div>
              <div className={styles.navFab}>
                <Plus size={24} strokeWidth={2.8} />
              </div>
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

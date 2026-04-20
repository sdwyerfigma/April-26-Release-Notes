"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Category = {
  id: string;
  name: string;
  icon: string;
  spent: number;
  budget: number;
  note: string;
  color: string;
  tint: string;
};

export type Goal = {
  id: string;
  presetId: string;
  name: string;
  icon: string;
  saved: number;
  target: number;
  color: string;
  background: string;
};

export type CompletedGoal = {
  id: string;
  presetId: string;
  name: string;
  icon: string;
  accent: string;
  tint: string;
  note: string;
};

export type Activity = {
  id: string;
  type: "deposit" | "withdrawal" | "milestone";
  label: string;
  time: string;
  amountLabel: string;
  negative?: boolean;
};

type GoalPreset = {
  id: string;
  name: string;
  icon: string;
  target: number;
  seedSaved: number;
  color: string;
  background: string;
  accent: string;
  tint: string;
};

type CompletedGoalPreset = {
  id: string;
  name: string;
  icon: string;
  accent: string;
  tint: string;
  note: string;
};

type PrototypeState = {
  totalSavings: number;
  categories: Category[];
  goals: Goal[];
  completedGoals: CompletedGoal[];
  activities: Activity[];
};

type PrototypeContextValue = PrototypeState & {
  addDeposit: (amount: number) => void;
  loadStarterCategories: () => void;
  createGoal: (presetId: string) => void;
  addCompletedGoal: (presetId: string) => void;
  fundGoal: (goalId: string, amount: number) => void;
  completeGoal: (goalId: string) => void;
  resetPrototype: () => void;
};

const starterCategories: Category[] = [
  {
    id: "trips",
    name: "Trips",
    icon: "✈️",
    spent: 212,
    budget: 260,
    note: "8 weekends left",
    color: "#b0fe00",
    tint: "#d4ff72",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "🎮",
    spent: 56,
    budget: 90,
    note: "On pace",
    color: "#56d7ff",
    tint: "#c9f4ff",
  },
  {
    id: "food",
    name: "Food",
    icon: "🍜",
    spent: 29,
    budget: 65,
    note: "Room for two dinners out",
    color: "#ff91f2",
    tint: "#ffc6f8",
  },
  {
    id: "clothes",
    name: "Clothes",
    icon: "👕",
    spent: 16,
    budget: 60,
    note: "Very light spend",
    color: "#aa8bff",
    tint: "#cebeff",
  },
];

export const GOAL_PRESETS: GoalPreset[] = [
  {
    id: "headphones",
    name: "Headphones",
    icon: "🎧",
    target: 280,
    seedSaved: 76.5,
    color: "#c9109b",
    background: "#ffc6f8",
    accent: "#ff91f2",
    tint: "#ffd9f8",
  },
  {
    id: "sneakers",
    name: "Sneakers",
    icon: "👟",
    target: 120,
    seedSaved: 100,
    color: "#7747ff",
    background: "#cebeff",
    accent: "#aa8bff",
    tint: "#e7deff",
  },
  {
    id: "trip",
    name: "Freshman Trip",
    icon: "🧳",
    target: 500,
    seedSaved: 18.2,
    color: "#5aba00",
    background: "#d4ff72",
    accent: "#b0fe00",
    tint: "#ecffb5",
  },
];

export const COMPLETED_GOAL_PRESETS: CompletedGoalPreset[] = [
  {
    id: "skateboard",
    name: "Skateboard",
    icon: "🛹",
    accent: "#ff91f2",
    tint: "#ffc6f8",
    note: "Completed in March",
  },
  {
    id: "camera",
    name: "Camera",
    icon: "📷",
    accent: "#56d7ff",
    tint: "#c9f4ff",
    note: "Completed in February",
  },
  {
    id: "art-books",
    name: "Art Books",
    icon: "📚",
    accent: "#b0fe00",
    tint: "#d4ff72",
    note: "Completed in January",
  },
];

const PrototypeContext = createContext<PrototypeContextValue | null>(null);

function createEmptyState(): PrototypeState {
  return {
    totalSavings: 0,
    categories: [],
    goals: [],
    completedGoals: [],
    activities: [],
  };
}

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function formatActivityTime(date = new Date()) {
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

  return `Today, ${time.toLowerCase()}`;
}

function currentMonthName(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
}

function prependActivity(list: Activity[], activity: Activity) {
  return [activity, ...list].slice(0, 6);
}

export function formatCurrency(amount: number, fractionDigits = 2) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}

export function CheddarPrototypeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PrototypeState>(createEmptyState);

  function addDeposit(amount: number) {
    setState((current) => ({
      ...current,
      totalSavings: current.totalSavings + amount,
      activities: prependActivity(current.activities, {
        id: createId("activity"),
        type: "deposit",
        label: "Deposit",
        time: formatActivityTime(),
        amountLabel: formatCurrency(amount),
      }),
    }));
  }

  function loadStarterCategories() {
    setState((current) => {
      if (current.categories.length > 0) {
        return current;
      }

      return {
        ...current,
        categories: starterCategories,
        activities: prependActivity(current.activities, {
          id: createId("activity"),
          type: "milestone",
          label: "Loaded April spending",
          time: formatActivityTime(),
          amountLabel: formatCurrency(
            starterCategories.reduce((sum, category) => sum + category.spent, 0),
            0,
          ),
        }),
      };
    });
  }

  function createGoal(presetId: string) {
    setState((current) => {
      const preset = GOAL_PRESETS.find((candidate) => candidate.id === presetId);

      if (!preset) {
        return current;
      }

      const alreadyUsed =
        current.goals.some((goal) => goal.presetId === presetId) ||
        current.completedGoals.some((goal) => goal.presetId === presetId);

      if (alreadyUsed) {
        return current;
      }

      return {
        ...current,
        totalSavings: current.totalSavings + preset.seedSaved,
        goals: [
          ...current.goals,
          {
            id: createId("goal"),
            presetId: preset.id,
            name: preset.name,
            icon: preset.icon,
            saved: preset.seedSaved,
            target: preset.target,
            color: preset.color,
            background: preset.background,
          },
        ],
        activities: prependActivity(current.activities, {
          id: createId("activity"),
          type: "milestone",
          label: `Started ${preset.name}`,
          time: formatActivityTime(),
          amountLabel: formatCurrency(preset.seedSaved),
        }),
      };
    });
  }

  function addCompletedGoal(presetId: string) {
    setState((current) => {
      const preset = COMPLETED_GOAL_PRESETS.find((candidate) => candidate.id === presetId);

      if (!preset || current.completedGoals.some((goal) => goal.presetId === presetId)) {
        return current;
      }

      return {
        ...current,
        completedGoals: [
          {
            id: createId("completed"),
            presetId: preset.id,
            name: preset.name,
            icon: preset.icon,
            accent: preset.accent,
            tint: preset.tint,
            note: preset.note,
          },
          ...current.completedGoals,
        ],
        activities: prependActivity(current.activities, {
          id: createId("activity"),
          type: "milestone",
          label: `Loaded ${preset.name}`,
          time: formatActivityTime(),
          amountLabel: "Archived",
        }),
      };
    });
  }

  function fundGoal(goalId: string, amount: number) {
    setState((current) => {
      const activeGoal = current.goals.find((goal) => goal.id === goalId);

      if (!activeGoal) {
        return current;
      }

      return {
        ...current,
        totalSavings: current.totalSavings + amount,
        goals: current.goals.map((goal) =>
          goal.id === goalId
            ? {
                ...goal,
                saved: goal.saved + amount,
              }
            : goal,
        ),
        activities: prependActivity(current.activities, {
          id: createId("activity"),
          type: "deposit",
          label: `Saved for ${activeGoal.name}`,
          time: formatActivityTime(),
          amountLabel: formatCurrency(amount),
        }),
      };
    });
  }

  function completeGoal(goalId: string) {
    setState((current) => {
      const activeGoal = current.goals.find((goal) => goal.id === goalId);

      if (!activeGoal) {
        return current;
      }

      const preset = GOAL_PRESETS.find((candidate) => candidate.id === activeGoal.presetId);

      return {
        ...current,
        goals: current.goals.filter((goal) => goal.id !== goalId),
        completedGoals: [
          {
            id: createId("completed"),
            presetId: activeGoal.presetId,
            name: activeGoal.name,
            icon: activeGoal.icon,
            accent: preset?.accent ?? activeGoal.color,
            tint: preset?.tint ?? activeGoal.background,
            note: `Completed in ${currentMonthName()}`,
          },
          ...current.completedGoals,
        ],
        activities: prependActivity(current.activities, {
          id: createId("activity"),
          type: "milestone",
          label: `Completed ${activeGoal.name}`,
          time: formatActivityTime(),
          amountLabel: "Done",
        }),
      };
    });
  }

  function resetPrototype() {
    setState(createEmptyState);
  }

  return (
    <PrototypeContext.Provider
      value={{
        ...state,
        addDeposit,
        loadStarterCategories,
        createGoal,
        addCompletedGoal,
        fundGoal,
        completeGoal,
        resetPrototype,
      }}
    >
      {children}
    </PrototypeContext.Provider>
  );
}

export function useCheddarPrototype() {
  const context = useContext(PrototypeContext);

  if (!context) {
    throw new Error("useCheddarPrototype must be used inside CheddarPrototypeProvider.");
  }

  return context;
}

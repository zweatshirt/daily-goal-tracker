import { useState, useEffect, useCallback } from "react";
import { getStorageData, setStorageData } from "../storage/chromeStorage";
import { Goal, GoalNote, storageKey } from "../types/goal";

interface UseGoalsReturn {
  goals: Goal[];
  loading: boolean;
  addGoal: (goalName: string) => Promise<void>;
  deleteGoal: (goalId: string) => Promise<void>;
  toggleGoal: (goalId: string) => Promise<void>;
  addNote: (goalId: string, content: string) => Promise<void>;
  deleteNote: (goalId: string, noteId: string) => Promise<void>;
  copyFromPreviousDay: () => Promise<void>;
  previousDayHasGoals: boolean;
}

export function useGoals(
  dateKey: string,
  previousDateKey: string,
): UseGoalsReturn {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [previousDayHasGoals, setPreviousDayHasGoals] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    async function load() {
      const stored = await getStorageData<Goal[]>(storageKey(dateKey));
      const prevStored = await getStorageData<Goal[]>(
        storageKey(previousDateKey),
      );

      if (!cancelled) {
        setGoals(stored ?? []);
        setPreviousDayHasGoals((prevStored ?? []).length > 0);
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [dateKey, previousDateKey]);

  const persist = useCallback(
    async (updatedGoals: Goal[]) => {
      await setStorageData(storageKey(dateKey), updatedGoals);
      setGoals(updatedGoals);
    },
    [dateKey],
  );

  const addGoal = useCallback(
    async (goalName: string) => {
      const newGoal: Goal = {
        id: crypto.randomUUID(),
        goalName,
        goalCompleted: false,
        goalNotes: [],
      };
      await persist([...goals, newGoal]);
    },
    [goals, persist],
  );

  const deleteGoal = useCallback(
    async (goalId: string) => {
      await persist(goals.filter((g) => g.id !== goalId));
    },
    [goals, persist],
  );

  const toggleGoal = useCallback(
    async (goalId: string) => {
      await persist(
        goals.map((g) =>
          g.id === goalId ? { ...g, goalCompleted: !g.goalCompleted } : g,
        ),
      );
    },
    [goals, persist],
  );

  const addNote = useCallback(
    async (goalId: string, content: string) => {
      const newNote: GoalNote = {
        id: crypto.randomUUID(),
        content,
        createdAt: new Date().toISOString(),
      };
      await persist(
        goals.map((g) =>
          g.id === goalId
            ? { ...g, goalNotes: [...g.goalNotes, newNote] }
            : g,
        ),
      );
    },
    [goals, persist],
  );

  const deleteNote = useCallback(
    async (goalId: string, noteId: string) => {
      await persist(
        goals.map((g) =>
          g.id === goalId
            ? { ...g, goalNotes: g.goalNotes.filter((n) => n.id !== noteId) }
            : g,
        ),
      );
    },
    [goals, persist],
  );

  const copyFromPreviousDay = useCallback(async () => {
    const prevGoals = await getStorageData<Goal[]>(
      storageKey(previousDateKey),
    );
    if (!prevGoals || prevGoals.length === 0) return;

    const copiedGoals: Goal[] = prevGoals.map((g) => ({
      id: crypto.randomUUID(),
      goalName: g.goalName,
      goalCompleted: false,
      goalNotes: [],
    }));

    await persist([...goals, ...copiedGoals]);
  }, [goals, previousDateKey, persist]);

  return {
    goals,
    loading,
    addGoal,
    deleteGoal,
    toggleGoal,
    addNote,
    deleteNote,
    copyFromPreviousDay,
    previousDayHasGoals,
  };
}

export interface GoalNote {
  id: string;
  content: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  goalName: string;
  goalCompleted: boolean;
  goalNotes: GoalNote[];
}

export function storageKey(dateKey: string): string {
  return `goals_${dateKey}`;
}

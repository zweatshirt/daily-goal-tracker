import { Progress } from "antd";
import type { Goal } from "../types/goal";

export const GoalProgress: React.FC<{ goals: Goal[] }> = ({ goals }) => {
  const completedGoals = goals.filter((goal) => goal.goalCompleted === true);
  const percent =
    goals.length === 0
      ? 0
      : Math.trunc((completedGoals.length / goals.length) * 100);

  return <Progress percent={percent} />;
};

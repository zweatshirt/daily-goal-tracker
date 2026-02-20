import { Progress } from "antd";
import { GoalInterface } from "./GoalList";

export const GoalProgress: React.FC<{ goals: GoalInterface[] }> = ({
  goals,
}) => {
  const completedGoals = goals.filter((goal) => goal.goalCompleted === true);
  const percent =
    goals.length === 0
      ? 0
      : Math.trunc((completedGoals.length / goals.length) * 100);

  return <Progress percent={percent} />;
};

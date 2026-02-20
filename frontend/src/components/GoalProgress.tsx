import { Progress } from "antd";
import { GoalInterface } from "./GoalList";

export const GoalProgress: React.FC<{ goals: GoalInterface[] }> = ({
  goals,
}) => {
  const completedGoals = goals.filter((goal) => goal.goalCompleted === true);

  let percent = 0;
  if (goals.length === 0) {
  }
  return goals.length === 0 ? (
    <Progress percent={0} />
  ) : (
    <Progress percent={(completedGoals.length / goals.length) * 100} />
  );
};

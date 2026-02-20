import { Switch, Typography } from "antd";
import type { SwitchProps } from "antd";

import { GoalInterface } from "./GoalList";

const stylesFn: SwitchProps["styles"] = (info) => {
  if (info.props.size === "default") {
    return {
      root: {
        backgroundColor: "#BDE3C3",
      },
    } satisfies SwitchProps["styles"];
  }
  return {};
};

export const GoalItem: React.FC<{
  goal: GoalInterface;
  updateGoals: (targetGoal: GoalInterface) => void;
}> = ({ goal, updateGoals }) => {
  return (
    <>
      {goal.goalCompleted ? (
        <Typography.Text delete>{goal.goalName}</Typography.Text>
      ) : (
        <Typography.Text mark>{goal.goalName}</Typography.Text>
      )}
      <Switch
        size="default"
        styles={stylesFn}
        onClick={() => updateGoals(goal)}
      />
    </>
  );
};

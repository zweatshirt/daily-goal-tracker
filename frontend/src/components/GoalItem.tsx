import { Button, Flex, Switch, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
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
  deleteGoal: (targetGoal: GoalInterface) => void;
}> = ({ goal, updateGoals, deleteGoal }) => {
  return (
    <Flex justify="space-between" align="center" style={{ width: "100%" }}>
      {goal.goalCompleted ? (
        <Typography.Text delete>{goal.goalName}</Typography.Text>
      ) : (
        <Typography.Text mark>{goal.goalName}</Typography.Text>
      )}
      <Flex align="center" gap={4}>
        <Switch
          size="default"
          checked={goal.goalCompleted}
          styles={stylesFn}
          onClick={() => updateGoals(goal)}
        />
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => deleteGoal(goal)}
        />
      </Flex>
    </Flex>
  );
};

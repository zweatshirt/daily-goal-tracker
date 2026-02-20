import { Button, Input, List, Space } from "antd";
import { useState } from "react";
import { GoalItem } from "./GoalItem";
import { GoalProgress } from "./GoalProgress";
import type { Dayjs } from "dayjs";

export interface GoalInterface {
  goalName: String;
  goalDate: Date;
  goalCompleted?: boolean;
}

interface GoalListProps {
  selectedDate: Dayjs;
}

export const GoalList: React.FC<GoalListProps> = ({ selectedDate }) => {
  const [goalsByDate, setGoalsByDate] = useState<
    Record<string, GoalInterface[]>
  >({});
  const [currentValue, setCurrentValue] = useState("");

  const dateKey = selectedDate.format("YYYY-MM-DD");
  const previousDateKey = selectedDate.subtract(1, "day").format("YYYY-MM-DD");
  const goals = goalsByDate[dateKey] ?? [];
  const previousDayGoals = goalsByDate[previousDateKey] ?? [];

  const copyFromPreviousDay = () => {
    if (previousDayGoals.length === 0) return;
    setGoalsByDate((prev) => ({
      ...prev,
      [dateKey]: [
        ...(prev[dateKey] ?? []),
        ...previousDayGoals.map((goal) => ({
          ...goal,
          goalDate: selectedDate.toDate(),
          goalCompleted: false,
        })),
      ],
    }));
  };

  const updateGoals = (targetGoal: GoalInterface) => {
    setGoalsByDate((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] ?? []).map((goal) =>
        goal.goalName === targetGoal.goalName
          ? { ...goal, goalCompleted: !goal.goalCompleted }
          : goal,
      ),
    }));
  };

  const addNewGoal = () => {
    if (currentValue.trim() === "") {
      return;
    }
    setGoalsByDate((prev) => ({
      ...prev,
      [dateKey]: [
        ...(prev[dateKey] ?? []),
        {
          goalName: currentValue,
          goalDate: selectedDate.toDate(),
        },
      ],
    }));
    setCurrentValue("");
  };

  return (
    <>
      <Space.Compact style={{ width: "100%" }}>
        <Input
          value={currentValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCurrentValue(e.target.value)
          }
          placeholder="Enter your new goal..."
        />
        <Button type="primary" onClick={addNewGoal}>
          Add Goal
        </Button>
      </Space.Compact>
      <Button
        onClick={copyFromPreviousDay}
        disabled={previousDayGoals.length === 0}
        style={{ marginTop: 8 }}
      >
        Copy goals from previous day
      </Button>
      <List
        header={<div>Goals for {selectedDate.format("MMMM D, YYYY")}</div>}
        bordered
        dataSource={goals}
        renderItem={(item: GoalInterface) => (
          <List.Item>
            <GoalItem goal={item} updateGoals={updateGoals} />
          </List.Item>
        )}
      />
      <GoalProgress goals={goals} />
    </>
  );
};

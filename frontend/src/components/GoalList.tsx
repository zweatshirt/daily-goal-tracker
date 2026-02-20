import { Button, Input, List, Space } from "antd";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GoalItem } from "./GoalItem";
import { GoalProgress } from "./GoalProgress";
import {
  GET_GOAL_LIST,
  CREATE_GOAL,
  TOGGLE_GOAL,
  DELETE_GOAL,
  COPY_GOALS_FROM_PREVIOUS_DAY,
} from "../graphql/goals";
import type { Dayjs } from "dayjs";

export interface GoalInterface {
  id: string;
  goalName: string;
  goalDate: Date;
  goalCompleted?: boolean;
}

interface GoalListProps {
  selectedDate: Dayjs;
}

export const GoalList: React.FC<GoalListProps> = ({ selectedDate }) => {
  const [currentValue, setCurrentValue] = useState("");
  const dateKey = selectedDate.format("YYYY-MM-DD");
  const previousDateKey = selectedDate.subtract(1, "day").format("YYYY-MM-DD");

  const { data, loading } = useQuery(GET_GOAL_LIST, {
    variables: { date: dateKey },
  });

  const { data: previousData } = useQuery(GET_GOAL_LIST, {
    variables: { date: previousDateKey },
  });

  const [createGoal] = useMutation(CREATE_GOAL, {
    refetchQueries: [{ query: GET_GOAL_LIST, variables: { date: dateKey } }],
  });

  const [toggleGoal] = useMutation(TOGGLE_GOAL, {
    refetchQueries: [{ query: GET_GOAL_LIST, variables: { date: dateKey } }],
  });

  const [deleteGoalMutation] = useMutation(DELETE_GOAL, {
    refetchQueries: [{ query: GET_GOAL_LIST, variables: { date: dateKey } }],
  });

  const [copyGoals] = useMutation(COPY_GOALS_FROM_PREVIOUS_DAY, {
    refetchQueries: [{ query: GET_GOAL_LIST, variables: { date: dateKey } }],
  });

  const goals: GoalInterface[] = data?.goalList?.goals ?? [];
  const previousDayGoals: GoalInterface[] = previousData?.goalList?.goals ?? [];

  const copyFromPreviousDay = () => {
    if (previousDayGoals.length === 0) return;
    copyGoals({ variables: { date: dateKey } });
  };

  const updateGoals = (targetGoal: GoalInterface) => {
    toggleGoal({ variables: { id: targetGoal.id } });
  };

  const handleDeleteGoal = (targetGoal: GoalInterface) => {
    deleteGoalMutation({ variables: { id: targetGoal.id } });
  };

  const addNewGoal = async () => {
    if (currentValue.trim() === "") {
      return;
    }
    await createGoal({
      variables: { goalName: currentValue, date: dateKey },
    });
    setCurrentValue("");
  };

  return (
    <>
      <Space.Compact style={{ width: "100%", marginBottom: 8 }}>
        <Input
          value={currentValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCurrentValue(e.target.value)
          }
          onPressEnter={addNewGoal}
          disabled={loading}
          placeholder="Enter your new goal..."
        />
        <Button type="primary" onClick={addNewGoal}>
          Add Goal
        </Button>
      </Space.Compact>
      <List
        header={<div>Goals for {selectedDate.format("MMMM D, YYYY")}</div>}
        bordered
        loading={loading}
        dataSource={goals}
        renderItem={(item: GoalInterface) => (
          <List.Item>
            <GoalItem
              goal={item}
              updateGoals={updateGoals}
              deleteGoal={handleDeleteGoal}
            />
          </List.Item>
        )}
      />
      <GoalProgress goals={goals} />
      <Button
        onClick={copyFromPreviousDay}
        disabled={previousDayGoals.length === 0}
        style={{ marginTop: 8 }}
      >
        Copy goals from previous day
      </Button>
    </>
  );
};

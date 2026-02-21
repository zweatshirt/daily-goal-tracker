import { Button, Input, List, Space } from "antd";
import { useState } from "react";
import { GoalItem } from "./GoalItem";
import { GoalProgress } from "./GoalProgress";
import { useGoals } from "../hooks/useGoals";
import type { Goal } from "../types/goal";
import type { Dayjs } from "dayjs";

interface GoalListProps {
  selectedDate: Dayjs;
}

export const GoalList: React.FC<GoalListProps> = ({ selectedDate }) => {
  const [currentValue, setCurrentValue] = useState("");
  const dateKey = selectedDate.format("YYYY-MM-DD");
  const previousDateKey = selectedDate.subtract(1, "day").format("YYYY-MM-DD");

  const {
    goals,
    loading,
    addGoal,
    deleteGoal,
    toggleGoal,
    addNote,
    deleteNote,
    copyFromPreviousDay,
    previousDayHasGoals,
  } = useGoals(dateKey, previousDateKey);

  const addNewGoal = async () => {
    if (currentValue.trim() === "") return;
    await addGoal(currentValue);
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
        <Button
          disabled={loading || !currentValue}
          type="primary"
          onClick={addNewGoal}
        >
          Add Goal
        </Button>
      </Space.Compact>
      <List
        header={<div>Goals for {selectedDate.format("MMMM D, YYYY")}</div>}
        bordered
        loading={loading}
        dataSource={goals}
        renderItem={(item: Goal) => (
          <List.Item>
            <GoalItem
              goal={item}
              onToggle={() => toggleGoal(item.id)}
              onDelete={() => deleteGoal(item.id)}
              onAddNote={(content: string) => addNote(item.id, content)}
              onDeleteNote={(noteId: string) => deleteNote(item.id, noteId)}
            />
          </List.Item>
        )}
      />
      <GoalProgress goals={goals} />
      <Button
        onClick={copyFromPreviousDay}
        disabled={!previousDayHasGoals}
        style={{ marginTop: 8 }}
      >
        Copy goals from previous day
      </Button>
    </>
  );
};

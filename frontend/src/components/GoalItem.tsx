import { Button, Flex, List, Switch, Typography, Input } from "antd";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import type { SwitchProps } from "antd";
import { Modal, Space } from "antd";
import { useState } from "react";
import type { Goal, GoalNote } from "../types/goal";

const stylesFn: SwitchProps["styles"] = (info) => {
  if (info.props.size === "default") {
    return {
      root: {
        backgroundColor: info.props.checked ? "#5cb85c" : "#BDE3C3",
      },
    } satisfies SwitchProps["styles"];
  }
  return {};
};

interface GoalItemProps {
  goal: Goal;
  onToggle: () => void;
  onDelete: () => void;
  onAddNote: (content: string) => Promise<void>;
  onDeleteNote: (noteId: string) => Promise<void>;
}

export const GoalItem: React.FC<GoalItemProps> = ({
  goal,
  onToggle,
  onDelete,
  onAddNote,
  onDeleteNote,
}) => {
  const [open, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState("");

  const handleAddNote = async () => {
    if (!currentValue.trim()) return;
    await onAddNote(currentValue);
    setCurrentValue("");
  };

  return (
    <Flex justify="space-between" align="center" style={{ width: "100%" }}>
      {goal.goalCompleted ? (
        <Typography.Text delete>{goal.goalName}</Typography.Text>
      ) : (
        <Typography.Text>{goal.goalName}</Typography.Text>
      )}
      <Flex align="center" gap={4}>
        <Switch
          size="default"
          checked={goal.goalCompleted}
          styles={stylesFn}
          onClick={onToggle}
        />
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={onDelete}
        />
        <Button
          type="text"
          icon={<InfoCircleOutlined />}
          onClick={() => setOpen(true)}
        />
      </Flex>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title={goal.goalName}
        footer={null}
      >
        <Flex vertical gap={16}>
          {goal.goalNotes.length > 0 && (
            <List
              size="small"
              dataSource={goal.goalNotes}
              renderItem={(note: GoalNote) => (
                <List.Item
                  actions={[
                    <Button
                      type="text"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => onDeleteNote(note.id)}
                    />,
                  ]}
                >
                  {note.content}
                </List.Item>
              )}
            />
          )}
          <Space.Compact style={{ width: "100%" }}>
            <Input
              value={currentValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentValue(e.target.value)
              }
              onPressEnter={handleAddNote}
              placeholder="Add a note..."
            />
            <Button type="primary" onClick={handleAddNote}>
              Add
            </Button>
          </Space.Compact>
        </Flex>
      </Modal>
    </Flex>
  );
};

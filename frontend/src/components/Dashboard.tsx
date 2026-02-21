import { Flex, Calendar, Typography } from "antd";
import type { CalendarProps } from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";
import { GoalList } from "./GoalList";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

const useStyles = createStyles(({ token }) => ({
  root: {
    padding: 10,
    backgroundColor: token.colorPrimaryBg,
  },
}));

const calendarStyles: CalendarProps<Dayjs>["styles"] = {
  root: {
    borderRadius: 8,
    width: "100%",
  },
};

export const Dashboard: React.FC = () => {
  const { styles: classNames } = useStyles();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const onDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
  };

  return (
    <Flex vertical gap="middle" style={{ width: "100%" }}>
      <Typography.Title level={2}>
        {selectedDate.format("MMMM D, YYYY")} Goals
      </Typography.Title>
      <Flex vertical gap="middle">
        <Calendar
          fullscreen={false}
          classNames={classNames}
          styles={calendarStyles}
          value={selectedDate}
          onSelect={onDateSelect}
        />
        <GoalList selectedDate={selectedDate} />
      </Flex>
    </Flex>
  );
};

import React, { useState } from "react";
import moment, { Moment } from "moment";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  CalendarDataCount,
  CalendarDate,
  CalendarDateHeader,
  CalendarDay,
  Label,
  Task,
  TaskColor,
  TaskList,
} from "../styles";
import { CellData, Holidays } from "./Calendar";
import CellActionButtons from "./CellActionButtons";

const CalendarCell = ({
  selectedDate,
  day,
  handleOpenPopup,
  countryHolidays,
  handleEditTask,
}: {
  selectedDate: Moment;
  day: any;
  handleOpenPopup: Function;
  countryHolidays: Holidays[];
  handleEditTask: Function;
}) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredData = day.data.filter((item: CellData) =>
    item.label.some((task: string) => task.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <CalendarDay isCurrentMonth={moment(day.date).isSame(selectedDate, "month")}>
      <CalendarDateHeader>
        <CalendarDate>
          <div>{moment(day.date).format("D")}</div>
          <CalendarDataCount>
            {day.data.length ? `${day.data.length} ${day.data.length > 1 ? "cards" : "card"}` : ""}
          </CalendarDataCount>
        </CalendarDate>
        <CellActionButtons
          handleSearch={handleSearch}
          searchText={searchText}
          handleOpenPopup={handleOpenPopup}
          day={day}
        />
      </CalendarDateHeader>
      {countryHolidays
        .filter((holiday: Holidays) => holiday.date === day.date)
        .map((item: Holidays) => (
          <Task $disabled>{item.name}</Task>
        ))}
      <Droppable droppableId={day.date} key={day.date}>
        {(provided, snapshot) => (
          <TaskList
            key={day.date}
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={snapshot.isDraggingOver ? "droppable" : ""}
          >
            {filteredData.map((item: CellData, index: number) => (
              <Draggable key={index} draggableId={`${day.date}-${index}`} index={index}>
                {(provided) => (
                  <Task
                    onClick={() => handleEditTask(item.id, day.date)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <TaskColor color={item.color}></TaskColor>
                    {item.label.map((task: string) => (
                      <Label>{task}</Label>
                    ))}
                  </Task>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </CalendarDay>
  );
};

export default CalendarCell;

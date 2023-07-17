import { Moment } from "moment";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { CalendarBody } from "../styles";
import { DaysData, Holidays } from "./Calendar";
import CalendarCell from "./CalendarCell";

export const CalendarMainBody = ({
  daysData,
  setDaysData,
  setSelectedDay,
  setShowPopUp,
  setEditingTask,
  selectedDate,
  countryHolidays,
}: {
  daysData: DaysData[];
  setDaysData: Function;
  setSelectedDay: Function;
  setShowPopUp: Function;
  setEditingTask: Function;
  selectedDate: Moment;
  countryHolidays: Holidays[] | [];
}) => {
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    const sourceDate = source.droppableId;
    const destinationDate = destination.droppableId;

    const newData = [...daysData];
    const sourceData = newData.find((day: DaysData) => day.date === sourceDate);
    const destinationData = newData.find((day: DaysData) => day.date === destinationDate);
    if (!sourceData) return;
    if (sourceDate === destinationDate) {
      const [removedTask] = sourceData.data.splice(source.index, 1);
      sourceData.data.splice(destination.index, 0, removedTask);
    } else {
      const [removedTask] = sourceData.data.splice(source.index, 1);
      destinationData?.data.splice(destination.index, 0, removedTask);
    }
    setDaysData(newData);
  };

  const handleOpenPopup = (date: string[]) => {
    setSelectedDay(date);
    setShowPopUp(true);
  };

  const handleEditTask = (id: string, date: string) => {
    setSelectedDay(date);
    setEditingTask(id);
    setShowPopUp(true);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <CalendarBody>
        {daysData.map((day: any) => (
          <CalendarCell
            selectedDate={selectedDate}
            day={day}
            handleOpenPopup={handleOpenPopup}
            handleEditTask={handleEditTask}
            countryHolidays={countryHolidays}
          />
        ))}
      </CalendarBody>
    </DragDropContext>
  );
};
export default CalendarMainBody;

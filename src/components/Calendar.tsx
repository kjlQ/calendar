import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import Select from "react-select";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { getCountries, getCountriesHolidays } from "../api/country.api";
import {
  AddLabel,
  Button,
  CalendarBody,
  CalendarContainer,
  CalendarDataCount,
  CalendarDate,
  CalendarDateHeader,
  CalendarDay,
  CalendarHeader,
  CloseButton,
  ColorPicker,
  Input,
  PopUp,
  PopUpContent,
  Task,
  TaskColor,
  TaskList,
} from "../styles";
const { v4: uuidv4 } = require("uuid");

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [daysData, setDaysData] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>({ value: "UA", label: "Ukraine" });
  const [countries, setCountries] = useState<any>([]);
  const [countryHolidays, setCountryHolidays] = useState<any>([]);
  const [selectedDay, setSelectedDay] = useState<any>("");
  const [editingTask, setEditingTask] = useState<any>("");
  const [showPopUp, setShowPopUp] = useState(false);

  const controlledTextInputRef = useRef<any>("");
  const controlledColorInputRef = useRef<any>("");

  const handleOpenPopup = (date: string) => {
    setSelectedDay(date);
    setShowPopUp(true);
  };

  const handleEditTask = (id: string, date: string) => {
    setSelectedDay(date);
    setEditingTask(id);
    setShowPopUp(true);
  };

  const handleGenerateCalendar = () => {
    const monthStart = selectedDate.clone().startOf("month");
    const monthEnd = selectedDate.clone().endOf("month");
    const startDate = monthStart.clone().startOf("week");
    const endDate = monthEnd.clone().endOf("week");
    const calendar = [];

    let currentDate = startDate.clone();
    while (currentDate.isSameOrBefore(endDate, "day")) {
      calendar.push(<div key={currentDate.format("YYYY-MM-DD")}>{currentDate.format("D")}</div>);
      currentDate.add(1, "day");
    }
    return calendar;
  };

  const handleGetCountriesHolidays = async () => {
    const date = new Date();
    const { data } = await getCountriesHolidays(date.getFullYear(), selectedCountry.value);
    return data;
  };

  useEffect(() => {
    const generatedCalendar = handleGenerateCalendar();
    const generatedDays = generatedCalendar.map((item) => {
      return { date: item.key, data: [] };
    });
    setDaysData(generatedDays);
  }, []);

  useEffect(() => {
    (async () => {
      const holidays = await handleGetCountriesHolidays();
      setCountryHolidays(holidays);
    })();
  }, [selectedCountry]);

  const handleAdd = () => {
    if (!controlledTextInputRef.current.value) return;
    let newData;
    if (!editingTask) {
      newData = daysData.map((obj: any) => {
        if (obj.date === selectedDay) {
          return {
            ...obj,
            data: [
              ...obj.data,
              {
                id: uuidv4(),
                label: controlledTextInputRef.current.value,
                color: controlledColorInputRef.current.value,
              },
            ],
          };
        }
        return obj;
      });
    } else {
      newData = daysData.map((obj: any) => {
        if (obj.date === selectedDay) {
          obj.data = obj.data.map((item: any) => {
            if (item.id === editingTask) {
              return {
                id: item.id,
                label: controlledTextInputRef.current.value,
                color: controlledColorInputRef.current.value,
              };
            }
            return item;
          });
        }
        return obj;
      });
    }
    setEditingTask("");
    setDaysData(newData);
    setShowPopUp(false);
  };

  const handleDragEnd = (result: any) => {
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
    const sourceData = newData.find((day: any) => day.date === sourceDate);
    const destinationData = newData.find((day: any) => day.date === destinationDate);

    if (sourceDate === destinationDate) {
      const [removedTask] = sourceData.data.splice(source.index, 1);
      sourceData.data.splice(destination.index, 0, removedTask);
    } else {
      const [removedTask] = sourceData.data.splice(source.index, 1);
      destinationData.data.splice(destination.index, 0, removedTask);
    }
    setDaysData(newData);
  };

  const handleGetCountries = async () => {
    const { data } = await getCountries();
    const modifiedData = data.map((item: any) => ({
      value: item.countryCode,
      label: item.name,
    }));
    setCountries(modifiedData);
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <h2>{selectedDate.format("MMMM YYYY")}</h2>
        <Select
          classNamePrefix="select"
          defaultValue={selectedCountry}
          name="color"
          options={countries}
          onMenuOpen={() => handleGetCountries()}
          onChange={(country) => setSelectedCountry(country)}
        />
      </CalendarHeader>
      {daysData && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <CalendarBody>
            {daysData.map((day: any) => (
              <CalendarDay isCurrentMonth={moment(day.date).isSame(selectedDate, "month")}>
                <CalendarDateHeader>
                  <CalendarDate>
                    <div>{moment(day.date).format("D")}</div>
                    <CalendarDataCount>
                      {day.data.length ? `${day.data.length} ${day.data.length > 1 ? "cards" : "card"}` : ""}
                    </CalendarDataCount>
                  </CalendarDate>
                  <AddLabel onClick={() => handleOpenPopup(day.date)}>+</AddLabel>
                </CalendarDateHeader>
                {countryHolidays
                  .filter((holiday: any) => holiday.date === day.date)
                  .map((item: any) => (
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
                      {day.data.map((item: any, index: number) => (
                        <Draggable key={index} draggableId={`${day.date}-${index}`} index={index}>
                          {(provided) => (
                            <Task
                              onClick={() => handleEditTask(item.id, day.date)}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <TaskColor color={item.color}></TaskColor>
                              {item.label}
                            </Task>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </TaskList>
                  )}
                </Droppable>
              </CalendarDay>
            ))}
          </CalendarBody>
        </DragDropContext>
      )}
      {showPopUp && (
        <PopUp>
          <PopUpContent>
            <Input ref={controlledTextInputRef} type="text" autoFocus placeholder="Label.." />
            <ColorPicker>
              Selected color:
              <Input ref={controlledColorInputRef} type="color" />
            </ColorPicker>
            <Button $primary onClick={handleAdd}>
              {editingTask ? "Edit" : "Add"}
            </Button>
            <CloseButton
              onClick={() => {
                setShowPopUp(false);
                setEditingTask("");
              }}
            >
              &#x2715;
            </CloseButton>
          </PopUpContent>
        </PopUp>
      )}
    </CalendarContainer>
  );
};

export default Calendar;

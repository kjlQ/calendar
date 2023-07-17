import moment from "moment";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { getCountriesHolidays } from "../api/country.api";
import { CalendarContainer } from "../styles";
import CalendarMainBody from "./CalendarMainBody";
import CalendarMainHeader from "./CalendarMainHeader";
import PopupComponent from "./Popup";

export type DaysData = { date: React.Key | null; data: string[] | [] };
export type CellData = { color: string; id: string; label: string[] };
export type CountryValue = { value: string; label: string };
export type Holidays = {
  date: string;
  name: string;
};

const Calendar = () => {
  const selectedDate = moment();

  const [daysData, setDaysData] = useState<DaysData[] | []>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryValue>({ value: "US", label: "United States" });
  const [countryHolidays, setCountryHolidays] = useState<Holidays[] | []>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [editingTask, setEditingTask] = useState<string>("");
  const [controlledInputs, setControlledInputs] = useState<string[]>([""]);
  const [showPopUp, setShowPopUp] = useState(false);

  const controlledColorInputRef = useRef() as MutableRefObject<HTMLInputElement>;

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

  return (
    <>
      <CalendarContainer id="calendar-container">
        <CalendarMainHeader
          selectedDate={selectedDate}
          setDaysData={setDaysData}
          daysData={daysData}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <CalendarMainBody
          daysData={daysData}
          setDaysData={setDaysData}
          setSelectedDay={setSelectedDay}
          setShowPopUp={setShowPopUp}
          setEditingTask={setEditingTask}
          selectedDate={selectedDate}
          countryHolidays={countryHolidays}
        />
        <PopupComponent
          setControlledInputs={setControlledInputs}
          controlledInputs={controlledInputs}
          controlledColorInputRef={controlledColorInputRef}
          setShowPopUp={setShowPopUp}
          setEditingTask={setEditingTask}
          editingTask={editingTask}
          daysData={daysData}
          showPopUp={showPopUp}
          selectedDay={selectedDay}
          setDaysData={setDaysData}
        />
      </CalendarContainer>
    </>
  );
};

export default Calendar;

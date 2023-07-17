import html2canvas from "html2canvas";
import React, { useMemo, useState } from "react";
import Select from "react-select";
import { Moment } from "moment";
import { getCountries } from "../api/country.api";
import { Button, CalendarHeader, ThemedSelect } from "../styles";
import { CountryValue, DaysData } from "./Calendar";

export const CalendarMainHeader = ({
  selectedDate,
  setDaysData,
  daysData,
  setSelectedCountry,
  selectedCountry,
}: {
  setSelectedCountry: Function;
  selectedCountry: CountryValue;
  daysData: DaysData[];
  selectedDate: Moment;
  setDaysData: Function;
}) => {
  const [countries, setCountries] = useState<any>([]);

  const savePageAsImage = () => {
    const calendarContainer = document.getElementById("calendar-container");
    if (calendarContainer) {
      html2canvas(calendarContainer).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "calendar.png";
        link.click();
      });
    }
  };

  const handleGetCountries = async () => {
    const { data } = await getCountries();
    const modifiedData = data.map((item: { countryCode: string; name: string }) => ({
      value: item.countryCode,
      label: item.name,
    }));
    setCountries(modifiedData);
  };

  const memorizedCountries = useMemo(() => handleGetCountries(), []);

  const exportCalendar = () => {
    const jsonData = JSON.stringify(daysData);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "calendar.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importCalendar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const jsonData = event.target.result;
        const parsedData = JSON.parse(jsonData);
        setDaysData(parsedData);
      };
      reader.readAsText(file);
    }
  };
  return (
    <CalendarHeader>
      <h2>{selectedDate.format("MMMM YYYY")}</h2>
      <Button onClick={savePageAsImage}>Save as Image</Button>
      <Button onClick={exportCalendar}>Export</Button>
      <Button as="label" htmlFor="importFile">
        Import
        <input id="importFile" type="file" accept=".json" hidden onChange={importCalendar} />
      </Button>
      <ThemedSelect>
        <Select
          classNamePrefix="select"
          defaultValue={selectedCountry}
          name="color"
          options={countries}
          onMenuOpen={() => memorizedCountries}
          onChange={(country) => setSelectedCountry(country)}
        />
      </ThemedSelect>
    </CalendarHeader>
  );
};
export default CalendarMainHeader;

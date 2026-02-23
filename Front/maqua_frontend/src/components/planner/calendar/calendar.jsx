import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { es } from "date-fns/locale";
import "./calendar.scss";

const Calendar = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <StaticDatePicker
        orientation="portrait"
        openTo="day"
        value={value}
        onChange={(newValue) => onChange && onChange(newValue)}
      />
    </LocalizationProvider>
  );
};

export { Calendar };

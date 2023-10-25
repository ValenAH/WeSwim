import React, { useState } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import './calendar.scss';

const Calendar = () => {
    const [value, setValue] = useState(new Date());

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker 
                orientation="portrait"
                openTo="day"
                value={value}
                onChange={(newValue)=>{setValue(newValue);}}               
                />
        </LocalizationProvider>
    )
}

export {Calendar};
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import es from "date-fns/locale/es";

registerLocale("es", es);
setDefaultLocale("es");

// const CustomInput1 = ({ value, onClick }) => (
//   <div className="btn btn-outline-secondary date-picker-button" onClick={onClick}>
//     <FontAwesomeIcon icon={faCalendarDay} />
//     <span style={{ paddingLeft: '5px' }}>{value}</span>
//   </div >
// );

const CustomInput = forwardRef(function ({ value, onClick }, ref) {
  return (
    <div className="btn btn-outline-secondary date-picker-button" onClick={onClick} ref={ref}>
      <FontAwesomeIcon icon={faCalendarDay} />
      <span style={{ paddingLeft: '5px' }}>{value}</span>
    </div >

  )
})

const DatePickerCustom = ({ onDateChange, selected }) => {
  const [localSelectedDate, setLocalSelectedDate] = useState(selected || null);

  const handleChange = (date) => {
    setLocalSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div>
      <DatePicker
        selected={localSelectedDate}
        onChange={handleChange}
        locale="es"
        dateFormat="P"
        placeholderText="Seleccionar una fecha"
        customInput={<CustomInput value={localSelectedDate} />}
      />
    </div>
  );
};

export default DatePickerCustom;


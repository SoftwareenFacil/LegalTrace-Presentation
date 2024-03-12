
import { useState } from 'react';

import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import es from "date-fns/locale/es";

// Internal imports
import { useData } from '../Pages/Entity/EntityPage.jsx';
import { filterByDate } from '../../Utils/filters.js'; 

// Styles imports
import "../../Style/TableStyle.css";

registerLocale("es", es);
setDefaultLocale("es");

const CustomInput = ({ value, onClick }) => (
  <button className="btn btn-outline-secondary date-picker-button" onClick={onClick}>
    <FontAwesomeIcon icon={faCalendarDay} />
    {value}
  </button>
);


const DatePickerFilter = ({ getEntity, setData, setEmpty, setError, setLoading
  }) => {

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = async (date) => {
    setSelectedDate(date);
    await filterByDate(date, getEntity, setData, setLoading, setError, setEmpty);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      locale="es"
      dateFormat="P" 
      placeholderText="Select a date"
      customInput={<CustomInput />}
    />
  );
};

export default DatePickerFilter;

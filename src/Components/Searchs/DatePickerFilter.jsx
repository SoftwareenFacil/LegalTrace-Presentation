import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import es from "date-fns/locale/es";
import "../../Style/TableStyle.css";

registerLocale("es", es);
setDefaultLocale("es");

const CustomInput = ({ value, onClick }) => (
  <button className="btn btn-outline-secondary date-picker-button" onClick={onClick}>
    <FontAwesomeIcon icon={faCalendarDay} />
    {value}
  </button>
);


const DatePickerFilter = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      locale="es"
      dateFormat="P" 
      customInput={<CustomInput />}
    />
  );
};

export default DatePickerFilter;

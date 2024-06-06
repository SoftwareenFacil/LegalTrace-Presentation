// DateIcon.jsx

// External imports
import { capitalize as makeCapital } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

// Style imports
import '../../Style/Icons/DateIcon.scss';

const DateIcon = ({ date, finished, category, className,id}) => {
  const day = date.toLocaleDateString('es-ES', { day: 'numeric' });
  const weekday = date.toLocaleDateString('es-ES', { weekday: 'short' });

  const iconClassName = finished? `date-icon ${category} active` : 
                          `date-icon
                           ${category} inactive`;

  return (
    <div id={id} className={`${iconClassName} ${className} `}>
        <div className="day">{day}</div>
        <div className="weekday">{makeCapital(weekday)}</div>
    </div>
  );
};

export default DateIcon;

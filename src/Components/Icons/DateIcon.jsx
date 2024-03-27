// DateIcon.jsx

// External imports
import { capitalize as makeCapital } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

// Style imports
import '../../Style/DateIcon.css';

const DateIcon = ({ date, vigency, category, className }) => {
  const day = date.toLocaleDateString('es-ES', { day: 'numeric' });
  const weekday = date.toLocaleDateString('es-ES', { weekday: 'short' });

  const iconClassName = vigency? `date-icon date-icon-${category}--active` : 
                          `date-icon date-icon-${category}--inactive`;

  return (
    <div className={`${iconClassName} ${className}`}>
        <div className="day">{day}</div>
        <div className="weekday">{makeCapital(weekday)}</div>
    </div>
  );
};

export default DateIcon;

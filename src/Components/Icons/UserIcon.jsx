// UserIcon.jsx

// External imports

// Internal imports
import { ReactComponent as Icon } from '../../Assets/Icons/User.svg';

// Styles imports
import "../../Style/Icons.css";

const UserIcon = ({ active }) => {
  const iconClassName = active ? "UserIconTable--active"
    : "UserIconTable--inactive";

  return <Icon className={iconClassName}/>;
};

export default UserIcon;


// UserIcon.jsx

// External imports

// Internal imports
import Icon from "../../Assets/Icons/UserIcon.svg?react";

// Styles imports
import "../../Style/Icons.scss";

const UserIcon = ({ active }) => {
  const iconClassName = active
    ? "UserIconTable--active"
    : "UserIconTable--inactive";

  return <Icon className={iconClassName} />;
};

export default UserIcon;

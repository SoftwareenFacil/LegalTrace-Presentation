import "../../Style/TableStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserIcon = ({ active }) => {
  const iconClassName = active ? "fa-solid fa-user mt-2 UserIconTable--active"
    : "fa-solid fa-user mt-2 UserIconTable--inactive";

  return <i className={iconClassName}></i>;
};

export default UserIcon;


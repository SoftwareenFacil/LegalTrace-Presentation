import "../../Style/TableStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

const ClientIcon = ({ active }) => {
  const iconClassName = active? "icon-spacing briefcase-icon--active" : 
    "icon-spacing briefcase-icon--inactive";
  return <FontAwesomeIcon 
          icon={faBriefcase}
          className={iconClassName}
          style={{fontSize: '3em'}}
          />;

};

export default ClientIcon;

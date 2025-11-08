import "../../Style/Icons.scss";
import Icon from "../../Assets/Icons/Credentials.svg?react";

const CredentialIcon = ({ active }) => {
  const iconClassName = active ? "color--active" : "color--inactive";
  return <Icon className={iconClassName} />;
};

export default CredentialIcon;

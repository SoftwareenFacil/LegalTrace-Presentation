import "../../Style/Icons.css";
import { ReactComponent as Icon } from '../../Assets/Icons/Credentials.svg';

const CredentialIcon = ({ active }) => {
  const iconClassName = active? "color--active" : 
    "color--inactive";
  return <Icon className={iconClassName} />;

};

export default CredentialIcon;

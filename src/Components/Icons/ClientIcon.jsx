import { ReactComponent as Icon } from '../../Assets/Icons/Client.svg';

import '../../Style/Icons.css';

const ClientIcon = ({ active }) => {
  const iconClassName = active? "color--active" : 
    "color--inactive";
  return <Icon className={iconClassName} />;

};

export default ClientIcon;

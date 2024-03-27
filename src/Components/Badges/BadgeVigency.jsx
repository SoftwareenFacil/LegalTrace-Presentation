
// External imports
import { Badge } from 'react-bootstrap';

// Icons
import { ReactComponent as Cross } from '../../Assets/Icons/Cross.svg';
import { ReactComponent as Check } from '../../Assets/Icons/Check.svg';

import '../../Style/Badges/BadgeVigency.scss';

const BadgeVigency = ({entity, category, className}) => {
  console.log(entity);
  const value = { 'histories' : entity.vigency, 'tasks' : entity.finished};
  const badgeState = (value) => {
    return value? 'badge-active' : 'badge-inactive';
  };

  const text = { 'histories' : 'Activo', 'tasks' : 'Terminado'};

  return (
    <div className="badge-vigency">
      <Badge className={`${badgeState(value[category])} ${className}`}>
          {category === 'histories'?
            (entity.vigency ? 
            <Check className="icon-badge"/> 
            :
            <Cross className="icon-badge"/> 
            )
            :
            null
          }
          {value[category] ? text[category] : 'No' + ' ' + text[category]}
      </Badge>
    </div>
  );
};

export default BadgeVigency;

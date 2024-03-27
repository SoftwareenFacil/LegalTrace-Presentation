import React, { useEffect, useState } from "react";

import { FaMoneyBill as Money } from "react-icons/fa";

import { ReactComponent as Plus} from '../../Assets/Icons/Plus.svg';
import { ReactComponent as Client} from '../../Assets/Icons/Client.svg';
import { ReactComponent as Credentials } from '../../Assets/Icons/Credentials.svg';
import { ReactComponent as Users } from '../../Assets/Icons/Users.svg';
import { ReactComponent as Histories } from '../../Assets/Icons/Histories.svg';
import { ReactComponent as Tasks } from '../../Assets/Icons/Tasks.svg';

// Styles imports
import '../../Style/CrearButton.scss';

function CrearButton ({onFormSubmit, category, CustomModal}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const setTitle  = (category) => {
    const gender = (category === 'tasks' || 
      category === 'credentials') ? 'a' : 'o';
    const mode = { 'tasks': 'Tarea', 'user':'Usuario', 
      'client':'Cliente', 'credentials':'Credencial', 'payments':'Pago'};
    if (category !== 'histories') {
      return 'nuev' + gender + ' '+ mode[category];
    }
    else if (category == 'histories'){
      return 'en Bitacora'
    }
  }

  const icons = {
  'client': Client,
  'credentials': Credentials,
  'user': Users,
  'histories': Histories,
  'tasks': Tasks,
  'payments': Money,
  };

  const iconClass = {
    'left': 'entity-icon-left',
    'right': 'entity-icon-right',
  };

  const IconComponent = icons[category];

  const selectColor = { 'credentials': 'credentials-color',
                        'user': 'user-color',
  };

  return (
      <div className="CrearButton" style={{padding: 0}}>
        <div className="d-grid">
          <button
            onClick={handleShow}
            className={`CrearEntity ${selectColor[category]}`}
            style={{margin: 0}}
          >
            <IconComponent className={`crear-icon ${iconClass['left']}`} />
            <div className="CrearButton-content">
              <div className="CrearButton-text-box"> 
                <div className="CrearButton-text-lines">
                  {(category !== 'histories')? 'Crear' : 'Crear Nota'}
                </div>
                <div className="CrearButton-text-lines">
                 {setTitle(category)}
                </div>
              </div>
              <Plus/>
            </div>
            <IconComponent className={`crear-icon ${iconClass['right']}`} />
          </button>

          <CustomModal op={'create'} category={category} show={show}
            onClose={handleClose} onFormSubmit={onFormSubmit}/>
        </div>
      </div>
  );
}

export default CrearButton;

// DisableButton.jsx

// External imports
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import _ from 'lodash';

// Internal imports
import userService from '../../Service/userService';
import clientService from '../../Service/clientService';
import credentialsService from '../../Service/credentialsService';
import userTasksService from '../../Service/userTasksService';
import { SwalDisable } from '../Modals/SwalDisable.js';
import { ReactComponent as Cross } from '../../Assets/Icons/Cross.svg';
import { ReactComponent as Check } from '../../Assets/Icons/Check.svg';
import { show_alerta } from "../../Service/shared-state";

// Styles imports
import '../../Style/Buttons/DetailsButtons.scss';
import '../../Style/Icons.scss';

function DisableDetailButton ({entity, onSubmit, category, usage, className}) {

  const [buttonUsage, setButtonUsage] = useState('');
  const [buttonClass, setButtonClass] = useState('');

  const disableEntitySwal = SwalDisable(entity, category, onSubmit);
  const name = entity?.clientName || entity?.name || entity?.title;

  const vigency = (entity.vigency? 'btn-disable' : 'btn-enable');

  const setTitle = (category) => {
    const mode = { 'tasks': 'Tarea', 'user':'Usuario', 'client':'Cliente', 
                    'credentials': 'Credencial'};
    const pre = entity.vigency? 'Deshabilitar':'Habilitar';

    return pre + ' ' + mode[category];
  }

  return (
    <div>
      <Button
        size="sm"
        className={`${className} ${vigency[entity.vigency]}`}
        onClick={disableEntitySwal}
      >
        {entity.vigency ? (
          <div className="btn-content"> 
            <Cross className="icon-details"/> 
            <div className="btn-text btn-disable">{setTitle(category)}</div>
          </div>
        ) : (
          <div className="btn-content">
            <Check className="icon-details"/> 
            <div className="btn-text ">{setTitle(category)}</div>
          </div>
        )}
      </Button>
    </div>
  );
};

export default DisableDetailButton;



// DisableButton.jsx

// External imports
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import _ from 'lodash';

// Internal imports
import userTasksService from '../../Service/userTasksService';
import { ReactComponent as Cross } from '../../Assets/Icons/Cross.svg';
import { ReactComponent as Check } from '../../Assets/Icons/Check.svg';
import { show_alerta } from "../../Service/shared-state";

// Styles imports
import '../../Style/Buttons/FinishButton.scss';

function FinishButton ({entity, onSubmit, className}) {

  const [message, setMessage] = useState('');
  const [buttonClass, setButtonClass] = useState('');
  const [buttonUsage, setButtonUsage] = useState('');

  const name = entity.title;

  useEffect(() => {
    const switchMode = (vigency) => {
     setMessage(vigency? 'deshabilita':'habilita');
     setButtonClass(vigency? 'danger':'success');
     setButtonUsage(vigency? 'disable':'enable');

    }
    switchMode(entity.vigency);
  }, [])

  const getStyle = (vigency) => {

    return (entity.vigency? 'finish-task-button' : 'unfinish-task-button');
  };

  return (
    <>
      <Button
        variant="outline-primary"
        size="sm"
        className={`${getStyle(entity.vigency)} ${className}`}
      >
        {entity.vigency ? (
          <div className="finish-button">
            <Cross className="icon-finish"/> 
            <div className="text-finish">Terminar Tarea</div>
          </div>
        ) : (
          <div className="finish-button">
            <Check className="icon-finish"/> 
            <div className="text-finish">No terminado</div>
          </div>
        )}
      </Button>
    </>
  );
};

export default FinishButton;



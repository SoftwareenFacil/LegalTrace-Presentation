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
import '../../Style/Buttons/DetailsButtons.scss';

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

  const getStyle = (value) => {

    return (value? 'finish-disable-color' : 'finish-enable-color');
  };

  return (
    <>
      <Button
        className={`${getStyle(entity.finished)} ${className}`}
      >
        {entity.finished? (
          <div className="btn-content">
            <Cross className="icon-details"/> 
            <div className="btn-text text-task">Deshacer Terminar Tarea</div>
          </div>
        ) : (
          <div className="btn-content">
            <Check className="icon-details"/> 
            <div className="btn-text text-task">Terminar Tarea</div>
          </div>
        )}
      </Button>
    </>
  );
};

export default FinishButton;



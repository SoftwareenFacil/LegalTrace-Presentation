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
import '../../Style/MultiButton.scss';
import '../../Style/Icons.scss';

function FinishButton ({entity, onSubmit}) {

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

  const getStyle = () => {
    return 'finish-task-button';
  };

  return (
    <>
      <Button
        variant={buttonClass}
        size="sm"
        className={getStyle()}
      >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
     }}>
        {entity.vigency ? (
          <>
            <Cross className="icon-button"/> 
            <div>Terminar</div>
          </>
        ) : (
          <>
            <Check className="icon-button"/> 
            <div>No terminado</div>
          </>
        )}
      </div>
      </Button>
    </>
  );
};

export default FinishButton;



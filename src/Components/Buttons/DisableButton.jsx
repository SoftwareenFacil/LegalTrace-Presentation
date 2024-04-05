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
import '../../Style/Buttons/MultiButton.scss';
import '../../Style/Icons.scss';

function DisableButton ({entity, onSubmit, category, usage, className}) {

  const [buttonUsage, setButtonUsage] = useState('');
  const [buttonClass, setButtonClass] = useState('');

  const disableEntitySwal = SwalDisable(entity, category, onSubmit);
  const name = entity?.clientName || entity?.name || entity?.title;

  useEffect(() => {
    const switchMode = (vigency) => {
      setButtonUsage(vigency? 'disable':'enable');
      setButtonClass(vigency ? 'danger' : 'success');
    }
    switchMode(entity.vigency);
  }, [])


  const getStyle = (usage) => {
    const style = (usage === 'details')? 'details' : 'table';
    return 'w-100 ' + style + '-'+ buttonUsage +'-button';
  };

  return (
    <>
      <Button
        variant={buttonClass}
        size="sm"
        className={`${getStyle(usage)} ${className}`}
        onClick={disableEntitySwal}
      >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
     }}>
        {entity.vigency ? (
          <>
            <Cross className="icon-button"/> 
            <div>Deshabilitar</div>
          </>
        ) : (
          <>
            <Check className="icon-button"/> 
            <div>Habilitar</div>
          </>
        )}
      </div>
      </Button>
    </>
  );
};

export default DisableButton;



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
import { ReactComponent as Cross } from '../../Assets/Icons/Cross.svg';
import { ReactComponent as Check } from '../../Assets/Icons/Check.svg';
import { show_alerta } from "../../Service/shared-state";

// Styles imports
import '../../Style/MultiButton.css';

function DisableButton ({entity, onSubmit, category, usage}) {

  const [message, setMessage] = useState('');
  const [buttonClass, setButtonClass] = useState('');
  const [buttonUsage, setButtonUsage] = useState('');

  const mode = {'user':'Usuario', 'client':'Cliente', 
                  'credentials': 'Credencial'};
  const gender = (category === 'credentials')? 'a' : 'e';

  const name = (category === 'credentials')? entity.clientName : entity.name; 

  useEffect(() => {
    const switchMode = (vigency) => {
     setMessage(vigency? 'deshabilita':'habilita');
     setButtonClass(vigency? 'danger':'success');
     setButtonUsage(vigency? 'disable':'enable');

    }
    switchMode(entity.vigency);
  }, [])

  const DisableEntity = () => {
  const DisableSwal = withReactContent(Swal);
  DisableSwal.fire({
    title: `¿Desea ${message}tar`+ "est"+ gender +` ${mode[category]}?`,
    html: `<p style="color: blue;">${name}</p>`,
    icon: "error",
    showCancelButton: true,
    confirmButtonText: _.capitalize(message) + 'r',
    cancelButtonText: "Cancelar",
    customClass: {
      confirmButton: `btn ${'btn-'+buttonClass} me-2`,
      cancelButton: "btn btn-secondary",
    },
    buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            if (category === 'user'){
              await userService.toggleVigency(entity.id);
            }
            else if (category === 'client'){
              await clientService.toggleVigency(entity.id);
            }
            else if (category === 'credentials'){
              await credentialsService.toggleVigency(entity.id);
            }
            onSubmit();
        } catch (error) {
            show_alerta("Error al eliminar");
        }
      } else {
        show_alerta(`El usuario no fue ${message}do`);
      }
    });
  };

  const getStyle = (usage) => {
    const style = (usage === 'details')? 'details' : 'table';
    return 'w-100 ' + style + '-'+ buttonUsage +'-button';
  };

  return (
    <div> 
      <Button
        variant={buttonClass}
        size="sm"
        className={getStyle(usage)}
        onClick={DisableEntity}
      >
      {entity.vigency? 
          <div>
            <Cross />
            <div>Deshabilitar</div>
          </div>
        :
          <div>
            <Check />
            <div>Habilitar</div>
          </div>
      }
      </Button>
    </div>
  );
};

export default DisableButton;



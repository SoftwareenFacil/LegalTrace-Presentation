// useDisableEntitySwal.js

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import _ from 'lodash';
import { useState, useEffect } from "react";

import userService from '../../Service/userService';
import clientService from '../../Service/clientService';
import credentialsService from '../../Service/credentialsService';
import userTasksService from '../../Service/userTasksService';
import { show_alerta } from "../../Service/shared-state";

export const SwalDisable = (entity, category, onSubmit) => {
  const [message, setMessage] = useState('');
  const [buttonClass, setButtonClass] = useState('');
  
  const mode = {
    'user': 'Usuario',
    'client': 'Cliente',
    'credentials': 'Credencial',
    'tasks': 'Tarea'
  };
  const gender = category === 'credentials' || category === 'tasks' ? 'a' : 'e';

  useEffect(() => {
    const switchMode = (vigency) => {
      setMessage(vigency ? 'deshabilita' : 'habilita');
      setButtonClass(vigency ? 'danger' : 'success');
    };
    if (entity) {
      switchMode(entity.vigency);
    }
  }, [entity]);

  const name = entity?.clientName || entity?.name || entity?.title;

  const DisableEntitySwal = async () => {
    const DisableSwal = withReactContent(Swal);
    const result = await DisableSwal.fire({
      title: `¿Desea ${message}r ` + "est" + gender + ` ${mode[category]}?`,
      html: `<p style="color: blue;">${name}</p>`,
      icon: entity.vigency? "error" : "success",
      showCancelButton: true,
      confirmButtonText: _.capitalize(message) + 'r',
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: `btn btn-${buttonClass} me-2`,
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      try {
        switch (category) {
          case 'user':
            await userService.toggleVigency(entity.id);
            break;
          case 'client':
            await clientService.toggleVigency(entity.id);
            break;
          case 'credentials':
            await credentialsService.toggleVigency(entity.id);
            break;
          case 'tasks':
            await userTasksService.toggleVigency(entity.id);
            break;
          default:
            throw new Error('Invalid category');
        }
        show_alerta(`El/La ${mode[category]} ha sido ${entity.vigency? 
            'deshabilitado/a' : 'habilitado/a'}`);
        onSubmit();
      } catch (error) {
        show_alerta("Error al cambiar la vigencia");
      }
    } else {
      show_alerta(`La operación fue cancelada`);
    }
  };

  return DisableEntitySwal;
};


// DisableButton.jsx

// External imports
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

// Internal imports
import userService from '../../Service/userService';
import clientService from '../../Service/clientService';
import { show_alerta } from "../../Service/shared-state";

function DisableButton ({entity, onSubmit, category}) {

  const mode = {'user':'Usuario', 'client':'Cliente'};

  const DisableEntity = () => {
  const DisableSwal = withReactContent(Swal);
  DisableSwal.fire({
    title: `¿Desea deshabilitar este ${mode[category]}?`,
    html: `<p style="color: blue;">${entity.name}</p>`,
    icon: "error",
    showCancelButton: true,
    confirmButtonText: "Deshabilitar",
    cancelButtonText: "Cancelar",
    customClass: {
      confirmButton: "btn btn-danger me-2",
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
            onSubmit();
        } catch (error) {
            show_alerta("Error al eliminar el cliente");
        }
      } else {
        show_alerta("El usuario no fue deshabilitado");
      }
    });
  };
  return (
    <div> 
      <Button
        variant="danger"
        size="sm"
        className="w-100 custom-disable-button"
        onClick={DisableEntity}
      >
        Deshabilitar
      </Button>
    </div>
  );
};

export default DisableButton;



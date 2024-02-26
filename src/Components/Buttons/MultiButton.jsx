// MultiButton.jsx

// External imports
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { faEye } from "@fortawesome/free-solid-svg-icons";

// Internal imports

// Styles imports

function MultiButton ({onFormSubmit, category, CustomModal}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setTitle = (category) => {
    const mode = { 'tasks': 'Tarea', 'user':'Usuario', 'client':'Cliente'};
    return 'Editar ' + mode[category];
  }
  return (
    <div className="edit-button mt-0">
      <div className="btn-container d-grid ">
        <Button
          variant="primary"
          size="sm"
          className="w-100 ver-button"
          onClick={() => redirectToUserDetails(user)}
        >
          <FontAwesomeIcon
            icon={faEye}
            className="icon-spacing"
          />{" "}
          Ver
        </Button>
      </div>
    </div>
  );
};

export default MultiButton;

// EditButton.jsx

// External imports
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function EditButton ({data, onFormSubmit, category, CustomModal}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setTitle = (category) => {
    const mode = { 'tasks': 'Tarea', 'user':'Usuario', 'client':'Cliente'};
    return 'Editar ' + mode[category];
  }

  return (
    <div> 
      <Button
        variant="outline-primary"
        size="sm"
        className="custom-edit-button"
        onClick={handleShow}
      >
        Editar
      </Button>
      <CustomModal data={data} op={'edit'} mode={category} show={show} 
        onClose={handleClose} onFormSubmit={onFormSubmit}/>
    </div>
  );
};

export default EditButton;



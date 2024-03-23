// EditButton.jsx

// External imports
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

// Styles imports
import '../../Style/MultiButton.scss';

function EditButton ({data, onFormSubmit, category, CustomModal, usage, 
  className}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setTitle = (category) => {
    const mode = { 'tasks': 'Tarea', 'user':'Usuario', 'client':'Cliente', 
                    'credentials': 'Credencial'};
    return 'Editar ' + mode[category];
  }

  const getStyle = (usage) => {
    const style = (usage === 'details')?
      'details-edit-button'
      : "table-edit-button"; 
    return style;
  };
  return (
    <div> 
      <Button
        variant="outline-primary"
        size="sm"
        className={`${getStyle(usage)} ${className}`}
        onClick={handleShow}
      >
        Editar
      </Button>
      <CustomModal data={data} op={'edit'} category={category} show={show} 
        onClose={handleClose} onFormSubmit={onFormSubmit}/>
    </div>
  );
};

export default EditButton;



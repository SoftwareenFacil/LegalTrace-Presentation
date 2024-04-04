// EditButton.jsx

// External imports
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

// Intenal imports
import { ReactComponent as Editar } from '../../Assets/Icons/Editar.svg';
// Styles imports
import '../../Style/MultiButton.scss';
import '../../Style/Cards/DetailsCard.scss';

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

  return (
    <div> 
      <Button
        variant="outline-primary"
        size="sm"
        className={`${className}`}
        onClick={handleShow}
      >
      {usage === 'details'?
        <div style={{display: 'flex'}}>
          <Editar className="icon-edit"/> 
          <div className="btn-inside-text">{setTitle(category)}</div>
        </div>
        :
        <div>Editar</div>
      }
      </Button>
      <CustomModal data={data} op={'edit'} category={category} show={show} 
        onClose={handleClose} onFormSubmit={onFormSubmit}/>
    </div>
  );
};

export default EditButton;



// EditButton.jsx

// External imports
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

// Intenal imports
import { ReactComponent as Editar } from '../../Assets/Icons/Editar.svg';

// Styles imports
import '../../Style/Buttons/DetailsButtons.scss';

function EditButton ({data, onFormSubmit, category, CustomModal, usage, 
  className}) {

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  useEffect(() => {
    // const mode = { 'tasks': 'Tarea', 'user': 'Usuario', 'client': 'Cliente', 'credentials': 'Credencial' };
    // setTitle('Editar ' + mode[category]);
    setTitle('Editar ' );
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  return (
    <>
      <Button
        variant="outline-primary"
        size="sm"
        className={`${className}`}
        onClick={handleShow}
      >
      {usage === 'details'?
        <div className="btn-content">
          <Editar className="icon-details"/> 
          <div className="btn-text">{title}</div>
        </div>
        :
        (
          <div className="btn-content">
            <Editar className="icon-details"/> 
            <div className="btn-text">Editar</div>
          </div>
         
        )

      }
      </Button>
      <CustomModal data={data} op={'edit'} category={category} show={show} 
        onClose={handleClose} onFormSubmit={onFormSubmit}/>
    </>
  );
};

export default EditButton;



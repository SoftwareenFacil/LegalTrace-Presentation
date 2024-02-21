import React, { useEffect, useState } from "react";

function CrearButton ({onFormSubmit, category, CustomModal}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setTitle  = (category) => {
    const gender = (category === 'tasks') ? 'a' : 'o';
    const mode = { 'tasks': 'tarea', 'user':'usuario', 'client':'cliente'};
    return 'Crear ' + 'nuev' + gender + ' '+ mode[category];
  }

  return (
      <div>
        <div className="d-grid">
          <button
            onClick={handleShow}
            className="btn CrearCliente"
          >
            {" "}
            {setTitle(category)}
            <i className="fa-solid fa-circle-plus"></i>
          </button>

          <CustomModal op={'create'} mode={category} show={show}
            onClose={handleClose} onFormSubmit={onFormSubmit}/>
        </div>
      </div>
  );
}

export default CrearButton;

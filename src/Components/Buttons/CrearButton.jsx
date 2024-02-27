import React, { useEffect, useState } from "react";
import '../../Style/CrearButton.css';

function CrearButton ({onFormSubmit, category, CustomModal}) {

  const [show, setShow] = useState(false);
  const [color, setColor] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const setTitle  = (category) => {
    const gender = (category === 'tasks' || 
      category === 'credentials') ? 'a' : 'o';
    const mode = { 'tasks': 'tarea', 'user':'Usuario', 
      'client':'Cliente', 'credentials':'Credencial'};
    return 'nuev' + gender + ' '+ mode[category];
  }

  return (
      <div>
        <div className="d-grid">
          <button
            onClick={handleShow}
            className='btn CrearCliente'
          >

            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{textAlign: 'right'}}>
                Crear 
              </div>
              <div style={{textAlign: 'right'}}>
               {setTitle(category)}
              </div>
            </div>
            <i className="fa-solid fa-circle-plus"></i>
          </button>

          <CustomModal op={'create'} category={category} show={show}
            onClose={handleClose} onFormSubmit={onFormSubmit}/>
        </div>
      </div>
  );
}

export default CrearButton;

import React, { useEffect, useState } from "react";
import '../../Style/CrearButton.css';

import { ReactComponent as Plus} from 
'../../Assets/Icons/Plus.svg';

function CrearButton ({onFormSubmit, category, CustomModal}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const setTitle  = (category) => {
    const gender = (category === 'tasks' || 
      category === 'credentials') ? 'a' : 'o';
    const mode = { 'tasks': 'Tarea', 'user':'Usuario', 
      'client':'Cliente', 'credentials':'Credencial'};
    if (category !== 'histories') {
      return 'nuev' + gender + ' '+ mode[category];
    }
    else if (category == 'histories'){
      return 'en Bitacora'
    }
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
                {(category !== 'histories')? 'Crear' : 'Crear Nota'}
              </div>
              <div style={{textAlign: 'right'}}>
               {setTitle(category)}
              </div>
            </div>
            <Plus/>
          </button>

          <CustomModal op={'create'} category={category} show={show}
            onClose={handleClose} onFormSubmit={onFormSubmit}/>
        </div>
      </div>
  );
}

export default CrearButton;

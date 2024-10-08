// TasksModal.jsx

// External imports
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { parseISO } from 'date-fns';

// Internal imports
import clientHistories from '../../Service/clientHistoryService.js';
import { handleCopy } from '../../Utils/copy.js';
import { Mensajes } from '../../Constants/Constant.jsx';
// Icons
import { ReactComponent as Editar } from '../../Assets/Icons/Editar.svg';
import { ReactComponent as Copiar } from '../../Assets/Icons/Copiar.svg';
import { ReactComponent as Cross } from '../../Assets/Icons/Cross.svg';
import { ReactComponent as Check } from '../../Assets/Icons/Check.svg';


// Styles imports
import '../../Style/Modals/ViewHistories.scss';

function ViewHistories({ data, show, onFormSubmit, CustomModal, onClose, refresh}) {

  const [showEdit, setEditShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const submitData = async (params) => {
    onFormSubmit();
  };


  const handleEditClose = () => setEditShow(false);
  const handleEditShow= () => setEditShow(true);

  const handleDisable = async () => {
    onClose();
    await clientHistories.toggleVigency(data.id);
    refresh();
  };
  
  return (
    <>
      <Modal className="view-history"
        show={show} onHide={onClose} size="lg">
        <Modal.Header className="view-header">
            <Modal.Title className="view-header-box"> 
              <div className="view-header-nota">Nota</div>
              <div> 
                <div className="view-header-title">{data.title}</div>
                <small className="view-header-client">en "{data.clientName}"</small>
              </div>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="view-body">
          <div className="view-buttons">
            <div className="d-flex justify-content-end div-desactivar">
                {data.vigency? 
                  <Button className="view-desactivar-button"
                    variant="primary" onClick={handleDisable}>
                  <Cross className="icon-desactivar"/> 
                  Desactivar
                  </Button>
                  :
                  <Button className="view-activar-button"
                    variant="primary" onClick={handleDisable}>
                  <Check className="icon-desactivar"/> 
                  Activar
                  </Button>
                }
            </div>
          </div>
          <div className="view-text-box"
            contentEditable="false"
          >
            {data.description}
          </div>

          <div className="view-buttons">
            <div className="mt-3 d-flex justify-content-between">
                <Button className="view-editar-button"
                  onClick={handleEditShow}>
                <Editar className="icon"/> 
                Editar
                </Button>
                <Button className="view-copiar-button"
                  onClick={() => handleCopy(data.description, setCopied)}>
                  <Copiar className="icon"/> 
                  Copiar
                </Button>
            </div>
          </div>
        {copied && (
          <div className="alert alert-success mt-2">
            {Mensajes.Copiado}
          </div>
        )}
        </Modal.Body>
      </Modal>
      <CustomModal  data={data}
                    op={'edit'}
                    show={showEdit}
                    onClose={handleEditClose}
                    onFormSubmit={onFormSubmit}/>
    </>
  );
}

export default ViewHistories;


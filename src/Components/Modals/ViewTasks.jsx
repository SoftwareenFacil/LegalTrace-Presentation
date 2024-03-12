// TasksModal.jsx

// External imports
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { parseISO } from 'date-fns';

// Internal imports
import userTasksService from '../../Service/userTasksService';
import { validateInput } from '../../Utils/validateInput';
import {getClients, getUsers} from '../../Utils/getEntity';
import { formatDate } from "../../Utils/formatDate";

// Styles imports
import '../../Style/DynamicModal.css';

function TasksModal({ data, show, onFormSubmit, onClose }) {

  useEffect(() => {
  }, []);

  const submitData = async (params) => {
    onFormSubmit();
  };

  
  return (
    <>
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header 
            style={{ textAlign: 'center'}}>
            <Modal.Title style={{margin: 'auto'}}>
              Nota
              {
                <div>
                  <div className="text-info">{data.title}</div>
                  <small>en "{data.clientName}"</small>
                </div>
              }
            </Modal.Title>        </Modal.Header>
        <Modal.Body>
          <div 
            className="text-box"
            contentEditable="false"
            style={{ 
              overflow: 'auto',
              height: '200px',
            }}
          >
            {data.description}
          </div>
          <div className="mt-3 d-flex justify-content-end">
              <Button variant="primary" type="submit">
              Crear Tarea
              </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TasksModal;


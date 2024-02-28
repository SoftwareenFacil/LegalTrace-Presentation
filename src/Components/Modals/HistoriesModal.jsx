// TasksModal.jsx

// External imports
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Internal imports
import clientHistoryService from '../../Service/clientHistoryService';
import {getClients, getUsers} from '../../Utils/getEntity';
import { formatDate } from "../../Utils/formatDate";

// Styles imports
import '../../Style/DynamicModal.css';

function HistoriesModal({ op, onFormSubmit, show, onClose }) {

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');

  const [clients, setClients] = useState([]);
 
  useEffect(() => {
    const fetchEntities = async () => {
      const data_clients = await getClients(0);
      setClients(data_clients);
    };
    fetchEntities();
  }, []);

  const submitData = async () => {
    const params = {  
      clientId: clientId, 
      title: title,
      description: description,
    };
    if (op === 'edit')
    {
      params.id = id;
      await clientHistoryService.editItem(params);
    }
    else if (op === 'create')
    {
      await clientHistoryService.addItem(params);
    }
    onFormSubmit();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitData();
    onClose();
  };

  return (
    <>
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header 
            style={{ textAlign: 'center'}}>
            <Modal.Title style={{margin: 'auto'}}>Nueva Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="custom-form-group" >
                <Form.Label style={{margin: 'auto'}}>
                  Relacionada a Cliente:
                </Form.Label>
                <Form.Select className="custom-form-control"
                      value={clientId} 
                      onChange={(e) => setClientId(e.target.value)}>
                    {clients !== null? <option value="">Seleccionar</option>:
                      <option value="">No hay clientes registrados</option>
                    }
                    {clients !== null? (
                      clients.map((option) => (
                      <option key={option.id} value={option.id}>
                      {option.name}
                      </option>
                      ))) : null
                    }
                </Form.Select>

                <Form.Control className="custom-form-control"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titulo Nota"
                />

                <Form.Control className="custom-form-control"
                  as="textarea"
                  rows={10}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describa la nota"
                />
            </Form.Group>
          <div className="ml-auto">
              <Button variant="primary" type="submit">
              Crear Tarea
              </Button>
          </div>
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default HistoriesModal;


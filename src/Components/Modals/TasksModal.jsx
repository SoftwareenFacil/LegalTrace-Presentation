import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Internal imports
import userTasksService from '../../Service/userTasksService';
import {getClients, getUsers} from '../../AuxFunctions/getEntity';
import { formatDate } from "../../AuxFunctions/formatDate";

// Styles imports
import '../../Style/DynamicModal.css';

function TasksModal({ op, onFormSubmit, show, onClose }) {

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [clientId, setClientId] = useState('');
  const [userId, setUserId] = useState('');

  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    const fetchEntities = async () => {
      const data_clients = await getClients();
      setClients(data_clients);

      const data_users = await getUsers();
      setUsers(data_users);

    };
    fetchEntities();
  }, []);

  const submitData = async () => {
    const params = {  
      type: type,
      clientId: clientId, 
      userId: userId,
      title: title,
      description: description,
      finishedDate: "2025-01-15T00:00:00.000Z"
    };
    if (op === 'edit')
    {
      params.id = id;
      await userTasksService.editItem(params);
    }
    else if (op === 'create')
    {
      await userTasksService.addItem(params);
    }
    onFormSubmit();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitData();
    onClose();
  };

  
  const types = [
    { key: 'option1', label: 'Water' },
    { key: 'option2', label: 'Earth' },
    { key: 'option3', label: 'Fire' },
    { key: 'option4', label: 'Air' },
  ];
  
  return (
    <>
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header 
            style={{ textAlign: 'center'}}>
            <Modal.Title style={{margin: 'auto'}}>Definir Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="custom-form-group" >
                <Form.Label style={{margin: 'auto'}}>Tipo de Tarea:</Form.Label>
                <Form.Select className="custom-form-control"
                      value={type} 
                      onChange={(e) => setType(e.target.value)}>
                    <option value="">Seleccionar</option>
                    {types.map((option) => (
                      <option key={option.key} value={option.label}>
                    {option.label}
                    </option>
                    ))}
                </Form.Select>

                <Form.Label style={{margin: 'auto'}}>Cliente:</Form.Label>
                <Form.Select className="custom-form-control"
                      value={clientId} 
                      onChange={(e) => setClientId(e.target.value)}>
                    <option value="">Seleccionar</option>
                    {clients.map((option) => (
                      <option key={option.id} value={option.id}>
                    {option.name}
                    </option>
                    ))}
                </Form.Select>

                <Form.Label style={{margin: 'auto'}}>Designar a:</Form.Label>
                <Form.Select className="custom-form-control"
                      value={userId} 
                      onChange={(e) => setUserId(e.target.value)}>
                    <option value="">Seleccionar</option>
                    {users.map((option) => (
                      <option key={option.id} value={option.id}>
                    {option.name}
                    </option>
                    ))}
                </Form.Select>

                <Form.Control className="custom-form-control"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titulo Tarea"
                />

                <Form.Control className="custom-form-control"
                  as="textarea"
                  rows={10}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe la tarea"
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

export default TasksModal;


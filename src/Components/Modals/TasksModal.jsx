// TasksModal.jsx

// External imports
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { parseISO } from 'date-fns';

// Internal imports
import userTasksService from '../../Service/userTasksService';
import {getClients, getUsers} from '../../Utils/getEntity';
import { formatDate } from "../../Utils/formatDate";

// Styles imports
import '../../Style/DynamicModal.css';

function TasksModal({ op, onFormSubmit, show, onClose }) {

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [clientId, setClientId] = useState('');
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');

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
      dueDate: parseISO(date), 
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
                <Form.Label>Plazo Limite:</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
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


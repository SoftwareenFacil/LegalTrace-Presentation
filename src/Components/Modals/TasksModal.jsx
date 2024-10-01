// External imports
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

// Internal imports
import userTasksService from '../../Service/userTasksService';
import { validateInput } from '../../Utils/validateInput';
import { getClients, getUsers } from '../../Utils/getEntity';

// Styles imports
import '../../Style/DynamicModal.css';
import DatePickerCustom from '../Searchs/DatePickerCustom';

function TasksModal({ data, category, op, onFormSubmit, show, onClose }) {

  useEffect(() => {
    if (!show) {
      resetForm();
      setErrors({});
    }
    if (op === 'edit') {
      setId(data.id);
      setTitle(data.title);
      setDescription(data.description);
      setType(data.type);
      setClientId(data.clientId);
      setUserId(data.userId);
      setSelectedDate(parseISO(data.dueDate));
    }
    const fetchEntities = async () => {
      const data_clients = await getClients({ id: 0 });
      setClients(data_clients);

      const data_users = await getUsers({ id: 0 });
      setUsers(data_users);
    };
    fetchEntities();
  }, [show, op, data]);

  const [errors, setErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [clientId, setClientId] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [repeatable, setRepeatable] = useState('');
  const resetForm = () => {
    setId('');
    setTitle('');
    setDescription('');
    setType('');
    setClientId('');
    setUserId('');
    setSelectedDate(null);
    setRepeatable('0');
  };

  const submitData = async (params) => {
    if (op === 'edit') {
      params.id = id;
      await userTasksService.editItem(params);
    } else if (op === 'create') {
      await userTasksService.addItem(params);
    }
    onFormSubmit();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = {
      type: type,
      clientId: clientId,
      userId: userId,
      title: title,
      description: description,
      dueDate: selectedDate.toISOString(),
      repeatable: repeatable,
    };

    const validationResult = await validateInput(params, category);
    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult);
      setShowErrorAlert(true);

      setTimeout(() => {
        setShowErrorAlert(false);
        setErrors({});
      }, 4000);
    } else {
      await submitData(params);
      resetForm();
      onClose();
      setShowErrorAlert(false);
      setErrors({});
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header className="no-border" style={{ textAlign: 'center' }}>
          <Modal.Title style={{ margin: 'auto' }}>Definir Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div style={{ width: '60%', margin: 'auto' }}>
              <Form.Group className="custom-form-group">
                <Form.Label style={{ margin: 'auto' }}>Tipo de Tarea:</Form.Label>
                <Form.Control
                  className="custom-form-control"
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Tipo de Tarea"
                />
                <Form.Label style={{ margin: 'auto' }}>Cliente:</Form.Label>
                <Form.Select
                  className="custom-form-control"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                >
                  {clients !== null ? (
                    <option value="">Seleccionar</option>
                  ) : (
                    <option value="">No hay clientes registrados</option>
                  )}
                  {clients !== null &&
                    clients.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                </Form.Select>

                <Form.Label style={{ margin: 'auto' }}>Designar a:</Form.Label>
                <Form.Select
                  className="custom-form-control"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  {users.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Label style={{ margin: 'auto' }}>Título:</Form.Label>
                <Form.Control
                  className="custom-form-control"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titulo Tarea"
                />
                <Form.Label style={{ margin: 'auto' }}>Descripción:</Form.Label>
                <Form.Control
                  className="custom-form-control"
                  as="textarea"
                  rows={10}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe la tarea"
                />
                <Form.Label style={{ margin: 'auto' }}>Fecha de Vencimiento:</Form.Label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="form-control custom-form-control"
                  placeholderText="Seleccionar fecha"
                />
              </Form.Group>
              <div className="mt-3 d-flex justify-content-end">
                <Button variant="primary" onClick={handleSubmit}>
                  {op !== 'edit' ? <div>Crear Tarea</div> : <div>Guardar Tarea</div>}
                </Button>
              </div>
              {showErrorAlert && Object.keys(errors).length > 0 && (
                <div className="alert alert-danger mt-2">
                  {Object.keys(errors).map((key) => (
                    <div key={key}>{errors[key]}</div>
                  ))}
                </div>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TasksModal;

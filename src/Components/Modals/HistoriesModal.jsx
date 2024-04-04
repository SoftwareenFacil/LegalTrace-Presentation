// TasksModal.jsx

// External imports
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Internal imports
import clientHistoryService from '../../Service/clientHistoryService';
import { validateInput } from '../../Utils/validateInput';
import {getClients } from '../../Utils/getEntity';

// Styles imports
import '../../Style/DynamicModal.css';
import '../../Style/Modals/HistoriesModal.scss';

function HistoriesModal({ data, category, op, onFormSubmit, show, onClose }) {

  useEffect(() => {

    if (!show) {
      resetForm();
      setErrors({});
    }
    if (op === 'edit') {
      setId(data.id);
      setTitle(data.title);
      setDescription(data.description);
      setClientId(data.clientId);
      const formattedDate = new Date(data.eventDate).toISOString().split('T')[0];
      setDate(formattedDate);
    }
    const fetchEntities = async () => {
      const data_clients = await getClients({id: 0});
      setClients(data_clients);
    };
    fetchEntities();
  }, []);

  const [errors, setErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [date, setDate] = useState('');

  const [clients, setClients] = useState([]);

  const resetForm = () => {
    setId('');
    setTitle('');
    setDescription('');
    setClientId('');
    setDate('');
  };

  const submitData = async (params) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = {  
      clientId: clientId, 
      title: title,
      description: description,
      created: date,
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

  const titleMaker = (op) => {
    const title_pre = (op === 'edit') ? 'Editar ' : 'Nueva ';
    const title_sub = 'Nota'; 
    return title_pre + title_sub;
  };

  return (
    <>
      <Modal show={show} onHide={onClose} dialogClassName="histories-modal"> 
        <Modal.Header className="no-border"
            style={{ textAlign: 'center'}}>
            <Modal.Title style={{margin: 'auto'}}>
              {titleMaker(op)}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
          <div style={{width: '60%', margin: 'auto'}}>
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

                <Form.Label style={{margin: 'auto'}}>
                  Descripcion (opcional):
                </Form.Label>
                <Form.Control className="custom-form-control"
                  as="textarea"
                  rows={10}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describa la nota"
                />

                <Form.Label>Dia evento:</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
               />
            </Form.Group>

          <div className="mt-3 d-flex justify-content-end">
              <Button variant="primary" type="submit">
                {op === 'edit'? 'Guardar': 'Crear Nota'}
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

export default HistoriesModal;


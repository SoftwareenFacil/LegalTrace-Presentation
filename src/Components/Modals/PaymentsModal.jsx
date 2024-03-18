// TasksModal.jsx

// External imports
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { parseISO } from 'date-fns';

// Internal imports
import paymentService from '../../Service/paymentService';
import { validateInput } from '../../Utils/validateInput';
import {getClients } from '../../Utils/getEntity';
import { formatDate, formatCLP } from "../../Utils/formatters";

// Styles imports
import '../../Style/DynamicModal.css';

function PaymentsModal({ data, category, op, onFormSubmit, show, onClose }) {

  useEffect(() => {
    if (!show) {
      resetForm();
      setErrors({});
    }
    if (op === 'edit') {
      setId(data.id);
      setClientId(data.clientId);
      setTitle(data.title);
      setDescription(data.description);
      setDate(data.date);
      setAmount(data.amount);
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
  const [clientId, setClientId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [numericAmount, setNumericAmount] = useState(0);
  const [fileLink, setFileLink] = useState('asdfa');

  const [clients, setClients] = useState([]);

  const resetForm = () => {
    setId('');
    setClientId('');
    setTitle('');
    setDescription('');
    setDate('');
    setAmount('');
    setFileLink('');
  };

  const submitData = async (params) => {
    if (op === 'edit')
    {
      params.id = id;
      await paymentService.editItem(params);
    }
    else if (op === 'create')
    {
      await paymentService.addItem(params);
    }
    onFormSubmit();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = {  
      clientId: clientId, 
      title: title,
      description: description,
      date: date? parseISO(date) : '',
      amount: numericAmount,
      fileLink: fileLink,
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

  const handleAmount = (event) => {
    const inputAmount = event.target.value;
    const numericValue = inputAmount.replace(/\D/g, '');
    setAmount(formatCLP(numericValue));
    setNumericAmount(parseInt(numericValue, 10));
  };

  return (
    <>
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header 
            style={{ textAlign: 'center'}}>
            <Modal.Title style={{margin: 'auto'}}>Crear cobro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
          <div style={{width: '60%', margin: 'auto'}}>
            <Form.Group className="custom-form-group" >
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

                <Form.Control className="custom-form-control"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titulo Cobro"
                />

                <Form.Control className="custom-form-control"
                  as="textarea"
                  rows={10}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe el cobro"
                />

                <Form.Label>Fecha:</Form.Label>
                <Form.Control className="custom-form-control"
                          type="date"
                          name="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                 />

                <Form.Control className="custom-form-control"
                  type="text"
                  value={amount}
                  onChange={handleAmount}
                  placeholder="Enter amount"
                  placeholder="Ingrese monto"
                />

            </Form.Group>


          <div className="mt-3 d-flex justify-content-end">
              <Button variant="primary" type="submit">
              Crear Cobro 
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

export default PaymentsModal;


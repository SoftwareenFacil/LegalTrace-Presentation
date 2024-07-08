import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Internal imports
import credentialsService from '../../Service/credentialsService';
import { getClients } from '../../Utils/getEntity';
import { validateInput } from '../../Utils/validateInput';

// Styles imports
import '../../Style/DynamicModal.css';

function CredentialsModal({ data, category, op, onFormSubmit, show, onClose }) {
  useEffect(() => {
    if (!show) {
      resetForm();
      setErrors({});
    }
    if (op === 'edit' && data) {
      setId(data.id);
      setName(data.title);
      setUser(data.username);
      setPassword(data.keyValue);
      setClientId(data.clientId);
    }
    fetchClients();
  }, [show, op, data]);

  const [errors, setErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [clientId, setClientId] = useState(''); 

  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    const data_clients = await getClients({ id: 0 });
    setClients(data_clients);
  };

  const resetForm = () => {
    setId('');
    setName('');
    setUser('');
    setPassword('');
    setClientId(''); 
  };

  const titleMaker = (op) => {
    const title_pre = (op === 'edit') ? 'Editar ' : 'Nueva ';
    const title_sub = 'Credencial';
    return title_pre + title_sub;
  };

  const submitData = async (params) => {
    try {
      if (op === 'edit') {
        params.id = id;
        await credentialsService.editItem(params);
      } else if (op === 'create') {
        await credentialsService.addItem(params);
      }
      onFormSubmit();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = {
      title: name,
      username: user,
      keyValue: password,
      vigency: true,
      clientId: clientId,
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
          <Modal.Title style={{ margin: 'auto' }}>{titleMaker(op)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div style={{ width: '60%', margin: 'auto' }}>
              <Form.Group className="custom-form-group checkbox-container">
                <Form.Label>{'Datos:'}</Form.Label>
                <div style={{ display: 'flex' }}>
                  <div style={{ flex: 1, marginRight: '10px' }}>
                    <Form.Label>{'Nombre de Credencial'}</Form.Label>
                    <Form.Control
                      className="custom-form-control"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nombre de Credencial"
                    />
                    <Form.Label>{'Usuario'}</Form.Label>
                    <Form.Control
                      className="custom-form-control"
                      type="text"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      placeholder="Usuario"
                    />
                    <Form.Label>{'Cliente:'}</Form.Label>
                    <Form.Select className="custom-form-control"
                      value={clientId} 
                      onChange={(e) => setClientId(Number(e.target.value))}>
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
                    <Form.Label>{'Contraseña'}</Form.Label>
                    <Form.Control
                      className="custom-form-control"
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña"
                    />
                  </div>
                </div>
              </Form.Group>
              <div className="mt-auto d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  {op === 'edit' ? 'Guardar' : 'Crear credencial'}
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

export default CredentialsModal;

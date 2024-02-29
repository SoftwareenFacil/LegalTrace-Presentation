import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Internal imports
import credentialsService from '../../Service/credentialsService';
import {getClients} from '../../Utils/getEntity';
// Styles imports
import '../../Style/DynamicModal.css';

function CredentialsModal({ data, category, op, onFormSubmit, show, onClose }) {

  useEffect(() => {
    if (!show) {
      resetForm();
    }
    if (op === 'edit') {
    }
    else if (op === 'edit') {
      setId(data.id);
      setName(data.title);
      setUser(data.username);
      setPassword(data.keyValue);
      setClientId(data.clientId);
    }
    const fetchEntities = async () => {
      const data_clients = await getClients(0);
      setClients(data_clients);
    };
    fetchEntities();
  }, [])

  const [empty, setEmpty] = useState(false);
  // Edit only
  const [id, setId] = useState('');

  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [vigency, setVigency] = useState(false);
  const [clientId, setClientId] = useState('');

  const [clients, setClients] = useState([]);

  const resetForm = () => {
    setId('');
    setName('');
    setUser('');
    setPassword('');
    setVigency(false);
    setClientId('');
  };

  const titleMaker = (op, category) => {
    const title_pre = (op === 'edit') ? 'Editar ' : 'Nueva ';
    const title_sub = 'Credencial'; 
    return title_pre + title_sub;
  };

  const submitData = async () => {
    const params = {
      clientId: clientId,
      title: name,
      username: user,
      keyValue: password,
      vigency: true,
    };
    if (op === 'edit')
    {
      params.id = id
      await credentialsService.editItem(params);
    }
    else if (op === 'create')
    {
      await credentialsService.addItem(params);
    }
    onFormSubmit();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      (clientId === "") || 
      (name === "") || 
      (user === "") || 
      (password === "")
    ) {
      setEmpty(true);
      setTimeout(() => setEmpty(false), 2000);
    }
    else {
      setEmpty(false);
      submitData();
      resetForm();
      onClose();
    }
  };


  return (
    <>
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header className="no-border"
            style={{ textAlign: 'center'}}>
            <Modal.Title style={{margin: 'auto'}}>
              {titleMaker(op, category)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="custom-form-group checkbox-container" >
              <Form.Label>{'Datos:'}</Form.Label>
              <div style={{display: 'flex'}}>
                <div style={{flex: 1, marginRight: '10px'}}>
                    <Form.Control className="custom-form-control"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nombre de Credencial"
                    />

                    <Form.Control className="custom-form-control"
                      type="text"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      placeholder="Usuario"
                    />

                    <Form.Control className="custom-form-control"
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contrasenna"
                    />
                </div>

                <div>
                  <Form.Select className="custom-form-control"
                    value={clientId} 
                    onChange={(e) => setClientId(e.target.value)}>
                  {clients !== null ? (
                    <>
                      <option value="">Institucion</option>
                      {clients.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </>
                      ) : (
                      <option value="">No hay clientes registrados</option>
                    )}
                  </Form.Select>
                </div>
              </div>
            </Form.Group>
          <div className="mt-auto d-flex justify-content-end">
              <Button variant="primary" type="submit">
                {op === 'edit'? 'Guardar': 'Crear credencial'}
              </Button>
          </div>
        {empty && (
          <div className="alert alert-danger mt-2">
            <div>Faltan datos que ingresar:</div>
            <div>
                {(clientId === "") && <div>Institucion</div>}
                {(name === "") && <div>Nombre</div>}
                {(user === "") && <div>Usuario</div>}
                {(password === "") && <div>Contrasenna</div>}
            </div>
          </div>
        )}
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CredentialsModal;


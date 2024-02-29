import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Internal imports
import clientService from '../../Service/clientService';
import userService from '../../Service/userService';
import { formErrorCatcher } from '../../Utils/formErrorCatcher'; 

// Styles imports
import '../../Style/DynamicModal.css';

function DynamicModal({ data, category, op, onFormSubmit, show, onClose }) {

  useEffect(() => {
    if (!show) {
      resetForm();
    }
    if (op === 'edit') {
      setId(data.id);
      setName(data.name);
      setPhone(data.phone);
      setEmail(data.email);
      setTaxId(data.taxId);
      setVigency(data.vigency);
      setAddress(data.address);
      setAdmin(data.superAdmin);
    }
  }, [])

  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);

  // Edit only
  const [id, setId] = useState('');

  // Common
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [taxId, setTaxId] = useState('');
  const [vigency, setVigency] = useState(false);

  // User only
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState(false);

  // Client only
  const [address, setAddress] = useState('');
  const [r_social, setRSocial] = useState('');


  const titleMaker = (op, category) => {
    const title_pre = (op === 'edit') ? 'Editar ' : 'Nuevo ';
    const title_sub = (category === 'client')? 'Cliente' : 'Usuario';
    return title_pre + title_sub;
  };

  const subtitleMaker = (category) => {
    const subtitle_sub = (category === 'client')? 'tributarios' : 'personales';
    return 'Datos ' + subtitle_sub + ':';
  };

  const submitData = async () => {
    const params = {
      name: name,
      phone: phone,
      email: email,
      taxId: taxId,
      vigency: true,
    };

    if (op === 'edit') {
      params.id = id;
      if (category === 'client') {
        params.address = address;
        const { success, data, errorType } = 
          await formErrorCatcher(clientService.editItem(params));
        setError(errorType);
      } else {
        params.password = password;
        params.superAdmin = admin;
        const { success, data, errorType } = 
          await formErrorCatcher(userService.editItem(params));
        setError(errorType);
      }
    } else if (op === 'create') {
      if (category === 'client') {
        params.address = address;
        const { success, data, errorType } = 
          await formErrorCatcher(clientService.addItem(params));
        setError(errorType);
      } else {
        params.password = password;
        params.superAdmin = admin;
        const { success, data, errorType } = 
          await formErrorCatcher(userService.addItem(params));
        setError(errorType);
      }
    }

    if (!error) {
      onFormSubmit();
    } else {

    }
  };

  const resetForm = () => {
    setId('');
    setName('');
    setPhone('');
    setEmail('');
    setTaxId('');
    setVigency(false);
    setAddress('');
    setAdmin(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
        (name === "") || 
        (email === "") || 
        (phone === "")
    )
    {
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
              <Form.Label>
                  {subtitleMaker(category)}</Form.Label>
              <div style={{width: '60%'}}>
                <Form.Control className="custom-form-control"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre"
                />

                <Form.Control className="custom-form-control"
                  type="text"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  placeholder="Rut"
                />

                <Form.Control className="custom-form-control"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefono"
                />

                <Form.Control className="custom-form-control"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo"
                />

                {category === 'user' ? (
                  <div className="form-row"> 
                    <Form.Label className="my-auto">
                      Dar privilegios de admin?</Form.Label>
                    <Form.Check 
                      type="checkbox" 
                      checked={admin} 
                      onChange={(e) => setAdmin(e.target.checked)}
                    />
                  </div>
                ) : null
                }

                {category === 'client' ? (
                    <Form.Control className="custom-form-control"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Direccion"
                    />
                ) : null
                }
              </div>
            </Form.Group>
          <div className="mt-auto d-flex justify-content-end">
              <Button variant="primary" type="submit">
              {op === 'create'? 
                (category === 'client'? 'Crear cliente' : 'Crear usuario'):
                'Guardar'}
              </Button>
          </div>
        {empty && (
          <div className="alert alert-danger mt-2">
            <div>Faltan datos que ingresar:</div>
            <div>
                {(name === "") && <div>Nombre</div>}
                {(category === 'user') && (taxId === "") && <div>Rut</div>}
                {(phone === "") && <div>Telefono</div>}
                {(email === "") && <div>Correo</div>}
                {(category === 'user') && (password === "") && <div>Contrasenna</div>}
                {(category === 'client') && (address === "") && <div>Direccion</div>}
            </div>
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-2">
            <div>
                {(error === 'errorEmail') && <div>Ya existe un usuario con este correo.</div>}
            </div>
          </div>
        )}

        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DynamicModal;


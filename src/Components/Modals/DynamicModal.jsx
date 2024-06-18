import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Internal imports
import clientService from '../../Service/clientService';
import userService from '../../Service/userService';
import { validateInput } from '../../Utils/validateInput';

// Styles imports
import '../../Style/DynamicModal.css';

function DynamicModal({ data, category, op, onFormSubmit, show, onClose }) {

  useEffect(() => {
    if (!show) {
      resetForm();
      setErrors({});
    }
    if (op === 'edit') {
      setId(data.id);
      setName(data.name);
      setPhone(data.phone);
      setEmail(data.email);
      setVigency(data.vigency);
      setAdmin(data.superAdmin);
      setTaxId(data.taxId);

      if (category === 'client') {
        setAddress(data.address);
      }
    }
  }, [])

  const [errors, setErrors] = useState({});

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


  const titleMaker = (op, category) => {
    const title_pre = (op === 'edit') ? 'Editar ' : 'Nuevo ';
    const title_sub = (category === 'client')? 'Cliente' : 'Usuario';
    return title_pre + title_sub;
  };

  const subtitleMaker = (category) => {
    const subtitle_sub = (category === 'client')? 'tributarios' : 'personales';
    return 'Datos ' + subtitle_sub + ':';
  };

  const submitData = async (params) => {
    if (op === 'edit' && category === 'client') {
      params.id = id;
      params.address = address;
      await clientService.editItem(params);
    }
    else if (op === 'edit' && category === 'user') {
      params.id = id;
      params.password = password;
      params.superAdmin = admin;
      await userService.editItem(params);
    } 
    else if (op === 'create' && category === 'client') {
      params.address = address;
      await clientService.addItem(params);
    }
    else if (op === 'create' && category === 'user') {
      params.password = password;
      params.superAdmin = admin;
      await userService.addItem(params);
    }
    onFormSubmit();
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
    setPassword('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = {
      name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
      phone: phone,
      email: email,
      taxId: taxId,
      vigency: true,
    };
    if (category === 'client')
      params.address = address;

    const validationResult = await validateInput(params, category, op);
    if (Object.keys(validationResult).length > 0) {
        setErrors(validationResult);
    } else {
        await submitData(params);
        resetForm();
        onClose();
        setErrors({});
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
          <div style={{width: '60%', margin: 'auto'}}>
            <Form.Group className="custom-form-group checkbox-container" >
              <Form.Label>
                  {subtitleMaker(category)}
              </Form.Label>
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
                  <Form.Control className="custom-form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contrasenna"
                  />
                ) :
                null
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

                {category === 'user' ? (

                    <div className="form-row" style={{width: '100%' }}>
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

            </Form.Group>
          <div className="mt-3 d-flex justify-content-end">
              <Button variant="primary" type="submit">
              {op === 'create'? 
                (category === 'client'? 'Crear cliente' : 'Crear usuario'):
                'Guardar'}
              </Button>
          </div>
        {Object.keys(errors).length > 0 && (
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

export default DynamicModal;


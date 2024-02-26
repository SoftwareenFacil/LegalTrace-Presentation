import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Internal imports
import clientService from '../../Service/clientService';
import userService from '../../Service/userService';

// Styles imports
import '../../Style/DynamicModal.css';

function DynamicModal({ data, category, op, onFormSubmit, show, onClose }) {

  useEffect(() => {
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
    if (op === 'edit')
    {
      params.id = id
      if (category === 'client')
      {
        params.address = address;
        await clientService.editItem(params);
      }
      else {
        params.password = password;
        params.superAdmin = admin;
        await userService.editItem(params);
      }
    }
    else if (op === 'create')
    {
      if (category === 'client')
      {
        params.address = address;
        await clientService.addItem(params);
      }
      else {
        params.password = password;
        params.superAdmin = admin;
        await userService.addItem(params);
      }
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
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DynamicModal;


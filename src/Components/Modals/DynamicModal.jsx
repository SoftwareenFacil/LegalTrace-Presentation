import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Internal imports
import clientService from '../../Service/clientService';
import userService from '../../Service/userService';

// Styles imports
import '../../Style/DynamicModal.css';

function DynamicModal({ mode, op, onFormSubmit, show, onClose }) {

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

  // Client only
  const [address, setAddress] = useState('');
  const [r_social, setRSocial] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');


  const titleMaker = (op, mode) => {
    const title_pre = (op === 'edit') ? 'Editar ' : 'Nuevo ';
    const title_sub = (mode === 'client') ? 'Cliente' : 'Usuario';
    return title_pre + title_sub;
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
      if (mode === 'client')
      {
        params.address = address;
        await clientService.editItem(params);
      }
      else {
        params.password = password;
        await userService.editItem(params);
      }
    }
    else if (op === 'create')
    {
      if (mode === 'client')
      {
        params.address = address;
        await clientService.addItem(params);
      }
      else {
        params.password = password;
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
        <Modal.Header 
            style={{ textAlign: 'center'}}>
            <Modal.Title style={{margin: 'auto'}}>
              {titleMaker(op, mode)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="custom-form-group" >
              <Form.Label style={{margin: 'auto', marginBottom: '2em'}}>
                          Datos tributarios:</Form.Label>
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


            {mode === 'client' ? (
                <Form.Control className="custom-form-control"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Direccion"
                />
            ) : null
            }
            {/*mode === 'user' ? (
              <>
                <Form.Control className="custom-form-control"
                  type="password"
                  value={""}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </>
            ) : (
              <>
                <Form.Control className="custom-form-control"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter Address"
                />
              </>
            )*/}
            </Form.Group>
          <div className="ml-auto">
              <Button variant="primary" type="submit">
              {mode === 'client'? 'Crear cliente' : 'Crear usuario'}
              </Button>
          </div>
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DynamicModal;


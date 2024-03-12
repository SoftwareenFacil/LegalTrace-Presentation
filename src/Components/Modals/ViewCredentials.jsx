import React, { useState } from 'react';
import { Modal, Form, InputGroup, Button } from 'react-bootstrap';
import { Clipboard, Eye, EyeSlash } from 'react-bootstrap-icons'; // Ensure you have installed react-bootstrap-icons

// Internal imports
import { handleCopy } from '../../Utils/copy.js';
import { Mensajes } from '../../Constants/Constant.jsx';

// Styles imports
import '../../Style/DynamicModal.css';

const ViewCredentials = ({data, show, onClose}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [copied, setCopied] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleUsernameVisibility = () => {
    setShowUsername(!showUsername);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header className="no-border"
            style={{ textAlign: 'center'}}>
            <Modal.Title style={{margin: 'auto'}}>
              {
                <div>
                  <div>Credencial</div>
                  <small className="text-info">{data.clientName}</small>
                </div>
              }
            </Modal.Title>
        </Modal.Header>
        <div style={{width: '40%', margin: 'auto'}}>
          <Form> 
            <Form.Group className="custom-form-group mb-3" >
                <Form.Label>Usuario:</Form.Label>
                <InputGroup>
                  <Form.Control
                    value={data.username}
                    type={showUsername ? "text" : "password"}
                  />
                  <InputGroup.Text onClick={toggleUsernameVisibility}>
                    {showUsername? <EyeSlash /> : <Eye />}
                  </InputGroup.Text>
                </InputGroup>
            </Form.Group>

            <Form.Group className="custom-form-group mb-3" >
              <Form.Label>Contraseña:</Form.Label>
              <InputGroup>
                <Form.Control 
                  value={data.keyValue}
                  type={showPassword ? "text" : "password"}
                />
                <InputGroup.Text onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <div className="d-flex justify-content-center mb-4">
              <Button variant="primary" onClick={() => handleCopy(data.keyValue,
                setCopied)}>
                Copiar contraseña
              </Button>
            </div>
          </Form>
        {copied && (
          <div className="alert alert-success mt-2">
            {Mensajes.Copiado}
          </div>
        )}
        </div>
    </Modal>
  );
};

export default ViewCredentials;


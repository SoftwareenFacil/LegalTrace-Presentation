// MessageModal.jsx

// External imports
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Internal imports
import { validateInput } from '../../Utils/validateInput';
import { messageGenerator } from '../../Utils/messageGenerator';
import whatsappImage from 
"../../Assets/ChatOnWhatsAppButton/WhatsAppButtonGreenLarge.svg";

// Styles imports
import '../../Style/DynamicModal.css';

function MessageModal({ data, category, show, onClose }) {

  useEffect(() => {
    if (!show) {
      resetForm();
      setErrors({});
    }
  }, []);

  const [errors, setErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);


  const defaultMessage = messageGenerator(data);
  const [message, setMessage] = useState(defaultMessage);

  const resetForm = () => {
    setMessage(defaultMessage);
  };

  const submitData = (params) => {
    const whatsappLink = `https://wa.me/${data.phone}?text=${encodeURIComponent(params.message)}`;
    window.open(whatsappLink, '_blank');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = {  
      message: message,
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
        submitData(params);
        resetForm();
        onClose();
        setShowErrorAlert(false);
        setErrors({});
    }
  };

  
  return (
    <>
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header  className="no-border"
            style={{ textAlign: 'center'}}>
            <Modal.Title style={{margin: 'auto'}}>Mensaje:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
          <div style={{width: '60%', margin: 'auto'}}>
            <Form.Group className="custom-form-group" >
                <Form.Control className="custom-form-control"
                  as="textarea"
                  rows={10}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
            </Form.Group>

         <div className="mt-3 d-flex justify-content-end">
          <img
            alt="Chat on WhatsApp"
            src={whatsappImage}
            onClick={handleSubmit}
            style={{ cursor: 'pointer' }} 
          />
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

export default MessageModal;


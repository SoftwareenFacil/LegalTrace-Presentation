// TasksModal.jsx

// External imports
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { parseISO } from 'date-fns';

// Internal imports
import paymentService from '../../Service/paymentService';
import { validateInput } from '../../Utils/validateInput';
import { getClients } from '../../Utils/getEntity';
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
  const [clientId, setClientId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const [amount, setAmount] = useState('');
  const [numericAmount, setNumericAmount] = useState(0);
  const [unit, setUnit] = useState(0);
  const [fileLink, setFileLink] = useState('test');

  const [clients, setClients] = useState([]);

  const resetForm = () => {
    setId('');
    setClientId(0);
    setTitle('');
    setDescription('');
    
    setAmount('');
    setNumericAmount(0);
    setUnit(0);
    setFileLink('test');
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
      date:parseISO (new Date().toISOString().split('T')[0]) ,
      amount: numericAmount,
      chargeType: unit,
      fileName: "Dockerfile",
      fileType: "text/plain",
      fileString: "IyBPZmZpY2lhbCAuTkVUIFNESyBiYXNlIGltYWdlIGZvciB0aGUgYnVpbGQgc3RhZ2UNCkZST00gbWNyLm1pY3Jvc29mdC5jb20vZG90bmV0L3Nkazo3LjAgQVMgYnVpbGQNCg0KQVJHIEFQUF9OQU1FIA0KDQpXT1JLRElSIC9hcHANCg0KQ09QWSAuIC4NCg0KUlVOIGRvdG5ldCB0b29sIGluc3RhbGwgLS1nbG9iYWwgZG90bmV0LWVmIC0tdmVyc2lvbiA3LjAuMTENCkVOViBQQVRIPSIkUEFUSDovcm9vdC8uZG90bmV0L3Rvb2xzIg0KDQojIEdlbmVyYXRlIG1pZ3JhdGlvbiBzY3JpcHQNCiNSVU4gZG90bmV0IGVmIC0tcHJvamVjdCAuL0xlZ2FsVHJhY2UuREFMIC0tc3RhcnR1cC1wcm9qZWN0IC4vTGVnYWxUcmFjZSBcDQojZGJjb250ZXh0IHNjcmlwdCAtbyAuL3NjcmlwdC5zcWwNCg0KUlVOIGRvdG5ldCBlZiAtLXByb2plY3QgLi8kQVBQX05BTUUuREFMIC0tc3RhcnR1cC1wcm9qZWN0IC4vJEFQUF9OQU1FIFwNCmRiY29udGV4dCBzY3JpcHQgLW8gLi9zY3JpcHQuc3FsDQoNCldPUktESVIgL2FwcA0KUlVOIGRvdG5ldCByZXN0b3JlDQoNCkVOViBET0NLRVJfQlVJTEQ9dHJ1ZQ0KDQojIEJ1aWxkIHRoZSBhcHBsaWNhdGlvbg0KUlVOIGRvdG5ldCBwdWJsaXNoIC1jIFJlbGVhc2UgLXIgbGludXgteDY0IC1vIG91dA0KDQojIEJ1aWxkIGEgcnVudGltZSBpbWFnZQ0KRlJPTSBtY3IubWljcm9zb2Z0LmNvbS9kb3RuZXQvYXNwbmV0OjcuMA0KDQpBUkcgQVBQX05BTUUNCkVOViBFTlZfQVBQX05BTUU9JEFQUF9OQU1FDQoNCldPUktESVIgL2FwcA0KDQpDT1BZIC0tZnJvbT1idWlsZCAvYXBwL291dC8gLi8NCkNPUFkgLS1mcm9tPWJ1aWxkIC9hcHAvc2NyaXB0LnNxbCAvYXBwL3NjcmlwdC8NCg0KUlVOIGFwdC1nZXQgdXBkYXRlDQoNClJVTiBhcHQtZ2V0IGluc3RhbGwgd2dldCBsaWJnZGlwbHVzIC15DQoNClJVTiB3Z2V0IC1QIC9hcHAgaHR0cHM6Ly9naXRodWIuY29tL3Jkdm9qbW9jL0RpbmtUb1BkZi9yYXcvbWFzdGVyL3YwLjEyLjQvNjQlMjBiaXQvbGlid2todG1sdG94LmRsbA0KDQpSVU4gd2dldCAtUCAvYXBwIGh0dHBzOi8vZ2l0aHViLmNvbS9yZHZvam1vYy9EaW5rVG9QZGYvcmF3L21hc3Rlci92MC4xMi40LzY0JTIwYml0L2xpYndraHRtbHRveC5keWxpYg0KDQpSVU4gd2dldCAtUCAvYXBwIGh0dHBzOi8vZ2l0aHViLmNvbS9yZHZvam1vYy9EaW5rVG9QZGYvcmF3L21hc3Rlci92MC4xMi40LzY0JTIwYml0L2xpYndraHRtbHRveC5zbw0KDQpBREQgLi8kQVBQX05BTUUvSHRtbFRlbXBsYXRlcy8gL2FwcC9IdG1sVGVtcGxhdGVzLw0KDQpFTlYgQVNQTkVUQ09SRV9VUkxTPWh0dHA6Ly8rOjUxMDg7DQoNCiMgRXhwb3NlIHBvcnQNCkVYUE9TRSA1MTA4DQoNCkNNRCBkb3RuZXQgIi4vJEVOVl9BUFBfTkFNRS5kbGwiDQoNCg==",
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
        <Modal.Header className="no-border"
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

                

                <Form.Label>Monto:</Form.Label>
                <div className="form-row" style={{width: '100%' }}>
                  <Form.Select className="custom-form-control" 
                        style={{width: '100px', marginRight: '5px'}}
                        value={unit} 
                        onChange={(e) => setUnit(Number(e.target.value))}>
                        <option value={0}>Pesos</option>
                        <option value={1}>UF</option>
                        <option value={2}>UTM</option>
                        <option value={3}>USD</option>
                  </Form.Select>

                  <Form.Control className="custom-form-control"
                    type="text"
                    value={amount}
                    onChange={handleAmount}
                    placeholder="Ingrese monto"
                  />
                </div>
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


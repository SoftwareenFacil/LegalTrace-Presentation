// TasksModal.jsx

// External imports
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { parseISO } from 'date-fns';

// Internal imports
import paymentService from '../../Service/paymentService';
import { validateInput } from '../../Utils/validateInput';
import { getClients } from '../../Utils/getEntity';
import { formatCLP } from "../../Utils/formatters";

// Styles imports
import '../../Style/DynamicModal.css';

function PaymentsModal({ data, category, op, onFormSubmit, show, onClose }) {
  const titleModal = op === 'edit' ? 'Editar Cobro' : 'Crear Cobro';

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
      setFileLink(data.fileLink);
      setFileType(data.type);
      setFileString(data.fileString);
      setTypesOptions(data.type); 
      setUnit(data.unit); 
    }
    const fetchEntities = async () => {
      const data_clients = await getClients({id: 0});
      setClients(data_clients);
    };
    fetchEntities();
  }, [op,show,data]);

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
  const [fileName,setFileName]=useState('')
  const [fileType,setFileType]=useState('')
  const [fileString,setFileString]=useState('')


  const [clients, setClients] = useState([]);
  const [typesOptions,setTypesOptions] = useState('');
  const resetForm = () => {
    setId('');
    setClientId(0);
    setTitle('');
    setDescription('');
    
    setAmount('');
    setNumericAmount(0);
    setUnit(0);
    setFileLink('test');
    setFileName('');
    setFileString('');
    setFileType('')
    setTypesOptions(''); 
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
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFileLink(fileReader.result);
        setFileName(file.name);
        setFileType(file.type);
        setFileString(fileReader.result.split(',')[1]); // Base64 string
      };
      fileReader.readAsDataURL(file);
    }
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
     fileLink:fileLink, 
    fileName:fileName,
    fileType:fileType,
    fileString:fileString,
    type: typesOptions,
   
    
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
  const types = [
    { key: 'option1', label: 'F29' },
    { key: 'option2', label: 'Renta' },
    { key: 'option3', label: 'Leyes Sociales' },
    { key: 'option4', label: 'Otros' },
];
  return (
    <>
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header className="no-border"
            style={{ textAlign: 'center'}}>
              
            <Modal.Title style={{margin: 'auto'}}>{titleModal}</Modal.Title>
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
                <Form.Label style={{margin: 'auto'}}>Tipo:</Form.Label>
                <Form.Select className="custom-form-control"
                      value={typesOptions} 
                      onChange={(e) => setTypesOptions(e.target.value)}>
                    <option value=''>Seleccionar</option>
                    {types.map((option) => (
                      <option key={option.key} value={option.label}>
                    {option.label}
                    </option>
                    ))}
                </Form.Select>
                <Form.Label style={{margin: 'auto'}}>Título:</Form.Label>
                <Form.Control className="custom-form-control"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titulo Cobro"
                />  
                <Form.Label style={{margin: 'auto'}}>Descripción:</Form.Label>
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

            <Form.Group controlId="formFile">
            <Form.Label>Archivo</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              name='file'
              isInvalid={!!errors.file}
            />
            <Form.Control.Feedback type="invalid">
              {errors.file}
            </Form.Control.Feedback>
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


// TasksModal.jsx

// External imports
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { parseISO, format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Internal imports
import paymentService from "../../Service/paymentService";
import { validateInput } from "../../Utils/validateInput";
import { getClients } from "../../Utils/getEntity";
import { formatCLP } from "../../Utils/formatters";

// Styles imports
import "../../Style/DynamicModal.css";

function PaymentsModal({ data, category, op, onFormSubmit, show, onClose }) {
  const titleModal = op === "edit" ? "Editar Cobro" : "Crear Cobro";

  useEffect(() => {
    if (!show) {
      resetForm();
      setErrors({});
    }
    if (op === "edit") {
      setId(data.id);
      setClientId(data.clientId);
      setTitle(data.title);
      setDescription(data.description);
      setPaymentDate(
        data.paymentDate ? new Date(data.paymentDate) : new Date()
      );
      setAmount(formatCLP(data.amount));
      setNumericAmount(data.amount);
      setFileName(data.fileName || "");
      setFileType(data.fileType || "");
      setFileString(data.fileString || "");
      setUnit(data.chargeType || 0);
      setIsPaidByClient(data.isPaidByClient || false);
    }
    const fetchEntities = async () => {
      const data_clients = await getClients({ id: 0 });
      setClients(data_clients);
    };
    fetchEntities();
  }, [op, show, data]);

  const [errors, setErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [id, setId] = useState("");
  const [clientId, setClientId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date());

  const [amount, setAmount] = useState("");
  const [numericAmount, setNumericAmount] = useState(0);
  const [unit, setUnit] = useState(0);
  const [isPaidByClient, setIsPaidByClient] = useState(false);
  const [fileLink, setFileLink] = useState("test");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileString, setFileString] = useState("");
  const [hasFile, setHasFile] = useState(false);

  const [clients, setClients] = useState([]);
  const resetForm = () => {
    setId("");
    setClientId(0);
    setTitle("");
    setDescription("");
    setPaymentDate(new Date());

    setAmount("");
    setNumericAmount(0);
    setUnit(0);
    setIsPaidByClient(false);
    setFileLink("test");
    setFileName("");
    setFileString("");
    setFileType("");
    setHasFile(false);
  };

  const submitData = async (params) => {
    if (op === "edit") {
      params.id = id;
      await paymentService.editItem(params);
    } else if (op === "create") {
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
        setFileString(fileReader.result.split(",")[1]); // Base64 string
        setHasFile(true);
      };
      fileReader.readAsDataURL(file);
    } else {
      setFileName("");
      setFileType("");
      setFileString("");
      setHasFile(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = {
      clientId: clientId,
      title: title,
      description: description,
      paymentDate: paymentDate.toISOString(),
      amount: numericAmount,
      chargeType: unit,
      isPaidByClient: isPaidByClient,
      fileName: hasFile ? fileName : "",
      fileType: hasFile ? fileType : "",
      ...(hasFile && { fileString: fileString }),
      date: new Date().toISOString(),
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
    const numericValue = inputAmount.replace(/\D/g, "");
    setAmount(formatCLP(numericValue));
    setNumericAmount(parseInt(numericValue, 10));
  };
  return (
    <>
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header className="no-border" style={{ textAlign: "center" }}>
          <Modal.Title style={{ margin: "auto" }}>{titleModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div style={{ width: "60%", margin: "auto" }}>
              <Form.Group className="custom-form-group">
                <Form.Label>Fecha de pago</Form.Label>
                <DatePicker
                  selected={paymentDate}
                  onChange={(date) => setPaymentDate(date || new Date())}
                  dateFormat="dd/MM/yyyy"
                  className="form-control custom-form-control"
                  placeholderText="Seleccionar fecha"
                />

                <Form.Label>Cliente</Form.Label>
                <Form.Select
                  className="custom-form-control"
                  value={clientId}
                  onChange={(e) => setClientId(Number(e.target.value))}
                >
                  {clients !== null ? (
                    <option value="">Seleccionar</option>
                  ) : (
                    <option value="">No hay clientes registrados</option>
                  )}
                  {clients !== null
                    ? clients.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))
                    : null}
                </Form.Select>

                <Form.Label>Título</Form.Label>
                <Form.Control
                  className="custom-form-control"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titulo Cobro"
                />

                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  className="custom-form-control"
                  as="textarea"
                  rows={10}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe el cobro"
                />

                <Form.Label>Tipo de cobro</Form.Label>
                <Form.Select
                  className="custom-form-control"
                  value={unit}
                  onChange={(e) => setUnit(Number(e.target.value))}
                >
                  <option value="">Seleccionar tipo</option>
                  <option value={0}>F29</option>
                  <option value={1}>Renta</option>
                  <option value={2}>Leyes Sociales</option>
                  <option value={3}>Otros</option>
                </Form.Select>

                <Form.Label>Monto</Form.Label>
                <Form.Control
                  className="custom-form-control"
                  type="text"
                  value={amount}
                  onChange={handleAmount}
                  placeholder="Ingrese monto"
                />

                {op === "edit" && (
                  <Form.Check
                    type="checkbox"
                    label="¿Pagado por el cliente?"
                    checked={isPaidByClient}
                    onChange={(e) => setIsPaidByClient(e.target.checked)}
                    style={{
                      marginTop: "10px",
                    }}
                    className="custom-checkbox-larger"
                  />
                )}
              </Form.Group>

              <Form.Group controlId="formFile">
                <Form.Label>Archivo</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  name="file"
                  isInvalid={!!errors.file}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.file}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="mt-3 d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  {op === "edit" ? "Editar Cobro" : "Crear Cobro"}
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

// PaymentsPage.tsx

// External imports
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEnvelope,
  faLock,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

// Internal imports
import CrearButton from "../../Buttons/CrearButton";
import PaymentsModal from "../../Modals/PaymentsModal";
import LoadingIndicator from "../../Loading/LoadingIndicator";
import EmptyData from "../../Alerts/EmptyData";
import BadgeVigency from "../../Badges/BadgeVigency";
import { usePaymentsPage } from "./usePaymentsPage";

// Styles imports
import "./PaymentsPage.scss";

interface Client {
  id: number;
  name: string;
  email: string;
  taxId: string | null;
  address: string;
  created: string;
  vigency: boolean;
}

interface Payment {
  id: number;
  clientId: number;
  title: string;
  description: string;
  paymentDate: string;
  amount: number;
  chargeType: string;
  created: string;
  updated: string;
  fileLink: string;
  isPaidByClient: boolean;
  client: Client;
}

interface PaymentModalData {
  id: number;
  clientId: number;
  title: string;
  description: string;
  paymentDate: string | null;
  amount: number;
  chargeType: number;
  fileName: string;
  fileType: string;
  fileString: string;
}

export function PaymentsPage() {
  const {
    filteredPayments,
    empty,
    loading,
    searchTerm,
    selectedPayments,
    bankData,
    setBankData,
    handleRefresh,
    handleSearch,
    handleCheckboxChange,
    handleSelectAll,
    handleSendEmails,
    handleEditPayment,
    handleDeletePayment,
    formatAmount,
    formatChargeType,
  } = usePaymentsPage();

  const [showModal, setShowModal] = React.useState(false);
  const [modalData, setModalData] = React.useState<PaymentModalData | null>(
    null
  );
  const [modalOp, setModalOp] = React.useState<"create" | "edit">("create");

  const handleEdit = (payment: Payment) => {
    const formattedData = handleEditPayment(payment);
    setModalData(formattedData);
    setModalOp("edit");
    setShowModal(true);
  };

  const handleDelete = (payment: Payment) => {
    handleDeletePayment(payment.id, payment.title);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
    setModalOp("create");
  };

  const handleModalSubmit = () => {
    handleRefresh();
    setShowModal(false);
  };

  return (
    <Container fluid className="payments-page">
      {/* Header Button */}
      <Row className="mb-4">
        <Col>
          <CrearButton
            onFormSubmit={handleRefresh}
            category="payments"
            CustomModal={PaymentsModal}
          />
        </Col>
      </Row>

      {/* Bank Data Section */}
      <Row className="mb-4">
        <Col>
          <div className="bank-data-section">
            <div className="section-title">
              <FontAwesomeIcon icon={faLock} className="me-2" />
              Datos Bancarios
            </div>
            <Row className="bank-form">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Banco</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="****"
                    value={bankData.banco}
                    onChange={(e) =>
                      setBankData({ ...bankData, banco: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Número de Cuenta</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="****"
                    value={bankData.numeroCuenta}
                    onChange={(e) =>
                      setBankData({ ...bankData, numeroCuenta: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Clave</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="****"
                    value={bankData.clave}
                    onChange={(e) =>
                      setBankData({ ...bankData, clave: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Titular</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="****"
                    value={bankData.titular}
                    onChange={(e) =>
                      setBankData({ ...bankData, titular: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* Payments Table Section */}
      <Row>
        <Col>
          <div className="payments-section">
            <div className="section-header">
              <h3 className="section-title">Registros de Cobro</h3>
              <Button
                variant="success"
                className="send-emails-btn"
                onClick={handleSendEmails}
              >
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                Enviar Correos ({selectedPayments.length})
              </Button>
            </div>

            {/* Search Bar */}
            <div className="search-bar">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <Form.Control
                type="text"
                placeholder="Buscar cliente o título de cargo"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>

            {/* Table */}
            {loading ? (
              <LoadingIndicator isLoading={loading} />
            ) : empty ? (
              <EmptyData empty={empty} />
            ) : (
              <div className="table-wrapper">
                <table className="payments-table">
                  <thead>
                    <tr>
                      <th className="checkbox-col">
                        <Form.Check
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={
                            selectedPayments.length ===
                              filteredPayments.length &&
                            filteredPayments.length > 0
                          }
                        />
                      </th>
                      <th>FECHA</th>
                      <th>TÍTULO</th>
                      <th>CLIENTE</th>
                      <th>MONTO</th>
                      <th>TIPO</th>
                      <th>ESTADO</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="checkbox-col">
                          <Form.Check
                            type="checkbox"
                            checked={selectedPayments.includes(payment.id)}
                            onChange={() => handleCheckboxChange(payment.id)}
                          />
                        </td>
                        <td>
                          {payment.paymentDate
                            ? format(
                                new Date(payment.paymentDate),
                                "dd MMM yyyy"
                              )
                            : "No informado"}
                        </td>
                        <td>
                          <div className="payment-title">
                            {payment.title || "Sin título"}
                          </div>
                          <div className="payment-description">
                            {payment.description || ""}
                          </div>
                        </td>
                        <td>
                          <div className="client-info">
                            <div className="client-name">
                              {payment.client?.name || "No informado"}
                            </div>
                            <div className="client-email">
                              {payment.client?.email || ""}
                            </div>
                          </div>
                        </td>
                        <td className="amount-col">
                          {formatAmount(payment.amount || 0)}
                        </td>
                        <td>{formatChargeType(payment.chargeType) || "N/A"}</td>
                        <td>
                          <BadgeVigency
                            entity={payment}
                            category="credentials"
                            className=""
                          />
                        </td>
                        <td className="actions-col">
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(payment)}
                            title="Editar"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(payment)}
                            title="Eliminar"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Modal for Edit */}
      <PaymentsModal
        data={modalData}
        category="payments"
        op={modalOp}
        onFormSubmit={handleModalSubmit}
        show={showModal}
        onClose={handleCloseModal}
      />
    </Container>
  );
}

export default PaymentsPage;

// PaymentsPage.tsx

// External imports
import { Form, Button } from "react-bootstrap";
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
import EmailModal from "./components/email-modal/emailModal";
import LoadingIndicator from "../../Loading/LoadingIndicator";
import EmptyData from "../../Alerts/EmptyData";
import { usePaymentsPage } from "./usePaymentsPage";

// Styles imports
import "./PaymentsPage.scss";

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
    formatAmount,
    formatChargeType,
    emailPreviewData,
    showEditModal,
    showEmailModal,
    modalData,
    modalOp,
    handleEdit,
    handleDelete,
    handleCloseEditModal,
    handleCloseEmailModal,
    handleModalSubmit,
  } = usePaymentsPage();

  return (
    <div className="payments-page-container">
      <div className="payments-page">
        {/* Header Button */}
        <div className="header-section">
          <CrearButton
            onFormSubmit={handleRefresh}
            category="payments"
            CustomModal={PaymentsModal}
          />
        </div>

        {/* Bank Data Section */}
        <div className="bank-data-section mb-4">
          <div className="section-title">
            <FontAwesomeIcon icon={faLock} className="me-2" />
            Datos Bancarios
          </div>
          <div className="bank-form">
            <Form.Group className="bank-input-group">
              <Form.Label>Banco</Form.Label>
              <Form.Control
                type="text"
                placeholder="****"
                value={bankData.banco}
                onChange={(e) =>
                  setBankData({ ...bankData, banco: e.target.value })
                }
                disabled
              />
            </Form.Group>
            <Form.Group className="bank-input-group">
              <Form.Label>Número de Cuenta</Form.Label>
              <Form.Control
                type="text"
                placeholder="****"
                value={bankData.numeroCuenta}
                onChange={(e) =>
                  setBankData({ ...bankData, numeroCuenta: e.target.value })
                }
                disabled
              />
            </Form.Group>
            <Form.Group className="bank-input-group">
              <Form.Label>Clave</Form.Label>
              <Form.Control
                type="text"
                placeholder="****"
                value={bankData.clave}
                onChange={(e) =>
                  setBankData({ ...bankData, clave: e.target.value })
                }
                disabled
              />
            </Form.Group>
            <Form.Group className="bank-input-group">
              <Form.Label>Titular</Form.Label>
              <Form.Control
                type="text"
                placeholder="****"
                value={bankData.titular}
                onChange={(e) =>
                  setBankData({ ...bankData, titular: e.target.value })
                }
                disabled
              />
            </Form.Group>
          </div>
        </div>

        {/* Payments Table Section */}
        <div className="payments-section">
          <div className="section-header">
            <h3 className="section-title">Registro de cobros</h3>
            <Button
              variant="success"
              className="send-emails-btn"
              onClick={async () => {
                await handleSendEmails();
              }}
              disabled={selectedPayments.length === 0}
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
                          selectedPayments.length === filteredPayments.length &&
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
                          ? format(new Date(payment.paymentDate), "dd MMM yyyy")
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
                        <div
                          style={{
                            display: "inline-block",
                            minWidth: "90px",
                            padding: "4px 16px",
                            borderRadius: "16px",
                            textAlign: "center",
                            fontWeight: 500,
                            backgroundColor: payment.isPaidByClient
                              ? "#c6f6d5"
                              : "#ffe6c1",
                            color: payment.isPaidByClient
                              ? "#2f855a"
                              : "#b97a2a",
                          }}
                        >
                          {payment.isPaidByClient ? "Pagado" : "Pendiente"}
                        </div>
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

        {/* Modal for Edit / Email Preview */}
        <PaymentsModal
          data={
            modalData || {
              clientId: 0,
              title: "",
              description: "",
              paymentDate: new Date().toISOString(),
              amount: 0,
              chargeType: 0,
              isPaidByClient: false,
            }
          }
          category="payments"
          op={modalOp}
          onFormSubmit={handleModalSubmit}
          show={showEditModal}
          onClose={handleCloseEditModal}
        />
        <EmailModal
          data={emailPreviewData}
          onFormSubmit={handleModalSubmit}
          show={showEmailModal}
          onClose={handleCloseEmailModal}
        />
      </div>
    </div>
  );
}

export default PaymentsPage;

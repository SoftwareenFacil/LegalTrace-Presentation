import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import { sendPaymentReminder } from "../../../../../Service/emailService";
import Swal from "sweetalert2";
import "../../../../../Style/DynamicModal.css";

interface PaymentsModalProps {
  show: boolean;
  onClose: () => void;
  data: {
    id: number;
    title: string;
    clientId: number;
    clientName: string;
    emailHTML?: string;
  }[];
  onFormSubmit?: (formData: unknown) => void;
}

const EmailModal: React.FC<PaymentsModalProps> = ({ show, onClose, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const extractBody = (html: string) => {
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    return bodyMatch ? bodyMatch[1] : html;
  };

  const currentEmail = data[currentIndex];

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header>
        <div style={{ width: "100%" }}>
          <div style={{ fontWeight: 500, fontSize: 24, marginBottom: 2 }}>
            Vista Previa de Correo
          </div>
          <div style={{ fontSize: 16, color: "#444", marginBottom: 2 }}>
            {currentEmail?.clientName} - {currentEmail?.title}
          </div>
          <div style={{ fontSize: 14, color: "#666" }}>
            Correo {currentIndex + 1} de {data.length}
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "350px",
            background: "#fafafa",
            borderRadius: 8,
            border: "1px solid #eee",
            padding: 24,
          }}
        >
          {currentEmail && currentEmail.emailHTML ? (
            <div
              style={{
                width: "100%",
                maxWidth: 600,
                maxHeight: "60vh",
                overflowY: "auto",
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: extractBody(currentEmail.emailHTML),
                }}
              />
            </div>
          ) : (
            <div style={{ color: "#888" }}>No hay vista previa disponible.</div>
          )}
          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>
              <Button variant="outline-secondary" onClick={onClose}>
                Cancelar
              </Button>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {currentIndex > 0 && (
                <Button variant="outline-success" onClick={handlePrev}>
                  Anterior
                </Button>
              )}
              {currentIndex < data.length - 1 ? (
                <Button variant="success" onClick={handleNext}>
                  Siguiente
                </Button>
              ) : (
                <Button
                  variant="danger"
                  onClick={async () => {
                    let success = 0;
                    let fail = 0;
                    try {
                      for (const item of data) {
                        try {
                          await sendPaymentReminder(Number(item.id));
                          success++;
                        } catch {
                          fail++;
                        }
                      }
                      Swal.fire({
                        icon: fail === 0 ? "success" : "warning",
                        title:
                          fail === 0
                            ? "Correos enviados correctamente"
                            : "Algunos correos no se enviaron",
                        text: `Enviados: ${success}, Fallidos: ${fail}`,
                      });
                    } catch {
                      Swal.fire({
                        icon: "error",
                        title: "Error al enviar correos",
                        text: "Ocurrió un error inesperado.",
                      });
                    }
                    onClose();
                  }}
                >
                  {data.length === 1 ? "Enviar" : "Enviar todos"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EmailModal;

import { useLocation } from "react-router-dom";
import { show_alerta } from "../../../Service/shared-state";
import withReactContent from "sweetalert2-react-content";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
export function ClientDetail() {
  const [id, setId] = useState("");
  const location = useLocation();
  const client = location.state ? location.state.client : null;
  const deleteclient = (id, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Seguro desea eliminar al Cliente: " + name + "?",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setId(id);
      } else {
        show_alerta("El Cliente no fue eliminado");
      }
    });
  };

  if (!client) {
    return <div>No hay dato de Cliente disponible.</div>;
  }

  return (
    <div className="client-detail-container">
      <div className="client-detail-card">
        <div className="client-image">
          <img
            src={client.image || "path_to_default_image.png"}
            alt={client.name || "Cliente"}
          />
        </div>
        <div className="client-info">
          <h1>{client.name || "Nombre no informado"}</h1>
          <h2>{client.title || "Cargo no informado"}</h2>
          <p>Rut: {client.rut || "Rut no informado"}</p>
          <p>Ciudad: {client.city || "Ciudad no informada"}</p>
          <p>Fono: {client.phone || "Teléfono no informado"}</p>
          <p>Correo: {client.email || "Correo no informado"}</p>
        </div>
        <div className="client-status">
          <span
            className={`status-indicator ${
              client.active ? "active" : "inactive"
            }`}
          >
            {client.active ? "Activo" : "Inactivo"}
          </span>
        </div>
        <div className="client-actions">
          <button
            onClick={() => deleteclient(client.id, client.name)}
            className="btn btn-danger"
          >
            Deshabilitar Cliente
          </button>
          <button className="btn btn-primary">Editar Cliente</button>
        </div>
      </div>
      <div className="client-detail-footer">
        <span>Ingresado el: {client.date || "Fecha no informada"}</span>
      </div>
    </div>
  );
}

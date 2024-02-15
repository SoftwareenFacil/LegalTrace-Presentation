import { useLocation } from "react-router-dom";
import { show_alerta } from "../../../Service/shared-state";
import withReactContent from "sweetalert2-react-content";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../../Style/Detail.css";

export function UserDetail() {
  const [id, setId] = useState("");
  const location = useLocation();
  const user = location.state ? location.state.user : null;

  const deleteUser = (id, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Seguro desea deshabilitar al Usuario: " + name + "?",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Deshabilitar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "btn btn-danger m-2",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setId(id);
      } else {
        show_alerta("El usuario no fue deshabilitado");
      }
    });
  };

  const determineUserStatusClass = (status) => {
    return status.replace(/\s/g, "").toLowerCase() === "activo"
      ? "activo"
      : "inactive";
  };

  if (!user) {
    return <div>No hay datos de usuario disponibles.</div>;
  }

  return (
    <div className="user-detail-container">
      <div className="user-detail-card">
        <div className="user-image">
          <img
            src={user.image || "/path_to_default_image.png"}
            alt={user.name || "Usuario"}
            className="rounded-circle"
          />
        </div>
        <div className="user-info">
          <div className="user-detail-date">
            <span>Ingresado el: {user.date || "Fecha no informada"}</span>
          </div>
          <h1 className="user-name">{user.name || "Nombre no informado"}</h1>
          <h2 className="user-title">{user.title || "Cargo no informado"}</h2>
          <p className="user-detail">{user.rut || "Rut no informado"}</p>
          <p className="user-detail">{user.city || "Ciudad no informada"}</p>
          <p className="user-detail">{user.phone || "Teléfono no informado"}</p>
          <p className="user-detail">{user.email || "Correo no informado"}</p>
        </div>
        <div className="user-status">
          <span
            className={`status-indicator ${determineUserStatusClass(
              user.status
            )}`}
          >
            {user.status ? user.status : "Estado no informado"}
          </span>
        </div>
        <div className="user-actions">
          <button
            onClick={() => deleteUser(user.id, user.name)}
            className="btn btn-danger"
          >
            Deshabilitar Usuario
          </button>
          <button className="btn btn-primary">Editar Usuario</button>
        </div>
      </div>
    </div>
  );
}

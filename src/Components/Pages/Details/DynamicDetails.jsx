import { useLocation, useParams } from "react-router-dom";
import { show_alerta } from "../../../Service/shared-state";
import withReactContent from "sweetalert2-react-content";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

// Internal imports
import { formatDate } from "../../../Utils/formatDate.js";
import UserAvatar from "../../../Assets/UserAvatar.png";
import ClientAvatar from "../../../Assets/ClientAvatar.png";

import '../../../Style/Detail.css';

export function DynamicDetails() {

  const location = useLocation();
  const entity = location.state.entity;
  const category = location.state.category;
  const {id} = useParams();

  /*
  const deleteentity = (id, name) => {
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
  */

  /* cliente
      "name": "test",
      "email": "test@test.cl",
      "phone": 123312312,
      "taxId": "test",
      "address": "test",
      "created": "2024-03-01T02:58:37.346839Z",
      "vigency": true
        },
   */

  /* usuario
    "name": "admin",
    "email": "admin@admin.cl",
    "phone": 123,
    "address": "",
    "superAdmin": true,
    "created": "2024-02-28T15:46:49.349254Z",
    "vigency": false
   */



  return (
    <div className="entity-detail-container">
      <div className="entity-detail-card">
        <div className="entity-image">
          <img
            src={category === "user"? UserAvatar : ClientAvatar}
            alt={entity.name || "Usuario"}
            className="rounded-circle"
          />
        </div>
        <div className="entity-info">
          <div className="entity-detail-date">
            <span>Ingresado el: {formatDate(entity.created) || "Fecha no informada"}</span>
          </div>
          <h1 className="entity-name">{entity.name || 
            "Nombre no informado"}</h1>
          <p className="entity-detail">{"Fono: "+ entity.phone || 
            "Teléfono no informado"}</p>
          <p className="entity-detail">{"Correo: "+entity.email 
            || "Correo no informado"}</p>
          {category === 'client'?
            <div>
              <p className="entity-detail">{"Rut: "+entity.taxId || 
                "Rut no informado"}</p>
              <p className="entity-detail">{"Direccion: "+entity.address || 
                "Direccion no informada"}</p>
            </div>
            :
            null
          }
        </div>
        <div className="entity-actions">
          <button
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

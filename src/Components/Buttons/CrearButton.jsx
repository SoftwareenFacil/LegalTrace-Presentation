import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";

import Plus from "../../Assets/Icons/Plus.svg?react";
import Client from "../../Assets/Icons/Client.svg?react";
import Credentials from "../../Assets/Icons/Credentials.svg?react";
import Users from "../../Assets/Icons/Users.svg?react";
import Histories from "../../Assets/Icons/Histories.svg?react";
import Tasks from "../../Assets/Icons/Tasks.svg?react";

// Styles imports
import "../../Style/CrearButton.scss";

function CrearButton({ onFormSubmit, category, CustomModal }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setTitle = (category) => {
    const gender =
      category === "tasks" || category === "credentials" ? "a" : "o";
    const mode = {
      tasks: "Tarea",
      user: "Usuario",
      client: "Cliente",
      credentials: "Credencial",
      payments: "Pago",
    };
    if (category !== "histories") {
      return "nuev" + gender + " " + mode[category];
    } else if (category == "histories") {
      return "en Bitacora";
    }
  };

  const icons = {
    client: Client,
    credentials: Credentials,
    user: Users,
    histories: Histories,
    tasks: Tasks,
    payments: faMoneyBill,
  };

  const iconClass = {
    left: "entity-icon-left",
    right: "entity-icon-right",
  };

  const IconComponent = icons[category];
  const isPayment = category === "payments";

  const selectColor = { credentials: "credentials-color", user: "user-color" };

  return (
    <div className="CrearButton" style={{ padding: 0 }}>
      <div className="d-grid">
        <button
          onClick={handleShow}
          className={`CrearEntity ${selectColor[category]}`}
          style={{ margin: 0 }}
        >
          {isPayment ? (
            <FontAwesomeIcon
              icon={IconComponent}
              className={`crear-icon ${iconClass["left"]}`}
            />
          ) : (
            <IconComponent className={`crear-icon ${iconClass["left"]}`} />
          )}
          <div className="CrearButton-content">
            <div className="CrearButton-text-box">
              <div className="CrearButton-text-lines">
                {category !== "histories" ? "Crear" : "Crear Nota"}
              </div>
              <div className="CrearButton-text-lines">{setTitle(category)}</div>
            </div>
            <Plus />
          </div>
          {isPayment ? (
            <FontAwesomeIcon
              icon={IconComponent}
              className={`crear-icon ${iconClass["right"]}`}
            />
          ) : (
            <IconComponent className={`crear-icon ${iconClass["right"]}`} />
          )}
        </button>

        <CustomModal
          op={"create"}
          category={category}
          show={show}
          onClose={handleClose}
          onFormSubmit={onFormSubmit}
        />
      </div>
    </div>
  );
}

export default CrearButton;

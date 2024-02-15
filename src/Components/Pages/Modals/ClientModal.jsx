// UserModal.jsx
import React from "react";
import Form from 'react-bootstrap/Form';
const ClientModal = ({
  title,
  name,
  setName,
  email,
  setEmail,
  cargo,
  setCargo,
  phone,
  setPhone,
  address,
  setAddress,
  taxId,
  setTaxId,
  vigency,
  setVigency,
  operacion,
  onSave,
}) => {
  return (
    <div id="modalClient" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <label className="h5">{title}</label>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            ></button>
          </div>
          <div className="modal-body">
            <input type="hidden" id="id"></input>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-gift"></i>
              </span>
              <input
                type="text"
                id="nombre"
                className="form-control"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-gift"></i>
              </span>
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-gift"></i>
              </span>
              <input
                type="text"
                id="phone"
                className="form-control"
                placeholder="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-gift"></i>
              </span>
              <input
                type="text"
                id="address"
                className="form-control"
                placeholder="direccion"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-gift"></i>
              </span>
              <input
                type="text"
                id="cargo"
                className="form-control"
                placeholder="cargo"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
              ></input>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-gift"></i>
              </span>
              <input
                type="text"
                id="taxId"
                className="form-control"
                placeholder="rut"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
              ></input>
            </div>
            {operacion === 2?
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Estado Cliente"
              onChange={(e) => setVigency(e.target.value)}
            />
                : null}


            <div className="d-grid col-6 mx-auto">
              <button onClick={onSave} className="btn btn-success"
              data-bs-dismiss="modal">
                <i className="fa-solid fa-floppy-disk"></i> Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientModal;

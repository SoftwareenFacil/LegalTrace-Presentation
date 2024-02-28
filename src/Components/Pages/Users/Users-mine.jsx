import React, { useEffect, useState } from "react";
import { show_alerta } from "../../../Service/shared-state";
import axios from "axios";
import userService from "../../../Service/userService";
import withReactContent from "sweetalert2-react-content";
import UserModal from "../Modals/UserModal";
import Swal from "sweetalert2";
import "../../../Style/TableStyle.css"; // Import the common styles
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faEye,
  faEdit,
  faToggleOn,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import { Route } from "../../../Constants/Constant";

export function Users() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [taxId, setTaxId] = useState("");
  const [password, setPassword] = useState("");
  const [vigency, setVigency] = useState(true);
  const [operacion, setOperacion] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    getUsers();
  }, []);

  const navigate = useNavigate();

  const redirectToUserDetails = (user) => {
    navigate(Route.detailUser + user.id, { state: { user } });
  };

  const getUsers = async () => {
      try {
        const usersData = await userService.fetchData(0);
        setUsers(usersData.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
  };

  const openModal = (op, id, name, email, cargo, phone, address, taxId, 
      password, vigency) => {
    setId("");
    setName("");
    setEmail("");
    setCargo("");
    setPhone("");
    setAddress("");
    setTaxId("");
    setPassword("");
    setVigency(true);
    setOperacion(op);
    if (op === 1) {
      setTitle("Registrar Usuario");
    } else if (op === 2) {
      setTitle("Editar Usuario");
      setId(id);
      setName(name);
      setEmail(email);
      setCargo(cargo);
      setPhone(phone);
      setAddress(address);
      setTaxId(taxId);
      setPassword("");
      setVigency(vigency);
    }
  };
  const validar = async () => {
    var parametros;
    if (name.trim === "") {
      show_alerta("Escribe el nombre");
    } else if (email.trim === "") {
      show_alerta("Escribe el nombre");
    } else if (String(phone).trim === "") {
      show_alerta("Escribe el telefono");
    } else {
      if (operacion === 1) {
        parametros = {
            name: name.trim(),
            email: email.trim(),
            phone: parseInt(String(phone).trim(), 10),
            address: address.trim(),
            taxId: taxId.trim(),
            password: password.trim(),
        };
        await userService.addItem(parametros);
      } else {
        parametros = {
            id: id,
            name: name.trim(),
            email: email.trim(),
            phone: parseInt(String(phone).trim(), 10),
            address: address.trim(),
            password: password.trim(),
            taxId: taxId.trim(),
        };
        await userService.editItem(parametros);
      }
        getUsers();
    }
  };
  const deleteUser = async (id, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Seguro desea eliminar el  Usuario: " + name + "?",
      icon: "question",
      text: "No se podra dar marcha atras",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setId(id);
        try {
            setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== id)
            );

        await userService.deleteItem(id);
        } catch (error) {
            console.error("Error deleting user: ", error);
            show_alerta("Error al eliminar el usuario");
            getUsers();
        }
      } else {
        show_alerta("El usuario no fue eliminado");
      }
    });
  };
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3 d-flex align-items-start">
          <div>
            <div className="d-grid">
              <button
                onClick={() => openModal(1)}
                className="btn CrearUsuario"
                data-bs-toggle="modal"
                data-bs-target="#modalUser"
              >
                {" "}
                Crear Nuevo Usuario<i className="fa-solid fa-circle-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered table-no-border">
              <thead className="table-header">
                <tr>
                  <th></th>
                  <th>Usuario</th>
                  <th>Cargo</th>
                  <th>F.Creación</th>
                  <th>Estado</th>
                  <th>Contacto</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {users.map((user, id) => (
                  <tr key={user.id}>
                    <div
                      className={`UserIconTable ${
                        user.vigency &&
                        user.vigency.replace(/\s/g, "") === "noactivo"
                          ? "inactive"
                          : ""
                      }`}
                    >
                      <i className="fa-solid fa-user me-2"></i>
                    </div>

                    <td>{user.name ? user.name : "No informado"}</td>
                    <td>{user.cargo ? user.cargo: "No informado"}</td>
                    <td>{user.date ? user.date : "No informado"}</td>
                    <td>{user.vigency? "Activo": "No Activo"}</td>
                    <td>{user.phone ? user.phone : "No informado"}</td>
                    <td>{user.email? user.email: "No informado"}</td>
                    <td>
                      <button
                        onClick={() =>
                          openModal(
                            2,
                            user.id,
                            user.name,
                            user.email,
                            user.cargo,
                            user.phone,
                            user.address,
                            user.taxId,
                            user.vigency,
                          )
                        }

                        className="btn btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#modalUser"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                      &nbsp;
                      <button
                        onClick={() => deleteUser(user.id, user.name)}
                        className="btn btn-danger"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                        onClick={() => redirectToUserDetails(user)}
                        className="btn btn-outline-secondary btn-sm ms-2"
                      >
                        <FontAwesomeIcon icon={faEye} /> Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UserModal
        title={title}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        cargo={cargo}
        setCargo={setCargo}
        phone={phone}
        setPhone={setPhone}
        address={address}
        setAddress={setAddress}
        taxId={taxId}
        setTaxId={setTaxId}
        password={password}
        setPassword={setPassword}
        vigency={vigency}
        setVigency={setVigency}
        operacion={operacion}
        onSave={validar}
      />
    </div>
  );
}

export default Users;

import React, { useEffect, useState } from "react";
import { show_alerta } from "../../../Service/shared-state";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import "../../../Style/TableStyle.css";
import SearchBar from "../Searchs/SearchUsers";
import DatePickerFilter from "../Searchs/DatePickerFilter";
import StatusFilter from "../Searchs/StatusFilter";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import UserModal from "../../Modals/UserModal";
import { format } from "date-fns";
import { Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { Mensajes, Formatos, Route } from "../../../Constants/Constant";
import LoadingSpinner from "../../Loading/LoadingSpinner";
import userService from "../../../Service/userService";

export function Users() {

  const [users, setUsers] = useState([]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [taxId, setTaxId] = useState("");
  const [password, setPassword] = useState("");
  const [cargo, setCargo] = useState("");
  const [vigency, setVigency] = useState(true);
  const [superAdmin, setSuperAdmin] = useState(false);

  const [status, setStatus] = useState("");

  const [operacion, setOperacion] = useState("");
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const usersData = await userService.fetchData(0);
        setUsers(usersData.data);
        setFilteredUsers(usersData.data);
        setHasError(false);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (selectedDate) {
      filtered = filtered.filter((user) => {
        if (user.date) {
          const userDate = new Date(user.date);
          return (
            userDate.getDate() === selectedDate.getDate() &&
            userDate.getMonth() === selectedDate.getMonth() &&
            userDate.getFullYear() === selectedDate.getFullYear()
          );
        }
        return false;
      });
    }

    if (filterStatus) {
      filtered = filtered.filter(
        (user) => user.status && user.status.replace(/\s/g, "") === filterStatus
      );
    }

    setFilteredUsers(filtered);
  }, [selectedDate, filterStatus, users]);

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

  const openModal = (op, id, name, email, phone, cargo, vigency, superAdmin) => {
    setId("");
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setCargo("");
    setVigency(true);
    setSuperAdmin(false);
    setOperacion(op);
    if (op === 1) {
      setTitle("Registrar Usuario");
    } else if (op === 2) {
      setTitle("Editar Usuario");
      setId(id);
      setName(name);
      setEmail(email);
      setPhone(phone);
      setPassword("");
      setCargo(cargo);
      setVigency(vigency);
      setSuperAdmin(superAdmin);
    }
  };

  const validar = async () => {
    var parametros;
    var metodo;
    if (name.trim === "") {
      show_alerta("Escribe el nombre");
    } else if (email.trim === "") {
      show_alerta("Escribe el email");
    } else if (String(phone).trim === "") {
      show_alerta("Escribe el telefono");
    } else {
      if (operacion === 1) {
        parametros = {
          name: name.trim(),
          email: email.trim(),
          phone: parseInt(String(phone).trim(), 10),
          password: password.trim(),
          vigency: vigency,
          superAdmin: superAdmin,
        };
        await userService.addItem(parametros);

      } else {
        parametros = {
          id: id,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password: password.trim(),
          vigency: vigency,
          superAdmin: superAdmin,
        };
        await userService.editItem(parametros);
      }
      getUsers();
    }
  };

  const deleteUser = (id, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Seguro desea deshabilitar al Usuario: " + name + "?",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Deshabilitar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "btn btn-danger me-2",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setId(id);
        try {
            setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== id)
            );
            await userService.deleteItem(id);
        } catch (error) {
            show_alerta("Error al eliminar el cliente");
            getUsers();
        }
      } else {
        show_alerta("El usuario no fue deshabilitado");
      }
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const capitalizarPrimeraLetra = (cadena) => {
    return cadena ? cadena.charAt(0).toUpperCase() + cadena.slice(1) : "";
  };
  const formatUserDate = (date) => {
    return date ? format(new Date(date)) : Mensajes.NoInformado;
  };

  const formatUserStatus = (status) => {
    return status ? capitalizarPrimeraLetra(status) : Mensajes.NoInformado;
  };
  const isFilteredUsersEmpty = filteredUsers.length === 0;

  const handleSearch = (searchText) => {
    if (!users || users.length === 0) {
      return;
    }

    const lowercasedFilter = searchText.toLowerCase();
    const filteredData = users.filter((item) => {
      return Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(lowercasedFilter)
      );
    });

    setFilteredUsers(filteredData);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (hasError) {
    return (
      <div className="App">
        <Alert variant="danger" className="mt-3">
          {Mensajes?.ErrorApi}
        </Alert>
      </div>
    );
  }

  const getUserIcon = (vigency) => {
    return vigency? "UserIconTable--active" : "UserIconTable--inactive";
  };

    const tdStyle = {
        display: 'flex',       // Enables flexbox for the td
        flexDirection: 'column', // Stack items vertically
        alignItems: 'center',  // Horizontally centers the items in the flex container
        justifyContent: 'center', // Vertically centers the items in the flex container
        width: '100px',
        margin: 'auto',
    };


    const centeredDivStyle = {
        display: 'table-cell',
          verticalAlign: 'middle',
          textAlign: 'center' // If you also want to center the content horizontally
        };

  return (
    <div className="App">
      <div className="col-md-12">
        <div className="d-grid">
          <button
            onClick={() => openModal(1)}
            className="btn CrearUsuario"
            data-bs-toggle="modal"
            data-bs-target="#modalUser"
          >
            Crear nuevo usuario <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <div className="row filter-container">
        <div className="search-bar">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="status-filter">
          <StatusFilter
            filterStatus={filterStatus}
            handleStatusChange={handleStatusChange}
          />
        </div>
        <div className="date-picker-filter">
          <DatePickerFilter
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </div>
      </div>

      <br></br>
      <br></br>
      {hasError ? (
        <Alert variant="danger" className="mt-3">
          {Mensajes.ErrorApi}
        </Alert>
      ) : (
        <div className="table-responsive">
          {isFilteredUsersEmpty ? (
            <Alert variant="info" className="mt-3">
              {Mensajes.EmptyData}
            </Alert>
          ) : (
            <table className="table table-no-border table-responsive-md">
              <thead className="table-header">
                <tr>
                  <th></th>
                  <th>Usuario</th>
                  <th>Cargo</th>
                  <th>F.Ingreso</th>
                  <th>Estado</th>
                  <th>Contacto</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredUsers.map((user, id) => (
                  <tr key={user.id}>
                    <td>
                    <div
                      className={`${getUserIcon(user.vigency)} d-flex 
                          justify-content-center align-items-center`}
                    >
                      <i className="fa-solid fa-user mt-2"></i>
                    </div>
                    </td>
                    <td>{user.name ? user.name: Mensajes.NoInformado}</td>
                    <td>{user.cargo ? user.cargo : Mensajes.NoInformado}</td>
                    <td>{formatUserDate(user.date)}</td>
                    <td>
                      {user.vigency ? (
                          <Button
                            variant="success"
                            size="sm"
                            className="w-100"
                            disabled
                          >
                            {"Activo"}
                          </Button>
                        ) : (
                          <Button
                            variant="danger"
                            size="sm"
                            className="w-100"
                            disabled
                          >
                            {"No Activo"}
                          </Button>
                        )
                      }
                    </td>

                    <td style={centeredDivStyle}>
                        {user.email && user.phone? 
                            <>
                                <div style={tdStyle}>
                                <div style={{lineHeight: '1em'}}>{user.phone}</div>
                                <div style={{lineHeight: '1em'}}>{user.email}</div>
                                </div>
                            </>
                            : <div>No informado</div>
                        }
                    </td>
                    <td>
                      <div className="edit-button mt-0">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="custom-edit-button"
                          onClick={() =>
                            openModal(
                              2,
                              user.id,
                              user.name,
                              user.email,
                              user.phone,
                              user.cargo,
                              user.vigency,
                              user.superAdmin
                            )
                          }
                          data-bs-toggle="modal"
                          data-bs-target="#modalUser"
                        >
                          Editar

                        </Button>
                        <div className="btn-container d-grid ">
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-100 ver-button"
                            onClick={() => redirectToUserDetails(user)}
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              className="icon-spacing"
                            />{" "}
                            Ver
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="w-100 custom-disable-button"
                            onClick={() => deleteUser(user.id, user.name)}
                          >
                            Deshabilitar
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
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
        superAdmin={superAdmin}
        setSuperAdmin={setSuperAdmin}
        operacion={operacion}
        onSave={validar}
      />
    </div>
  );
}

export default Users;

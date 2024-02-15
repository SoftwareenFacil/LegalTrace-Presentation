import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import UserModal from "../Modals/UserModal";
import { format } from "date-fns";
import { Alert } from "react-bootstrap";
import { Mensajes, Route } from "../../../Constants/Constant";
import LoadingSpinner from "../LoadingSpinner";
import DatePickerFilter from "../Searchs/DatePickerFilter"; 
import "../../../Style/TableStyle.css";


export function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [cargo, setCargo] = useState("");
  const [superAdmin, setSuperAdmin] = useState("");
  const [operacion, setOperacion] = useState("");
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    let filtered = tasks;

    if (selectedDate) {
      filtered = filtered.filter((task) => {
        if (task.date) {
          const taskDate = new Date(task.date);
          return (
            taskDate.getDate() === selectedDate.getDate() &&
            taskDate.getMonth() === selectedDate.getMonth() &&
            taskDate.getFullYear() === selectedDate.getFullYear()
          );
        }
        return false;
      });
    }

    if (filterStatus) {
      filtered = filtered.filter(
        (task) => task.status && task.status.replace(/\s/g, "") === filterStatus
      );
    }

    setFilteredTasks(filtered);
  }, [selectedDate, filterStatus, tasks]);

  const navigate = useNavigate();

  const redirectToTaskDetails = (task) => {
    navigate(Route.detailTask + task.id, { state: { task } });
  };

  const openModal = (op, id, name, email, status, cargo, phone, superAdmin) => {
    setId("");
    setName("");
    setEmail("");
    setStatus("");
    setCargo("");
    setPhone("");
    setSuperAdmin("");
    setOperacion(op);
    if (op === 1) {
      setTitle("Registrar Tarea");
    } else if (op === 2) {
      setTitle("Editar Tarea");
      setId(id);
      setName(name);
      setEmail(email);
      setStatus(status);
      setCargo(cargo);
      setPhone(phone);
      setSuperAdmin(superAdmin);
    }
  };

  const validar = () => {
  };

  const deleteTask = (id, name) => {
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
  const formatTaskDate = (date) => {
    return date ? format(new Date(date)) : Mensajes.NoInformado;
  };

  const formatTaskStatus = (status) => {
    return status ? capitalizarPrimeraLetra(status) : Mensajes.NoInformado;
  };
  const isFilteredTasksEmpty = filteredTasks.length === 0;

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="d-grid">
              <button
                onClick={() => openModal(1)}
                className="btn CrearVerde"
                data-bs-toggle="modal"
                data-bs-target="#modalUser"
              >
                Crear nueva tarea <i className="fa-solid fa-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">

          <div className="col-md-4">
            <DatePickerFilter
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
            />
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      {hasError ? (
        <Alert variant="danger" className="mt-3">
          {Mensajes?.ErrorApi}
        </Alert>
      ) : (
        <div className="table-responsive">
          {isFilteredTasksEmpty ? (
            <Alert variant="info" className="mt-3">
              {Mensajes.EmptyData}
            </Alert>
          ) : (
            <table className="table table-no-border table-responsive-md">
              <thead className="table-header">
                <tr>
                  <th></th>
                  <th>Tarea</th>
                  <th>Rut</th>
                  <th>F.Creación</th>
                  <th>Estado</th>
                  <th>Contacto</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredTasks.map((task, id) => (
                  <tr key={task.id}>
                    <div
                      className={`UserIconTable ${
                        task.status &&
                        task.status.replace(/\s/g, "") === "noactivo"
                          ? "inactive"
                          : ""
                      }`}
                    >
                      <i className="fa-solid fa-user me-2"></i>
                    </div>
                    <td>{task.name ? task.name : Mensajes.NoInformado}</td>
                    <td>{task.rut ? task.rut : Mensajes.NoInformado}</td>
                    <td>{formatTaskDate(task.date)}</td>
                    <td>
                      {task.status ? (
                        task.status.replace(/\s/g, "") === "Activo" ? (
                          <Button
                            variant="success"
                            size="sm"
                            className="w-100"
                            disabled
                          >
                            {capitalizarPrimeraLetra(task.status)}
                          </Button>
                        ) : (
                          <Button
                            variant="danger"
                            size="sm"
                            className="w-100"
                            disabled
                          >
                            {formatTaskStatus(task.status)}
                          </Button>
                        )
                      ) : (
                        <span>{Mensajes.NoInformado}</span>
                      )}
                    </td>

                    <td>{task.phone}</td>
                    <td>
                      <div className="edit-button mt-0">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="custom-edit-button"
                          onClick={() =>
                            openModal(
                              2,
                              task.id,
                              task.name,
                              task.email,
                              task.phone,
                              task.status,
                              task.cargo,
                              task.superAdmin
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
                            onClick={() => redirectToTaskDetails(task)}
                          >
                            <FontAwesomeIcon icon={faEye} className="me-1" />
                            Ver
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="w-100 custom-disable-button"
                            onClick={() => deleteTask(task.id, task.name)}
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
        onSave={validar}
        onClose={() => {}}
      />
    </div>
  );
}

export default Tasks;

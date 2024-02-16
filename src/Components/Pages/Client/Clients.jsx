import React, { useEffect, useState } from "react";
import { show_alerta } from "../../../Service/shared-state";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import "../../../Style/TableStyle.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faEye,
  faEdit,
  faToggleOn,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import { Route } from "../../../Constants/Constant";
import UserModal from "../Modals/UserModal";
import SearchBar from "../Searchs/SearchUsers";
import StatusFilter from "../Searchs/StatusFilter";
import DatePickerFilter from "../Searchs/DatePickerFilter";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "../LoadingSpinner";
import clientService from "../../../Service/clientService";
import DynamicTable from "../../Tables/DynamicTable";

export function Clients() {
  const [clients, setClients] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [status, setStatus] = useState("");

  const [cargo, setCargo] = useState("");
  const [address, setAddress] = useState("");
  const [taxId, setTaxId] = useState("");
  const [vigency, setVigency] = useState(true);
  const [operacion, setOperacion] = useState("");

  const [title, setTitle] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const minLoadingTime = new Promise((resolve) =>
          setTimeout(resolve, 200)
        );
        await minLoadingTime;
        const clientsData = await clientService.fetchData(0);
        setClients(clientsData.data);
        setHasError(false);
      } catch (error) {
        console.error("Error cargando los datos de los clientes:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    let filtered = clients;

    if (selectedDate) {
      filtered = filtered.filter((client) => {
        const clientDate = new Date(client.date);
        return (
          clientDate.getDate() === selectedDate.getDate() &&
          clientDate.getMonth() === selectedDate.getMonth() &&
          clientDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    }

    if (filterStatus) {
      filtered = filtered.filter(
        (client) =>
          client.status && client.status.replace(/\s/g, "") === filterStatus
      );
    }

    setFilteredClients(filtered);
  }, [selectedDate, filterStatus, clients]);

  const getClients = async () => {
      try {
        const clientsData = await clientService.fetchData(0);
        setClients(clientsData.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
  };

  const openModal = (op, id, name, email, cargo, phone, address, taxId, vigency) => {
    setId("");
    setName("");
    setEmail("");
    setCargo("");
    setPhone("");
    setAddress("");
    setTaxId("");
    setOperacion(op);
    setVigency(true);
    if (op === 1) {
      setTitle("Registrar Cliente");
    } else if (op === 2) {
      setTitle("Editar Cliente");
      setId(id);
      setName(name);
      setEmail(email);
      setCargo(cargo);
      setPhone(phone);
      setAddress(address);
      setTaxId(taxId);
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
        };
        await clientService.addItem(parametros);
      } else {
        parametros = {
            id: id,
            name: name.trim(),
            email: email.trim(),
            phone: parseInt(String(phone).trim(), 10),
            address: address.trim(),
            taxId: taxId.trim(),
            vigency: vigency,
        };
        await clientService.editItem(parametros);
      }
        getClients();
    }
  };

    /*
    const lowercasedFilter = searchText.toLowerCase();
    const filteredData = clients.filter((item) => {
      return Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(lowercasedFilter)
      );
    });

    setFilteredClients(filteredData);
  };
  */

  const deleteClient = async (id, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Seguro desea eliminar el Cliente: ${name}?`,
      icon: "question",
      text: "No se podrá dar marcha atrás",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setId(id);
        try {
            setClients((prevClients) =>
            prevClients.filter((client) => client.id !== id)
            );

        await clientService.deleteItem(id);
        } catch (error) {
            console.error("Error deleting client: ", error);
            show_alerta("Error al eliminar el cliente");
            getClients();
        }
      } else {
        show_alerta("El Cliente no fue eliminado");
      }
    });
  };

  const getBriefcaseClass = (vigency) => {
    return vigency? "briefcase-icon--active" : "briefcase-icon--inactive";
  };

  const redirectToUserDetails = (user) => {
    navigate(Route.detailClient + user.id, { state: { user } });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const clientAttributes = [
    { key: 'name', label: 'Cliente' },
    { key: 'taxId', label: 'RUT' },
    { key: 'dat', label: 'F. Creacion' },
    { key: 'vigency', label: 'Estado' },
    { key: 'contacto', label: 'Contacto' },
  ];
  
  if (hasError) {
    return (
      <div className="App">
        <div className="alert alert-danger" role="alert">
          Hubo un error al cargar los datos de los clientes.
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3 d-flex align-items-start">
          <div>
            <div className="d-grid">
              <button
                onClick={() => openModal(1)}
                className="btn CrearCliente" // Apply the common styles
                data-bs-toggle="modal"
                data-bs-target="#modalUser"
              >
                {" "}
                Crear Nuevo Cliente<i className="fa-solid fa-circle-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <DynamicTable 
        data={clients}
        attributes={clientAttributes}
        category={'client'}
      />
    </div>
  );
}

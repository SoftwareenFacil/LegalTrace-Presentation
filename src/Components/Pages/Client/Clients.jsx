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
import SearchBar from "../Searchs/SearchUsers";
import StatusFilter from "../Searchs/StatusFilter";
import DatePickerFilter from "../Searchs/DatePickerFilter";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "../../Loading/LoadingSpinner";
import clientService from "../../../Service/clientService";

// Internal imports
import DynamicTable from "../../Tables/DynamicTable";
import DynamicModal from  "../../Modals/DynamicModal";
import CrearButton from "../../Buttons/CrearButton";
import {getClients} from "../../../Utils/getEntity";
import { emptyData } from "../../Alerts/emptyData";

export function Clients() {
  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);

  const category = 'client';
  const [id, setId] = useState('');
  /*
  const [title,  setTitle] = useState('');
  const [op, setOp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [taxId, setTaxId] = useState('');
  const [password, setPassword] = useState('');
  const [vigency, setVigency] = useState('');
  */

  const [status, setStatus] = useState("");

  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");

  const navigate = useNavigate();

  const fetchClients = async () => {
    const data = await getClients(); 
      try {
        if (data === null)
        {
          setEmpty(true);
          setError(false);
        }
        else {
          setClients(data);
          setEmpty(false);
          setError(false);
        }
      }
      catch(error) {
        setError(true);
        setEmpty(false);
      }
  };
    /*
    setLoading(true);
      const minLoadingTime = new Promise((resolve) =>
        setTimeout(resolve, 200)
      );
      await minLoadingTime;
      */
      /*
      const data = await getClients(); 
      setClients(data);
      setError(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setEmpty(true);
        setError(false);
      } else {
        setError(true);
        setEmpty(false);
      }
    } finally {
      setLoading(false);
    }
    */


  useEffect(() => {
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

  const disableClietn = async (id, name) => {
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
            getClients(clients, setClients);
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

  if (loading) {
    return <LoadingSpinner />;
  }

  const clientAttributes = [
    { key: 'name', label: 'Cliente' },
    { key: 'taxId', label: 'RUT' },
    { key: 'created', label: 'F. Creacion' },
    { key: 'vigency', label: 'Estado' },
    { key: 'contacto', label: 'Contacto' },
  ];
  
  if (error) {
    return (
      <div className="App">
        <div className="alert alert-danger" role="alert">
          Hubo un error al cargar los datos de los clientes.
        </div>
      </div>
    );
  }
  
  const renderEmpty = (value) => (
    <div>No hay clientes registrados.</div>
  );

    const handleFormSubmit = () => {
    fetchClients();
  };


  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3 d-flex align-items-start">
          <CrearButton onFormSubmit={handleFormSubmit} category={category}
              CustomModal={DynamicModal}/>
        </div>
        </div>
        {empty? (emptyData(empty)): (
          <DynamicTable 
            data={clients}
            attributes={clientAttributes}
            category={category}
            onFormSubmit={handleFormSubmit}
            CustomModal={DynamicModal}
            />
        )}

    </div>
  );
}


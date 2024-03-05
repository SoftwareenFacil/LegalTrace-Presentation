import { useState, useEffect, useCallback } from "react";
import { Button, Container, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

// Internal imports
import TasksModal from '../../Modals/TasksModal';
import DynamicTable from '../../Tables/DynamicTable';
import DropdownMonth from '../../Dropdowns/DropdownMonth'; 
import LoadingIndicator from "../../Loading//LoadingIndicator";
import EmptyData from '../../Alerts/EmptyData';
import { getTasks } from '../../../Utils/getEntity';
import { fetchEntities } from '../../../Utils/fetchEntities';
import { delay } from '../../../Utils/delay';

// Styles imports
import "../../../Style/Home.css";

export function Home() {
  const [message, setMessage] = useState('');

  const handleButtonClick = (status) => {
    setMessage(`Mostrando tareas ${status}`);
  };


  const loadTasks = useCallback(async () => {
    await fetchEntities(
      {id: 0},
      getTasks,
      setTasks,
      setLoading,
      setError,
      setEmpty
    );
  }, []);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage(''); 
      }, 3000); 
      return () => clearTimeout(timeout);
    }
    loadTasks();
    setTasksPending(countPending(tasks));
  }, [loadTasks]);


  const countPending = (data) => 
    data.filter(item => item.vigency === false).length;

  // Tasks for the counter
  const [tasksPending, setTasksPending] = useState('');

  const [tasks, setTasks] = useState([]);

  const handleRefresh = () => {
    loadTasks();
  };
  
  // Managing data retrieval
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const tasksAttributes = [
    { key: 'clientId', label: 'Cliente' },
    { key: 'type', label: 'Tarea' },
    { key: 'userId', label: 'Usuario' },
    { key: 'created', label: 'F. Inicio' },
    { key: 'vigency', label: 'Estado' },
    { key: 'title', label: 'Nombre' },
  ];

  const category = 'tasks';
  
  return (
    <Container fluid className="home-container">
      <Row>
        <Col md={6} className="p-0">
          <Button
            className="banner-button left-button"
            onClick={() => handleButtonClick('pendientes')}
          >
          <div style={{ display: 'table-row' }}>
              <p>Tareas Terminadas de la Semana{tasksPending}</p>
              <p className="ver-terminados">Ver Más</p>
          </div>

          </Button>
        </Col>
        <Col md={6} className="p-0">
          <Button
            className="banner-button right-button"
            onClick={() => handleButtonClick('terminadas')}
          >
            <div>
              <p>Tareas Terminadas de la Semana</p>
              <p className="ver-terminados">Ver Más</p>
            </div>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="message-display">{message}</div>
        </Col>
      </Row>
      <Row className="my-3 justify-content-end">
        <Col xs="auto">
          <Button variant="outline-secondary" className="repeat-task-button">
            <FontAwesomeIcon icon={faCalendarAlt} />
            {' '}Tareas Repetitivas
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col xs="auto" className="px-1">
          <DropdownMonth/>
        </Col>
        <Col xs="auto" className="px-1">
          <DropdownButton title="Año" variant="outline-secondary" id="dropdown-year" className="filter-dropdown">
            <Dropdown.Item eventKey="1">2023</Dropdown.Item>
            <Dropdown.Item eventKey="2">2024</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col xs="auto" className="px-1">
          <DropdownButton title="Estado" variant="outline-secondary" id="dropdown-status" className="filter-dropdown">
            <Dropdown.Item eventKey="1">Pendiente</Dropdown.Item>
            <Dropdown.Item eventKey="2">Terminado</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col xs="auto" className="px-1">
          <Button variant="outline-secondary" id="filter" className="filter-button">
          <FontAwesomeIcon icon={faBars}  />
          {' '}Filtro
          </Button>
        </Col>
      </Row>
     
      {loading ? (
          <LoadingIndicator isLoading={loading}/>
        ) : empty? (
            EmptyData(empty)
        ) : (
            <DynamicTable 
                data={tasks}
                attributes={tasksAttributes}
                category={category}
                onFormSubmit={handleRefresh}
                CustomModal={TasksModal}
                />
        )}

    </Container>
  );
}

import { useState, useEffect, useCallback } from "react";
import { Button, Container, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';

// Internal imports
import TasksModal from '../../Modals/TasksModal';
import DynamicTable from '../../Tables/DynamicTable';
import DropdownMonth from '../../Dropdowns/DropdownMonth'; 
import LoadingIndicator from "../../Loading//LoadingIndicator";
import EmptyData from '../../Alerts/EmptyData';
import DualButton from '../../Buttons/DualButton'; 
import RepetitiveTasks from '../../Buttons/RepetitiveTasks';
import { getTasks } from '../../../Utils/getEntity';
import { fetchEntities } from '../../../Utils/fetchEntities';
import { delay } from '../../../Utils/delay';
import {getUsers} from '../../../Utils/getEntity'; 
import {tasksAttributes} from '../../../Constants/entityAttributes.js';

// Styles imports
import "../../../Style/Home.css";

export function Home() {

  // Managing data retrieval
  const [tasks, setTasks] = useState([]);
  const [params, setParams] = useState({id: 0});
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(async () => {
    await fetchEntities(
      params,
      getTasks,
      setTasks,
      setLoading,
      setError,
      setEmpty
    );
  }, [params]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleRefresh = () => {
    loadTasks();
  };

  const category = 'tasks';

  return (
    <Container fluid style={{justifyContent: 'center'}}>
      <Row> 
        <DualButton/> 
      </Row>
      <Row className="my-3 justify-content-end">
        <Col xs="auto">
          <RepetitiveTasks/>
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
     
      <Row style={{justifyContent: 'center'}}>
      {loading ? (
          <LoadingIndicator isLoading={loading}/>
        ) : empty? (
            <EmptyData empty={empty}/>
        ) : (
            <DynamicTable 
                data={tasks}
                attributes={tasksAttributes}
                category={category}
                onFormSubmit={handleRefresh}
                CustomModal={TasksModal}
                />
        )}
      </Row>

    </Container>
  );
}

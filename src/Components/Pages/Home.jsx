import { useState, useEffect} from "react";
import { Button, Container, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "../../Style/Home.css";

export function Home() {
  const [message, setMessage] = useState('');

  const handleButtonClick = (status) => {
    setMessage(`Mostrando tareas ${status}`);
  };

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage(''); 
      }, 3000); 
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <Container fluid className="home-container">
      <Row>
        <Col md={6} className="p-0">
          <Button
            className="banner-button left-button"
            onClick={() => handleButtonClick('pendientes')}
          >
            <div>
              <p>Tareas Pendientes en la Semana</p>
              <p className="ver-pendientes">Ver Más</p>
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
          <DropdownButton title="Mes" variant="outline-secondary" id="dropdown-month" className="filter-dropdown">
            <Dropdown.Item eventKey="1">Enero</Dropdown.Item>
            <Dropdown.Item eventKey="2">Febrero</Dropdown.Item>
            <Dropdown.Item eventKey="3">Marzo</Dropdown.Item>
            <Dropdown.Item eventKey="4">Abril</Dropdown.Item>
            <Dropdown.Item eventKey="5">Mayo</Dropdown.Item>
            <Dropdown.Item eventKey="6">Junio</Dropdown.Item>
            <Dropdown.Item eventKey="7">Julio</Dropdown.Item>
            <Dropdown.Item eventKey="8">Agosto</Dropdown.Item>
            <Dropdown.Item eventKey="9">Septiembre</Dropdown.Item>
            <Dropdown.Item eventKey="10">Octubre</Dropdown.Item>
            <Dropdown.Item eventKey="11">Noviembre</Dropdown.Item>
            <Dropdown.Item eventKey="12">Diciembre</Dropdown.Item>
          </DropdownButton>
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
    </Container>
  );
}
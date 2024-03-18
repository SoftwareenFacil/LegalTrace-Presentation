
import { DropdownButton, Dropdown } from "react-bootstrap";

const DropdownMonth = () => {
  return (
    <>
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
    </>
  );
};

export default DropdownMonth;

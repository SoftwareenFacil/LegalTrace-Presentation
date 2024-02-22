import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,
  Button,
  Container,
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSearch,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../../App.scss";

const NavbarCont = ({ setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("superadmin");
    Cookies.remove("email");

    setIsAuthenticated(false);

    navigate("/");
  };
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand href="/">
            <img
              src="/images/icono.png"
              alt="Logo"
              className="navbar-logo"
              // Ajusta los estilos del logo según sea necesario
            />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Input
                  type="search"
                  name="search"
                  id="navbarSearch"
                  placeholder="Buscar tarea"
                />
              </NavItem>
              <NavItem>
                <Button color="secondary" className="search-button">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </NavItem>
              <NavItem className="d-flex align-items-center">
                <NavLink href="/admin">
                  <FontAwesomeIcon icon={faUser} /> Admin
                </NavLink>
              </NavItem>
              <NavItem>
                <Button color="danger" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faDoorOpen} /> Salir
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarCont;

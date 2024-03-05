import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Form,
  Input,
} from "reactstrap";
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
    <Navbar light expand="lg" className="navbar">
      <div className="logonavbar-container">
        <img
          src="/images/icono.png"
          alt="Logo"
          className="LegalContLogo"
        />
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <Form className="buscar-navbar">
            <div className="input-group">
              <FontAwesomeIcon icon={faSearch} className="nav-search" />
              <Input
                type="text"
                placeholder="    Buscar tarea"
                className="placeholder-tarea"
              />
            </div>
          </Form>

          <Nav className="nav-right" navbar>
            <NavItem>
              <NavLink href="#" className="nav-link">
                <FontAwesomeIcon icon={faUser} className="admin-icon" />
                Admin
              </NavLink>
            </NavItem>
            <NavItem>
              <span className="divider">|</span>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={handleLogout} className="nav-link nav-salir">
                Salir <FontAwesomeIcon icon={faDoorOpen} className="nav-salir-button" />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
};

export default NavbarCont;

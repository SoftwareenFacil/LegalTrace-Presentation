import React, { useState,useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Row, Container, Button } from "react-bootstrap";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

import { ReactComponent as Tasks } from '../../Assets/Icons/Tasks.svg';
import TasksModal from "../Modals/TasksModal.jsx";
import { sidebarLinks } from "../../Constants/Constant";

import '../../Style/Sidebar.scss';
import '../../Style/Buttons/CrearTareaButton.scss';


const Sidebar = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");


  const [show, setShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // let decoded = null;
  // let isAdmin = false;
  // if (typeof token === 'string') {
  //   try {
  //     decoded = jwtDecode(token);
  //     isAdmin = decoded.SuperAdmin === "True";
  //   } catch (error) {
  //     console.error('Error decoding token:', error);
  //      navigate('/login');
  //   }
  // } else {
  //   console.error('Invalid token: must be a string');
  //    navigate('/login'); 
  // }
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          // Token expirado
          Cookies.remove("token");
          navigate('/login');
        } else {
          setIsAdmin(decoded.SuperAdmin === "True");
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        Cookies.remove("token");
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [token, navigate]);




  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const redirect = () => {
    navigate('/Tareas');
  };

  const sidebarRow = (link) => { 
    return (
      <NavLink to={link.to}>
        <div className="nav-link">
          {link.icon}
          <span className="nav-text">{link.text}</span>
        </div>
      </NavLink>
    );
  };

  return (
    <div className="sidebar bg-light p-0">
      <Container>
        <Row>
          <ul> 
            {sidebarLinks.map((link, index) => (
              <li key={index}>
                {link.text === 'Usuarios' ? (
                  isAdmin && sidebarRow(link)
                ) : sidebarRow(link)
                }
              </li>
            ))}
          </ul>
        </Row>

        <Row>
          <Button className="botonTarea" onClick={handleShow}>
            <div className="boton-content">
              <Tasks className="icon"/>
              <div className="boton-text">
                <div>Crear</div>
                <div>Tarea</div>
              </div>
            </div>
          </Button>
        </Row>
        <Row>
          <div className="LegalContSideBar">
            <img src="/images/logoEnFacil.png" alt="LogoFacil" />
          </div>
        </Row>
      </Container>

      <TasksModal op={'create'} category={'tasks'} show={show}
        onClose={handleClose} onFormSubmit={redirect}/>
    </div>
  );
};

export default Sidebar;

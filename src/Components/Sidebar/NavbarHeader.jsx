import React, { useEffect, useState } from "react";
import { Collapse, Navbar, Nav, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSearch,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// Internal imports
import { logout } from "../../Utils/logout.js";
import { getUsers } from "../../Utils/getEntity.js";
import SearchTask from "../Searchs/SearchTask.jsx";

// Styles imports
import "./NavbarHeader.scss";

const NavbarHeader = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(setIsAuthenticated);
    navigate("/login");
  };

  const [user_name, setUser_name] = useState("");

  useEffect(() => {
    const setUsername = async () => {
      const email_login = Cookies.get("email");
      const response = await getUsers({ email: email_login });
      setUser_name(response[0].name);
    };
    setUsername();
  }, []);

  return (
    <header className="navbar-header">
      <nav className="navbar-content">
        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src="/images/icono.png" alt="Logo" />
        </div>
        <div className="search-bar">
          <SearchTask />
        </div>
        <div className="user-section">
          <span className="user-name">
            <FontAwesomeIcon icon={faUser} /> {user_name}
          </span>
          <span className="divider">|</span>
          <span className="logout" onClick={handleLogout}>
            Salir <FontAwesomeIcon icon={faDoorOpen} />
          </span>
        </div>
      </nav>
    </header>
  );
};

export default NavbarHeader;

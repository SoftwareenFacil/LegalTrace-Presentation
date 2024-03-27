// Sidebar.jsx 

// External imports
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

// Internal imports
import { sidebarLinks } from "../../Constants/Constant";

// Styles imports
import '../../Style/Sidebar.scss';


const Sidebar = () => {

  const token = Cookies.get("token");
  const decoded = jwtDecode(token);
  const isAdmin = decoded.SuperAdmin === "True";


  return (
    <div className="sidebar bg-light p-0">
      <ul>
        {sidebarLinks.map((link, index) => (
          <li key={index}>
          {link.text === 'Usuarios' ? (
            isAdmin && (
              <NavLink
                to={link.to}
                exact
                className="text-warning rounded py-2 w-100 d-inline-block"
                activeClassName="active"
              >
                {link.icon}
                <span className="ms-2">{link.text}</span>
              </NavLink>
            )
          ) : (
            <NavLink
              to={link.to}
              exact
              className="text-warning rounded py-2 w-100 d-inline-block"
              activeClassName="active"
            >
              {link.icon}
              <span className="ms-2">{link.text}</span>
            </NavLink>
          )}
          </li>
        ))}
      </ul>

      <Button className="btn botonTarea">
        <FaIcons.FaFileAlt />
        <span>
          Crear <br />
          Tarea
        </span>
      </Button>
      <div className="LegalContSideBar">
        <img src="/images/logoEnFacil.png" alt="LogoFacil" />
      </div>
    </div>
  );
};

export default Sidebar;

import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { sidebarLinks } from "../../Constants/Constant";
import * as FaIcons from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar bg-light col-2 p-0">
      <ul>
        {sidebarLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.to}
              exact
              className="text-warning rounded py-2 w-100 d-inline-block"
              activeClassName="active"
            >
              {link.icon}
              <span className="ms-2">{link.text}</span>
            </NavLink>
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

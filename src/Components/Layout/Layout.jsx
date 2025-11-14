// Layout.jsx

import NavbarHeader from "../Sidebar/NavbarHeader.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";

// Styles imports
import "../../App.scss";

const Layout = ({ children, setIsAuthenticated }) => {
  return (
    <>
      <NavbarHeader setIsAuthenticated={setIsAuthenticated} />
      <div className="main-content">
        <Sidebar />
        <div className="content-container">{children}</div>
      </div>
    </>
  );
};

export default Layout;

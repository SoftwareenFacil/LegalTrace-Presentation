// Layout.jsx

import NavbarHeader from "../Sidebar/NavbarHeader.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";

// Styles imports
import "../../App.scss";

const Layout = ({ children, setIsAuthenticated }) => {
  return (
    <>
      <NavbarHeader setIsAuthenticated={setIsAuthenticated} />
      <div className="container-fluid main-content">
        <div className="row">
          <div className="col-2 sidebar-container">
            <Sidebar />
          </div>
          <div className="col-10 content-container">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;

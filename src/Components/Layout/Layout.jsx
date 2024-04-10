// Layout.jsx

import NavbarCont from '../Sidebar/NavbarCont.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';

// Styles imports
import '../../App.js'; 

const Layout = ({ children, setIsAuthenticated }) => {
  return (
    <>
      <NavbarCont setIsAuthenticated={setIsAuthenticated} />
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

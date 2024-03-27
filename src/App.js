// External imports
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cookies from 'js-cookie';

// Styles imports
import "./App.scss";


//---------PAGES---------
import { Home } from "./Components/Pages/Home/Home.jsx";
import { LoginPage } from "./Components/Pages/Login/LoginPage.jsx";
import { EntityPage } from './Components/Pages/Entity/EntityPage.jsx';
import { Histories } from './Components/Pages/Histories/Histories.jsx';
import { DynamicDetails } from "./Components/Pages/Details/DynamicDetails.jsx";
//---------PAGES---------

//---------BARS---------
import NavbarCont from "./Components/Sidebar/NavbarCont.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
//---------BARS---------

//---------FUNCTIONS---------
import {
  getClients,
  getUsers,
  getTasks,
  getCredentials,
  getPayments
} from './Utils/getEntity.js';
import { logout } from './Utils/logout.js';
//---------GET_FUNCTIONS---------

//---------ROUTE_GUARDS---------
import PrivateRoute from "./Components/Guards/PrivateRoute.jsx";
import AdminRoute from "./Components/Guards/AdminRoute.jsx";
//---------ROUTE_GUARDS---------


//---------CONSTANTS---------
import {
  clientsAttributes,
  usersAttributes,
  tasksAttributes,
  credentialsAttributes,
  paymentsAttributes
} from './Constants/entityAttributes.js';
import { placeholderText } from './Constants/Constant.jsx';
//---------CONSTANTS---------

//---------MODALS---------
import DynamicModal from './Components/Modals/DynamicModal.jsx';
import TasksModal from './Components/Modals/TasksModal.jsx';
import CredentialsModal from './Components/Modals/CredentialsModal.jsx';
import PaymentsModal from './Components/Modals/PaymentsModal.jsx';
//---------MODALS---------

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user_name, setUser_name] = useState(''); 

  useEffect(() => {
    const setUsername = async () => {
      const email_login = Cookies.get('email');
      const response = await getUsers({'email': email_login});
      console.log(response);
      setUser_name(response.name);
    };
    setUsername();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route element={<PrivateRoute />}>
            <Route
              path="/"
              element={
                <>
                  <NavbarCont setIsAuthenticated={user_name, setIsAuthenticated} />
                  <div className="container">
                    <div className="row">
                      <div className="col-2">
                        <Sidebar />
                      </div>
                      <div className="content col-10">
                        <Home />
                      </div>
                    </div>
                  </div>
                </>
              }
            />
            <Route
              path="/Clientes"
              element={
                <>
                  <NavbarCont setIsAuthenticated={setIsAuthenticated} />
                  <div className="container">
                    <div className="row">
                      <div className="col-2">
                        <Sidebar />
                      </div>
                      <div className="content col-10">
                        <EntityPage
                          key="client"
                          category="client"
                          getFunction={getClients}
                          attributes={clientsAttributes}
                          EntityModal={DynamicModal}
                          placeholderText={placeholderText.clients}
                        />
                      </div>
                    </div>
                  </div>
                </>
              }
            />
            <Route
              path="/Tareas"
              element={
                <>
                  <NavbarCont setIsAuthenticated={setIsAuthenticated} />
                  <div className="container">
                    <div className="row">
                      <div className="col-2">
                        <Sidebar />
                      </div>
                      <div className="content col-10">
                        <EntityPage
                          key="tasks"
                          category="tasks"
                          getFunction={getTasks}
                          attributes={tasksAttributes}
                          EntityModal={TasksModal}
                        />
                      </div>
                    </div>
                  </div>
                </>
              }
            />
            <Route
              path="/Credenciales"
              element={
                <>
                  <NavbarCont setIsAuthenticated={setIsAuthenticated} />
                  <div className="container">
                    <div className="row">
                      <div className="col-2">
                        <Sidebar />
                      </div>
                      <div className="content col-10">
                        <EntityPage
                          key="credentials"
                          category="credentials"
                          getFunction={getCredentials}
                          attributes={credentialsAttributes}
                          EntityModal={CredentialsModal}
                          placeholderText={placeholderText.credentials}
                        />
                      </div>
                    </div>
                  </div>
                </>
              }
            />
            <Route
              path="/Pagos"
              element={
                <>
                  <NavbarCont setIsAuthenticated={setIsAuthenticated} />
                  <div className="container">
                    <div className="row">
                      <div className="col-2">
                        <Sidebar />
                      </div>
                      <div className="content col-10">
                        <EntityPage
                          key="payments"
                          category="payments"
                          getFunction={getPayments}
                          attributes={paymentsAttributes}
                          EntityModal={PaymentsModal}
                          placeholderText={placeholderText.payments}
                        />
                      </div>
                    </div>
                  </div>
                </>
              }
            />
            <Route
              path="/Bitacoras"
              element={
                <>
                  <NavbarCont setIsAuthenticated={setIsAuthenticated} />
                  <div className="container">
                    <div className="row">
                      <div className="col-2">
                        <Sidebar />
                      </div>
                      <div className="content col-10">
                        <Histories />
                      </div>
                    </div>
                  </div>
                </>
              }
            />
            <Route
              path="/Detalles/:id"
              element={
                <>
                  <NavbarCont setIsAuthenticated={setIsAuthenticated} />
                  <div className="container">
                    <div className="row">
                      <div className="col-2">
                        <Sidebar />
                      </div>
                      <div className="content col-10">
                        <DynamicDetails />
                      </div>
                    </div>
                  </div>
                </>
              }
            />
            <Route element={<AdminRoute />}>
              <Route
                path="/Usuarios"
                element={
                  <>
                    <NavbarCont setIsAuthenticated={setIsAuthenticated} />
                    <div className="container">
                      <div className="row">
                        <div className="col-2">
                          <Sidebar />
                        </div>
                        <div className="content col-10">
                          <EntityPage
                            key="user"
                            category="user"
                            getFunction={getUsers}
                            attributes={usersAttributes}
                            EntityModal={DynamicModal}
                            placeholderText={placeholderText.users}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                }
              />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

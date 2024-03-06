import "./App.scss";
import { Formulario } from "./Components/Formulario/Formulario.jsx";
import NavbarCont from "./Components/Sidebar/NavbarCont.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Components/Pages/Home/Home.jsx";

import { Clients } from "./Components/Pages/Clients/Clients.jsx";
import { Users } from "./Components/Pages/Users/Users.jsx";
import { Tasks } from './Components/Pages/Tasks/Tasks.jsx';
import { Credentials } from './Components/Pages/Credentials/Credentials.jsx';

// Entity page
import { EntityPage } from './Components/Pages/Entity/EntityPage.jsx';
import { getClients, getUsers, getTasks, getCredentials } 
  from './Utils/getEntity.js';
import {  clientsAttributes, usersAttributes, tasksAttributes, 
          credentialsAttributes} from './Constants/entityAttributes.js';
import DynamicModal from './Components/Modals/DynamicModal.jsx';
import TasksModal from './Components/Modals/TasksModal.jsx';
import CredentialsModal from './Components/Modals/CredentialsModal.jsx';

import { Histories } from './Components/Pages/Histories/Histories.jsx';
import { DynamicDetails } from "./Components/Pages/Details/DynamicDetails.jsx";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";

function App() {
  const [user, setUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);
  

  const handleLoginSuccess = (email) => {
    console.log("Login Success. Email:", email);
    setIsAuthenticated(true);
  };

  const renderProtectedContent = () => (
    <>
      <NavbarCont setIsAuthenticated={setIsAuthenticated} />

      <div className="container">
        <div className="row">
          <div className="col-2">
            <Sidebar/>
          </div>

          <div className="content col-10">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/users" exact element={
                <EntityPage 
                  category="user"
                  getFunction={getUsers}
                  attributes={usersAttributes}
                  EntityModal={DynamicModal}
                />
              }/>

              <Route path="/clients" exact element={
                <EntityPage 
                  category="client"
                  getFunction={getClients}
                  attributes={clientsAttributes}
                  EntityModal={DynamicModal}
                />
              }/>

              <Route path="/Tareas" exact element={
                <EntityPage 
                  category="tasks"
                  getFunction={getTasks}
                  attributes={tasksAttributes}
                  EntityModal={TasksModal}
                />
              }/>

              <Route path="/Credenciales" exact element={
                <EntityPage 
                  category="credentials"
                  getFunction={getCredentials}
                  attributes={credentialsAttributes}
                  EntityModal={CredentialsModal}
                />
              }/>

              <Route path="/Bitacoras" exact element={<Histories/>} />

              <Route path="/Detalles/:id" exact element={<DynamicDetails/>} />}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <Router>
      {isAuthenticated ? (
        renderProtectedContent()
      ) : (
        <Formulario onLoginSuccess={handleLoginSuccess} />
      )}
    </Router>
  );
}

export default App;

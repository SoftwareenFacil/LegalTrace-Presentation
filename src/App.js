import "./App.scss";
import { Formulario } from "./Components/Formulario/Formulario.jsx";
import NavbarCont from "./Components/Sidebar/NavbarCont.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Clients } from "./Components/Pages/Client/Clients.jsx";
import { Home } from "./Components/Pages/Home/Home.jsx";
import { Users } from "./Components/Pages/User/Users.jsx";
import { Tasks } from './Components/Pages/Tasks/Tasks.jsx';
import { Credentials } from './Components/Pages/Credentials/Credentials.jsx';
import { UserDetail } from "./Components/Pages/User/UserDetail.jsx";
import { ClientDetail } from "./Components/Pages/Client/ClientDetail.jsx";
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
          <Sidebar className="col-2" />

          <div className="content col-10">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/users" exact element={<Users />} />
              <Route path="/clients" exact element={<Clients />} />
              <Route path="Tareas" exact element={<Tasks/>} />
              <Route path="/Credenciales" exact element={<Credentials/>} />
              <Route path="/user-detail/:id" exact element={<UserDetail />} />
              <Route path="/client-detail/:id" exact element={<ClientDetail />} />
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

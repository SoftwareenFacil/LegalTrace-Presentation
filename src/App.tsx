// External imports
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Styles imports
import "./App.scss";

import Layout from "./Components/Layout/Layout";

//---------PAGES---------
import { Home } from "./Components/Pages/Home/Home";
import { LoginPage } from "./Components/Pages/Login/LoginPage";
import { EntityPage } from "./Components/Pages/Entity/EntityPage";
import { Histories } from "./Components/Pages/Histories/Histories";
import { DynamicDetails } from "./Components/Pages/Details/DynamicDetails";
//---------PAGES---------

//---------FUNCTIONS---------
import {
  getClients,
  getUsers,
  getTasks,
  getCredentials,
  getPayments,
} from "./Utils/getEntity";
//---------GET_FUNCTIONS---------

//---------ROUTE_GUARDS---------
import PrivateRoute from "./Components/Guards/PrivateRoute";
import AdminRoute from "./Components/Guards/AdminRoute";
//---------ROUTE_GUARDS---------

//---------CONSTANTS---------
import {
  clientsAttributes,
  usersAttributes,
  tasksAttributes,
  credentialsAttributes,
  paymentsAttributes,
} from "./Constants/entityAttributes";
import { placeholderText } from "./Constants/Constant";
//---------CONSTANTS---------

//---------MODALS---------
import DynamicModal from "./Components/Modals/DynamicModal";
import TasksModal from "./Components/Modals/TasksModal";
import CredentialsModal from "./Components/Modals/CredentialsModal";
import PaymentsModal from "./Components/Modals/PaymentsModal";
import Reporting from "./Components/Pages/Reporting/Reporting";
//---------MODALS---------

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", String(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
          />
          {/* @ts-expect-error */}
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route
              path="/"
              element={
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <Home />
                </Layout>
              }
            />

            <Route
              path="/Clientes"
              element={
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <EntityPage
                    key="client"
                    category="client"
                    getFunction={getClients}
                    attributes={clientsAttributes}
                    EntityModal={DynamicModal}
                    placeholderText={placeholderText.clients}
                  />
                </Layout>
              }
            />

            <Route
              path="/Tareas"
              element={
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <EntityPage
                    key="tasks"
                    category="tasks"
                    getFunction={getTasks}
                    attributes={tasksAttributes}
                    EntityModal={TasksModal}
                    placeholderText={placeholderText.task}
                  />
                </Layout>
              }
            />

            <Route
              path="/Credenciales"
              element={
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <EntityPage
                    key="credentials"
                    category="credentials"
                    getFunction={getCredentials}
                    attributes={credentialsAttributes}
                    EntityModal={CredentialsModal}
                    placeholderText={placeholderText.credentials}
                  />
                </Layout>
              }
            />

            <Route
              path="/Pagos"
              element={
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <EntityPage
                    key="payments"
                    category="payments"
                    getFunction={getPayments}
                    attributes={paymentsAttributes}
                    EntityModal={PaymentsModal}
                    placeholderText={placeholderText.payments}
                  />
                </Layout>
              }
            />

            <Route
              path="/Bitacoras"
              element={
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <Histories />
                </Layout>
              }
            />

            <Route
              path="/Detalles/:category/:id"
              element={
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <DynamicDetails />
                </Layout>
              }
            />
            {/* @ts-expect-error */}
            <Route element={<AdminRoute isAuthenticated={isAuthenticated} />}>
              <Route
                path="/Usuarios"
                element={
                  <Layout setIsAuthenticated={setIsAuthenticated}>
                    <EntityPage
                      key="user"
                      category="user"
                      getFunction={getUsers}
                      attributes={usersAttributes}
                      EntityModal={DynamicModal}
                      placeholderText={placeholderText.users}
                    />
                  </Layout>
                }
              />
            </Route>

            <Route
              path="/Reportería"
              element={
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <Reporting />
                </Layout>
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;

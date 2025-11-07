// External imports
import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Styles imports
import "./App.scss";

import Layout from "./Components/Layout/Layout";
import LoadingSpinner from "./Components/Loading/LoadingSpinner";

//---------PAGES---------
const Home = lazy(() =>
  import("./Components/Pages/Home/Home").then((module) => ({
    default: module.Home,
  }))
);
const LoginPage = lazy(() =>
  import("./Components/Pages/Login/LoginPage").then((module) => ({
    default: module.LoginPage,
  }))
);
const EntityPage = lazy(() =>
  import("./Components/Pages/Entity/EntityPage").then((module) => ({
    default: module.EntityPage,
  }))
);
const Histories = lazy(() =>
  import("./Components/Pages/Histories/Histories").then((module) => ({
    default: module.Histories,
  }))
);
const DynamicDetails = lazy(() =>
  import("./Components/Pages/Details/DynamicDetails").then((module) => ({
    default: module.DynamicDetails,
  }))
);
const Reporting = lazy(() => import("./Components/Pages/Reporting/Reporting"));
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
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
      </div>
    </Router>
  );
}
export default App;

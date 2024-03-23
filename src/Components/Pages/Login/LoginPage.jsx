// LoginPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
  Alert,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../Style/Login/Login.css";
import Login from "../../../Service/loginService";
import Cookies from "js-cookie";
import LoadingSpinner from "../../Loading/LoadingSpinner";

export function LoginPage({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
      return;
    }

    setError(false);
    setIsLoading(true);

    try {
      const response = await Login(email, password);

      if (response && response.success) {
        const expirationDays = 1;
        Cookies.set("token", response.message, { expires: expirationDays });
        //Cookies.set("superadmin", response.SuperAdmin, { expires: expirationDays });
        Cookies.set("email", response.email, { expires: expirationDays });

        //------ MOMENTARY FORCING SUPERADMIN, BACK SHOULD SET THE COOKIE
        //------ MOMENTARY FORCING SUPERADMIN, BACK SHOULD SET THE COOKIE
        //------ MOMENTARY FORCING SUPERADMIN, BACK SHOULD SET THE COOKIE
        const isSuperAdmin = true; 
        Cookies.set("superadmin", isSuperAdmin, { expires: expirationDays });
        //------ MOMENTARY FORCING SUPERADMIN, BACK SHOULD SET THE COOKIE
        //------ MOMENTARY FORCING SUPERADMIN, BACK SHOULD SET THE COOKIE
        //------ MOMENTARY FORCING SUPERADMIN, BACK SHOULD SET THE COOKIE

        setIsAuthenticated(true);
        navigate("/");
      } else {
        setLoginError(response.message || "Error al iniciar sesión, intente nuevamente.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Ha ocurrido un error, intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="form-container">
      <Row className="form-row">
        <Col md={7} className="logo-col">
          <div className="mb-3">
            <img src="/images/icono.png" alt="Logo" className="img-fluid LegalContLogo" />
          </div>
          <div className="position-absolute bottom-0 start-0 d-none d-md-block">
            <img src="/images/logoEnFacil.png" alt="LogoFacil" className="img-fluid enFacil" />
          </div>
        </Col>
        <Col md={5} className="form-col">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text id="basic-addon1" className="bg-orange border-0 position-relative">
                    <FontAwesomeIcon icon={faUser} className="custom-icon" />
                  </InputGroup.Text>
                  <FormControl
                    type="email"
                    placeholder="Usuario"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-0 custom-input"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text id="basic-addon2" className="bg-orange border-0">
                    <FontAwesomeIcon icon={faLock} className="custom-icon" />
                  </InputGroup.Text>
                  <FormControl
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-0 custom-input"
                  />
                </InputGroup>
              </Form.Group>
              <Button type="submit" className="btn btn-orange w-100 text-white fw-bold">
                Entrar
              </Button>
              {loginError && (
                <Alert variant="danger" className="error-alert mt-3">
                  {loginError}
                </Alert>
              )}
            </Form>
          )}
          {error && (
            <Alert variant="danger" className="error-alert mt-3">
              ¡Todos los campos son obligatorios!
            </Alert>
          )}
        </Col>
      </Row>
      <div className="martillo">
        <img
          src="/images/martillo.png"
          alt="Logo"
          className="rounded mt-auto ml-auto img-fluid"
          style={{
            width: "250px",
            height: "auto",
            maxWidth: "100%",
          }}
        />
      </div>
    </Container>
  );
}

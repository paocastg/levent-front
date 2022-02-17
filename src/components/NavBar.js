import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Button, Dropdown } from "react-bootstrap";
import leventLogo from "../assets/logo.png";
import useAuth from "../auth/useAuth";
import { BsPersonCircle } from "react-icons/bs";

export default function NavBar() {
  const auth = useAuth();
  const { userLogin } = auth;

  const handleLogOut = (e) => {
    e.preventDefault();
    auth.logout();
  };
  return (
    <>
      <Navbar bg="light" variant="light" expand="md">
        <Container fluid className="container">
          <Navbar.Brand as={Link} to="/">
            <img src={leventLogo} alt="" width="100" height="50" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="navbar-nav ml-auto">
              <Nav.Link as={Link} to="/">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/categories">
                Proveedores
              </Nav.Link>
              {userLogin?.username ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      className="nav-link border-0"
                    >
                      <BsPersonCircle
                        className="mx-2 d-inline-block  align-baseline"
                        id="username-menu"
                      />
                      {userLogin?.username}
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                      <Dropdown.Item
                        as={Link}
                        to="/profile"
                        id="my-profile-button"
                      >
                        Mi Perfil
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/myposts"
                        id="my-posts-button"
                      >
                        Mis Anuncios
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogOut} id="logout-button">
                        Cerrar Sesión
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button
                    className="mx-2"
                    variant="secondary"
                    as={Link}
                    to="/create"
                  >
                    Crear Anuncio
                  </Button>
                </>
              ) : (
                <div>
                  <Button
                    className="mx-2"
                    variant="secondary"
                    as={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    className="mx-2"
                    variant="light"
                    as={Link}
                    to="/signup"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

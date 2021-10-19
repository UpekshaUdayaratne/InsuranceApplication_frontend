import React from "react";
import { Route, Switch, useLocation } from "react-router";
import "./App.css";
import Home from "./pages/HomePage";
import CustomerDetails from "./pages/CustomerDetails";
import PolicyPlans from "./pages/PolicyPlans";
import InsuranceClaims from "./pages/InsuranceClaims";
import AddClaim from "./pages/AddClaim";
import axios from "axios";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

axios.defaults.baseURL = "http://127.0.0.1:8080/";

function App() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" && (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand href="#home">
              Insurance Management System
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/CustomerDetails">Customers</Nav.Link>
                <Nav.Link href="/PolicyPlans">Policies</Nav.Link>
                <NavDropdown title="Claims">
                  <NavDropdown.Item href="/InsuranceClaims">
                    View Claims
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/InsuranceClaims/AddClaim">
                    Create Claims
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/CustomerDetails" exact>
          <CustomerDetails />
        </Route>
        <Route path="/PolicyPlans" exact>
          <PolicyPlans />
        </Route>
        <Route path="/InsuranceClaims" exact>
          <InsuranceClaims />
        </Route>
        <Route path="/InsuranceClaims/AddClaim" exact>
          <AddClaim />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import Home from "./pages/HomePage";
import CustomerDetails from "./pages/CustomerDetails";
import PolicyPlans from "./pages/PolicyPlans";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8080/";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/CustomerDetails">
        <CustomerDetails />
      </Route>
      <Route path="/PolicyPlans">
        <PolicyPlans />
      </Route>
    </Switch>
  );
}

export default App;

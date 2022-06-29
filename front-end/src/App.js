import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NotFoundPage from "../src/pages/404/NotFoundPage.jsx";
import LoginFormik from "./components/login";
import DashboardPage from "./dashboard/DashboardPage.jsx";
import { useSelector } from "react-redux";

function App() {
  let loggedIn = true;
  const list = useSelector((store) => store.user);
  localStorage.setItem("token", list.access_token);

  const token = localStorage.getItem("token");

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {loggedIn ? (
            <Redirect from="/" to="/dashboard" />
          ) : (
            <Redirect from="/" to="/login" />
          )}
        </Route>
        <Route exact path="/login" component={LoginFormik} />]
        <Route exat path="/dashboard">
          {loggedIn ? <DashboardPage /> : <Redirect from="/" to="/login" />}
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;

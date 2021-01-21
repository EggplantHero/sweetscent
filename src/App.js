import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import auth from "./services/authService";
import NavBar from "./components/navBar";
import Pokes from "./components/pokes";
import ProtectedRoute from "./components/common/protectedRoute";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container-fluid">
          <Switch>
            <ProtectedRoute path="/home" component={Pokes} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Resetpassword from "./components/auth/ResetPassword";
import Newpassword from "./components/auth/NewPassword";
import Myschedule from "./components/user/MySchedule";
import MyEventTypes from "./components/user/MyEventTypes";
import AddType from "./components/user/AddType";
import Dashboard from "./components/user/Dashboard";
import AddSchedule from "./components/user/AddSchedule";

import "./App.css";

// check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout User
    store.dispatch(logoutUser);
    // TODO: clear curretn profile
    store.dispatch(clearCurrentProfile);
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/resetpassword" component={Resetpassword} />
              <Route exact path="/newpassword" component={Newpassword} />

              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/addtype" component={AddType} />
                <PrivateRoute
                  exact
                  path="/myeventstypes"
                  component={MyEventTypes}
                />
                <PrivateRoute exact path="/myschedule" component={Myschedule} />
                <PrivateRoute
                  exact
                  path="/addschedule"
                  component={AddSchedule}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

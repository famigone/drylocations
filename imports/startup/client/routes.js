import React from "react";

import { createBrowserHistory } from "history";
import App from "../../ui/App.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Home from "../../ui/Dashboard/Home.jsx";
import TagHome from "../../ui/Component/TagHome.jsx";

import SensorParam from "/imports/ui/Component/SensorParam.jsx";
import EventHome from "/imports/ui/Component/events/EventHome.jsx";
import LoginForm from "../../ui/Component/LoginForm.jsx";
import {
  Router,
  Route,
  IndexRoute,
  Switch,
  Redirect,
  useParams
} from "react-router-dom";
const browserHistory = createBrowserHistory();
export const requireAuth = (nextState, replace) => {
  // No user is authenticated redirect ro index
  return Meteor.user() === null;
};
function ChildSensor() {
  let { codigo, tag } = useParams();
  return <SensorParam codigo={codigo} tag={tag} />;
}

export const Ruteador = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <PrivateRoute>
        <App>
          <Route exact path="/tags">
            <TagHome />
          </Route>
          <Route exact path="/mosquitto" component={EventHome} />

          <Route
            exact
            path="/sensorhome/:codigo/:tag"
            children={<ChildSensor />}
          />
        </App>
      </PrivateRoute>
      {requireAuth ? <Redirect to="/login" /> : <App />}

      <Route exact path="/login" component={LoginForm} />
    </Switch>
  </Router>
);

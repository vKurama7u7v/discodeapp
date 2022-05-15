import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import routes from "./routes";
import { map } from "lodash";

import Loading from "../../screens/components/Loading/Loading.jsx";
import Navbar from "../../screens/components/Navbars/NavbarApp/NavbarApp.jsx";

export default function Navigation() {
  const { auth } = useAuth();
  const { username, id } = auth;
  return (
    <Router>
      <Navbar />
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <Redirect exact from="/login" to="/dashboard" />
        <Redirect exact from="/register" to="/dashboard" />
        <Redirect exact from="/users/activate/:token" to="/dashboard" />
        <Redirect exact from="/users/password/forget" to="/dashboard" />
        <Redirect exact from="/users/password/forget/:token" to="/dashboard" />

        {map(routes, (route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <React.Suspense fallback={<Loading />}>
                <route.component username={username} id={id} {...props} />
              </React.Suspense>
            )}
          />
        ))}
      </Switch>
    </Router>
  );
}

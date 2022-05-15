import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import routes from "./routes";
import { map } from "lodash";

import Loading from "../../screens/components/Loading/Loading.jsx";

export default function Navigation() {
  return (
    <Router>
      <Switch>
        {map(routes, (route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <React.Suspense fallback={<Loading />}>
                <route.component {...props} />
              </React.Suspense>
            )}
          />
        ))}
      </Switch>
    </Router>
  );
}

import React, { useState, useEffect, useMemo } from "react";
import { Redirect } from "react-router-dom";

import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";

import { getToken, decodeToken, removeToken } from "./utils/token.utils";
import AuthContext from "./context/auth.context";

import AuthNav from "./routes/auth/Navigation.jsx";
import AppNav from "./routes/app/Navigation.jsx";

function App({ history }) {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = getToken();
    console.log(token);
    if (!token) {
      setAuth(null);
    } else {
      setAuth(decodeToken(token));
    }
  }, []);

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = (user) => {
    setAuth(user);
  };

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <AuthNav /> : <AppNav />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;

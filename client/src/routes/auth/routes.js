/* ===== AUTH + INDEX ===== */
import React, { lazy, Suspense } from "react";

/*COMPONENTES APP*/
const Index = lazy(() => import("../../screens/app/Index.jsx"));

/*COMPONENTES AUTH*/
const Register = lazy(() => import("../../screens/auth/Register.jsx"));
const Login = lazy(() => import("../../screens/auth/Login.jsx"));
const Activate = lazy(() => import("../../screens/auth/Activate.jsx"));
const Forget = lazy(() => import("../../screens/auth/Forget.jsx"));
const Reset = lazy(() => import("../../screens/auth/Reset.jsx"));

/*COMPONENTES*/
const PageNotFound = lazy(() =>
  import("../../screens/components/PageNotFound/PageNotFound")
);

const routes = [
  { path: "/", component: Index, exact: true },
  { path: "/register", component: Register, exact: true },
  { path: "/login", component: Login, exact: true },
  { path: "/users/activate/:token", component: Activate, exact: true },
  { path: "/users/password/forget", component: Forget, exact: true },
  { path: "/users/password/forget/:token", component: Reset, exact: true },

  { component: PageNotFound },
];

export default routes;

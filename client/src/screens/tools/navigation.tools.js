import { map } from "lodash";

// * ===== OBTENER SECCIÓN DE LA URL ===== *
export const getUrlComponent = (url) => {
  const _split = url.split("/");
  const response = _split[1];

  return response.toString();
};

// * ===== CREAR ARRAY DE PATHNAMES ===== *
export const setPathnames = () => {
  const pathnames = [
    { pathname: "dashboard", active: false, class: "" },
    { pathname: "comunidad", active: false, class: "" },
    { pathname: "retos", active: false, class: "" },
    { pathname: "codesandbox", active: false, class: "" },
    { pathname: "profile", active: false, class: "" },
    { pathname: "settings", active: false, class: "" },
  ];

  return pathnames;
};

// * ===== ESTABLECER ESTADOS ACTIVOS DE PATHNAMES ===== *
export const updatePathnames = (input) => {
  const pathnames = setPathnames();

  pathnames.map(function (dato) {
    if (input === dato.pathname) {
      dato.active = true;
      dato.class = "active";
    }

    return dato;
  });

  return pathnames;
};

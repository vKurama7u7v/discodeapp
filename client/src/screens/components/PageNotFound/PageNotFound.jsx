import React from "react";

import { injectStyle } from "react-toastify/dist/inject-style";
import "./error404.styles.css";

const PageNotFound = () => {
  injectStyle();

  /* ===== COMPONENTE ===== */
  return <div className="cuerpo">Error 404</div>;
};

export default PageNotFound;

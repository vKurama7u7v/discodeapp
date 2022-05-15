import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Redirect, Link } from "react-router-dom";

import { injectStyle } from "react-toastify/dist/inject-style";
import "./loading.styles.css";

const Loading = () => {
  injectStyle();

  /* ===== COMPONENTE ===== */
  return (
    <div className="cuerpo">
      <div className="loading__bg">
        <div className="loader">
          <span className="loader__item"></span>
          <span className="loader__item"></span>
          <span className="loader__item"></span>
          <span className="loader__item"></span>
          <span className="loader__item"></span>
          <span className="loader__item"></span>
          <span className="loader__item"></span>
          <span className="loader__item"></span>
          <span className="loader__item"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;

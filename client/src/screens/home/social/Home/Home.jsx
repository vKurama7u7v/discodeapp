import React from "react";
import { Link } from "react-router-dom";

import Feed from "./Components/Feed.jsx";

import "../../zhome.styles.css";
import "./home.styles.css";

export default function Home() {
  return (
    <div className="cuerpo header__navbarapp-cuerpo">
      <main className="main__home-social">
        <Feed />
      </main>
    </div>
  );
}

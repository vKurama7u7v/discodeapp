import React from "react";

import Compilador from "../Compilador/Compilador.jsx";

export default function TabPaneCompiler(props) {
  const { showCompilador, data } = props;

  return (
    <div
      className={showCompilador ? "tab-pane active" : "tab-pane"}
      id="compilador"
    >
      <Compilador data={data} />
    </div>
  );
}

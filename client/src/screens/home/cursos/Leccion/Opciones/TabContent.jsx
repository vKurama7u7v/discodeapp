import React from "react";

import TabPaneLeccion from "./TabContent/TabPaneLeccion.jsx";
import TabPaneCompiler from "./TabContent/TabPaneCompiler.jsx";
export default function TabPaneSlider(props) {
  const { showLeccion, showCompilador, data, idCurso } = props;
  const size = data.slides.length;

  return (
    <div className="tab-content">
      <TabPaneLeccion
        showLeccion={showLeccion}
        data={data.slides}
        size={size}
        idCurso={idCurso}
      />
      <TabPaneCompiler
        showCompilador={showCompilador}
        data={data.compiler ? data.compiler : ""}
      />
    </div>
  );
}

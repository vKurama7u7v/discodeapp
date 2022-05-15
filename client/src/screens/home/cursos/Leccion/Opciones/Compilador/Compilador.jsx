import React from "react";

import "./compilador.styles.css";

export default function Compilador(props) {
  const { data } = props;

  const onSetCode = () => {
    const iFrame = document.getElementById("oc-editor");
    iFrame.contentWindow.postMessage(
      {
        eventType: "populateCode",
        language: data ? data.language_name : "javascript",
        files: data.code
          ? [
              {
                content: data.code,
              },
            ]
          : [
              {
                content: "// No hay código",
              },
            ],
      },
      "*"
    );
  };

  const onLoad = () => {
    onSetCode();
  };

  return (
    <div className="compiler" id="compiler__leccion">
      <iframe
        id="oc-editor"
        src="https://onecompiler.com/embed/python?hideTitle=true&amp;codeChangeEvent=true&amp;listenToEvents=true&amp;hideLanguageSelection=true&amp;hideNew=true"
        width="100%"
        height="100%"
        frameBorder="0"
        className="codesandbox"
        onLoad={onLoad}
      ></iframe>
    </div>
  );
}

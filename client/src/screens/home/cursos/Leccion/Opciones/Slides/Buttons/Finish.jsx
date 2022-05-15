import React from "react";

export default function Finish(props) {
  const { onFinish, index, size } = props;
  console.log(index, size);
  return (
    <>
      {index === size ? (
        <button id="next" className="reset finish" onClick={onFinish}>
          <span>Finalizar</span>
          <i className="uil uil-check-circle"></i>
        </button>
      ) : null}
    </>
  );
}

import React from "react";

export default function NextSlide(props) {
  const { nextSlide, index, size } = props;
  return (
    <>
      {index === size ? null : (
        <button id="next" className="reset next" onClick={nextSlide}>
          <span>Siguiente</span>
          <i className="uil uil-angle-right-b"></i>
        </button>
      )}
    </>
  );
}

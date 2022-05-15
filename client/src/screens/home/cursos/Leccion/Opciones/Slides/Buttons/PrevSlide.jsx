import React from "react";

export default function PrevSlide(props) {
  const { prevSlide, index } = props;
  return (
    <>
      {index === 0 ? null : (
        <button id="previous" className="reset previous" onClick={prevSlide}>
          <i className="uil uil-angle-left-b"></i>
          <span>Anterior</span>
        </button>
      )}
    </>
  );
}

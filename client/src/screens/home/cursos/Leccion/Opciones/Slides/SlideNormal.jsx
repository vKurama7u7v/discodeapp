import React from "react";

// ESTILOS
import "./zslides.styles.css";

// BOTONES
import NextSlide from "./Buttons/NextSlide.jsx";
import PrevSlide from "./Buttons/PrevSlide.jsx";
import Speaker from "./Buttons/Speaker.jsx";
import Copy from "./Buttons/Copy.jsx";
import Finish from "./Buttons/Finish.jsx";

export default function SlideNormal(props) {
  const {
    id,
    title,
    content,
    image,
    index,
    nextSlide,
    prevSlide,
    onFinish,
    showSlide,
    size,
  } = props;
  return (
    <div
      className={
        showSlide === index ? "slide active slide-normal" : "slide slide-normal"
      }
      id={id}
    >
      <div className="contenido">
        <div className="left">
          <h1>
            {index + 1}. {title}
          </h1>
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <div className="right">
          <img className="show__img" src={image} alt="imagen" height="50px" />
        </div>
      </div>
      <hr />
      <div className="funciones">
        <div className="left">
          {/* <Speaker /> */}
          {/* <Copy /> */}
        </div>
        <div className="right">
          <PrevSlide prevSlide={prevSlide} index={index} />
          <NextSlide nextSlide={nextSlide} index={index} size={size} />
          <Finish onFinish={onFinish} index={index} size={size} />
        </div>
      </div>
    </div>
  );
}

import React from "react";

// ESTILOS
import "./zslides.styles.css";

// BOTONES
import NextSlide from "./Buttons/NextSlide.jsx";
import PrevSlide from "./Buttons/PrevSlide.jsx";
import Finish from "./Buttons/Finish.jsx";

export default function SlideVideo(props) {
  const { id, url, index, nextSlide, prevSlide, onFinish, showSlide, size } =
    props;

  return (
    <div
      className={
        showSlide === index ? "slide active slide-video" : "slide slide-video"
      }
      id={id}
    >
      <div className="contenido">
        <div className="video-container">
          <iframe
            id="video-player"
            width="100%"
            height="100%"
            src={url}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <hr />
      <div className="funciones">
        <div className="left"></div>
        <div className="right">
          <PrevSlide prevSlide={prevSlide} index={index} />
          <NextSlide nextSlide={nextSlide} index={index} size={size} />
          <Finish onFinish={onFinish} index={index} size={size} />
        </div>
      </div>
    </div>
  );
}

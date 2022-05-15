import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { size, map } from "lodash";

import Swal from "sweetalert2/dist/sweetalert2";

import SlideNormal from "../Slides/SlideNormal.jsx";
import SlideVideo from "../Slides/SlideVideo.jsx";
import ProgressBar from "../ProgressBar/Progress.jsx";

export default function TabPaneLeccion(props) {
  const history = useHistory();
  const { showLeccion, data, size, idCurso } = props;
  const [showSlide, setShowSlide] = useState(0);

  const nextSlide = () => {
    if (!(showSlide === size - 1)) {
      setShowSlide(showSlide + 1);
    }
  };

  const prevSlide = () => {
    if (!(showSlide === 0)) {
      setShowSlide(showSlide - 1);
    }
  };

  const onFinish = () => {
    Swal.fire({
      title: "¿Quieres Finalizar está Lección?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Si, Finalizar",
      cancelButtonText: "Regresar",
    }).then(async (result) => {
      if (result.value) {
        history.push(`/dashboard/curso/${idCurso}`);
      }
    });
  };

  const getTypeSlide = (data, index) => {
    const { id, name, content, url, code } = data;
    const { type_slide } = data;

    if (type_slide === "slide-normal") {
      return setSlideNormal(id, name, content, url, index);
    } else if (type_slide === "slide-video") {
      return setSlideVideo(id, url, index);
    }
  };

  const setSlideNormal = (id, name, content, url, index) => {
    return (
      <SlideNormal
        id={id}
        title={name}
        content={content}
        image={url}
        index={index}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        onFinish={onFinish}
        showSlide={showSlide}
        size={size - 1}
      />
    );
  };

  const setSlideVideo = (id, url, index) => {
    return (
      <SlideVideo
        id={id}
        url={url}
        index={index}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        onFinish={onFinish}
        showSlide={showSlide}
        size={size - 1}
      />
    );
  };

  return (
    <div className={showLeccion ? "tab-pane active" : "tab-pane"} id="leccion">
      <section className="slider-progress">
        <ProgressBar data={data} size={size} showSlide={showSlide} />
      </section>
      <section className="slider-container">
        <div className="slider-content">
          {data.length === 0
            ? null
            : map(data, (item, index) => getTypeSlide(item, index))}
        </div>
      </section>
    </div>
  );
}

import React from "react";
import { useParams } from "react-router-dom";

import "../../zhome.styles.css";
import "./curso.styles.css";

import Details from "./Details.jsx";

export default function Curso() {
  const { id } = useParams();
  return (
    <>
      <Details getCursoId={id} />
    </>
  );
}

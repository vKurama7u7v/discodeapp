import React from "react";
import { useParams } from "react-router-dom";
import Post from "./Post.jsx";

import "./publication.styles.css";
import "../../../zhome.styles.css";

export default function PublicationPV() {
  const { publication } = useParams();
  return (
    <>
      <Post idPost={publication} />
    </>
  );
}

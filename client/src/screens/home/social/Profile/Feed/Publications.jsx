import React from "react";
import { Link } from "react-router-dom";
import { map } from "lodash";

export default function Publications(props) {
  const { getPublications } = props;
  return (
    <div className="feed__content">
      {getPublications.length === 0 ? (
        <h1>No hay publicaciones</h1>
      ) : (
        <div className="feed__wrapper">
          {map(getPublications, (item) => (
            <Link to={`/comunidad/publication/${item.id}`} className="post">
              <img src={item.file} alt="" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { size, map } from "lodash";

export default function GridCursos(props) {
  const { data, loading } = props;

  if (loading) return null;

  const ItemCurso = (item) => {
    return (
      <Link className="item" to={`/dashboard/curso/${item.id}`}>
        <div className="thumbnail">
          <img src={item.thumbnail} alt="" height="50px" />
        </div>

        <div className="category">
          <span>{item.category}</span>
        </div>

        <div className="description">
          <h3 className="name">{item.name}</h3>
          <div className="puntuacion">
            <span>5</span>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="section__cursos">
      <h1 className="title">Cursos</h1>
      <div className="grid__cursos">
        {data.length === 0 ? (
          <h1>No hay cursos</h1>
        ) : (
          map(data, (item) => ItemCurso(item))
        )}
      </div>
    </div>
  );
}

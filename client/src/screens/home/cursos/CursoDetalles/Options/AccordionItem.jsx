import React, { useState } from "react";
import { size, map } from "lodash";
import { Link } from "react-router-dom";

export default function AccordionItem(props) {
  const { data, id } = props;
  const [showTema, setShowTema] = useState(false);

  const onSetShow = () => {
    if (showTema) {
      setShowTema(false);
    } else {
      setShowTema(true);
    }
  };

  const ItemLeccion = (data, idCurso, idTema) => {
    return (
      <ul>
        <li>
          <Link
            id={data.id}
            to={`/dashboard/curso/${idCurso}/tema/${idTema}/leccion/${data.id}`}
          >
            <div className="vinyeta"></div>
            <h3>{data.name}</h3>
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <>
      <div
        className={showTema ? "accordion-item active" : "accordion-item"}
        onClick={onSetShow}
        id={data.id}
      >
        <div className="accordion-link">
          <div>{data.name}</div>
          <i class="fa-solid fa-plus"></i>
        </div>
        <div className="accordion-content">
          {data.lecciones.length === 0
            ? null
            : map(data.lecciones, (item) => ItemLeccion(item, id, data.id))}
        </div>
      </div>
    </>
  );
}

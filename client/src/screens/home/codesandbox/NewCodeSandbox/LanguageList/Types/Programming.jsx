import React from "react";
import { size, map } from "lodash";

export default function Programming(props) {
  const { programming } = props;

  if (size(programming) === 0) return null;

  return (
    <>
      <div className="lenguage_container">
        <p className="label_title">Lenguajes de Programación</p>
        <div className="lenguage_grid">
          {map(programming, (item) => (
            <label htmlFor={item.language} className="item">
              <input
                type="radio"
                name="language"
                id={item.language}
                value={item.language}
                className="input_checkbox"
              />
              <div className="checkmark"></div>
              <div className="div-flex">
                <div className="item__icon">
                  <img src={item.icon} alt="" height="35px" />
                </div>
                <div className="item__text">{item.name}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}

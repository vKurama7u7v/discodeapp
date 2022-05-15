import React from "react";
import { map } from "lodash";

export default function Progress(props) {
  const { data, size, showSlide } = props;
  console.log(size);

  const ItemBar = (index) => {
    return (
      <div className={index <= showSlide - 1 ? "item active" : "item"}></div>
    );
  };

  return (
    <div
      className="grid__progress"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 1fr)`,
      }}
    >
      {data.length === 0 ? null : map(data, (item, index) => ItemBar(index))}
    </div>
  );
}

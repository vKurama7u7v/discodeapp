import React from "react";
import { Link } from "react-router-dom";

import "./challenge.styles.css";
import "../zhome.styles.css";
export default function Challenge() {
  return (
    <div className="cuerpo header__navbarapp-cuerpo">
      <main className="main__challenge">
        <div className="challenge__header">
          <h1 className="title">Challenges</h1>
          <div className="search__challenge">
            <input type="search" name="" id="" placeholder="Buscar Challenge" />
            <button className="btn-search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>

        <div className="section__challenge">
          <div className="grid__challenge">
            <div className="item">
              <div className="thumbnail">
                <img
                  src="https://www.xtrafondos.com/wallpapers/vertical/astronauta-perdido-en-el-espacio-5498.jpg"
                  alt=""
                  height="50px"
                />
              </div>

              <div className="content">
                <h2 className="title">Nombre Reto</h2>
                <div className="subdiv">
                  <div className="category">
                    <span style={{ background: "#FF5F4A" }}>html</span>
                    <span style={{ background: "#41A0E8" }}>css</span>
                    <span style={{ background: "#FDC054" }}>js</span>
                  </div>
                  <div className="dificultad" id="Principiante">
                    <span>1</span>
                    <span>Principiante</span>
                  </div>
                </div>
                <p className="description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  nobis laboriosam cumque ipsum doloremque repellat culpa nam,
                  maxime libero eaque!
                </p>
                <button className="btn-more">Ver Más</button>
              </div>
            </div>
            <div className="item">
              <div className="thumbnail">
                <img
                  src="https://www.xtrafondos.com/wallpapers/vertical/astronauta-perdido-en-el-espacio-5498.jpg"
                  alt=""
                  height="50px"
                />
              </div>

              <div className="content">
                <h2 className="title">Nombre Reto</h2>
                <div className="subdiv">
                  <div className="category">
                    <span style={{ background: "#FF5F4A" }}>html</span>
                    <span style={{ background: "#41A0E8" }}>css</span>
                    <span style={{ background: "#FDC054" }}>js</span>
                  </div>
                  <div className="dificultad" id="Facil">
                    <span>2</span>
                    <span>Facil</span>
                  </div>
                </div>
                <p className="description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  nobis laboriosam cumque ipsum doloremque repellat culpa nam,
                  maxime libero eaque!
                </p>
                <button className="btn-more">Ver Más</button>
              </div>
            </div>
            <div className="item">
              <div className="thumbnail">
                <img
                  src="https://www.xtrafondos.com/wallpapers/vertical/astronauta-perdido-en-el-espacio-5498.jpg"
                  alt=""
                  height="50px"
                />
              </div>

              <div className="content">
                <h2 className="title">Nombre Reto</h2>
                <div className="subdiv">
                  <div className="category">
                    <span style={{ background: "#FF5F4A" }}>html</span>
                    <span style={{ background: "#41A0E8" }}>css</span>
                    <span style={{ background: "#FDC054" }}>js</span>
                  </div>
                  <div className="dificultad" id="Intermedio">
                    <span>3</span>
                    <span>Intermedio</span>
                  </div>
                </div>
                <p className="description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  nobis laboriosam cumque ipsum doloremque repellat culpa nam,
                  maxime libero eaque!
                </p>
                <button className="btn-more">Ver Más</button>
              </div>
            </div>
            <div className="item">
              <div className="thumbnail">
                <img
                  src="https://www.xtrafondos.com/wallpapers/vertical/astronauta-perdido-en-el-espacio-5498.jpg"
                  alt=""
                  height="50px"
                />
              </div>

              <div className="content">
                <h2 className="title">Nombre Reto</h2>
                <div className="subdiv">
                  <div className="category">
                    <span style={{ background: "#FF5F4A" }}>html</span>
                    <span style={{ background: "#41A0E8" }}>css</span>
                    <span style={{ background: "#FDC054" }}>js</span>
                  </div>
                  <div className="dificultad" id="Moderado">
                    <span>4</span>
                    <span>Moderado</span>
                  </div>
                </div>
                <p className="description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  nobis laboriosam cumque ipsum doloremque repellat culpa nam,
                  maxime libero eaque!
                </p>
                <button className="btn-more">Ver Más</button>
              </div>
            </div>
            <div className="item">
              <div className="thumbnail">
                <img
                  src="https://www.xtrafondos.com/wallpapers/vertical/astronauta-perdido-en-el-espacio-5498.jpg"
                  alt=""
                  height="50px"
                />
              </div>

              <div className="content">
                <h2 className="title">Nombre Reto</h2>
                <div className="subdiv">
                  <div className="category">
                    <span style={{ background: "#FF5F4A" }}>html</span>
                    <span style={{ background: "#41A0E8" }}>css</span>
                    <span style={{ background: "#FDC054" }}>js</span>
                  </div>
                  <div className="dificultad" id="Avanzado">
                    <span>5</span>
                    <span>Avanzado</span>
                  </div>
                </div>
                <p className="description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  nobis laboriosam cumque ipsum doloremque repellat culpa nam,
                  maxime libero eaque!
                </p>
                <button className="btn-more">Ver Más</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import React from "react";
import Avatar from "../../../../../assets/png/avatar.png";
import { Link } from "react-router-dom";

import Likes from "./Likes.jsx";

export default function Publication(props) {
  const { data, key } = props;
  const { publication, comments, likes } = data;
  const { idUser: user } = publication;

  return (
    <div className="card-post" id={key}>
      <div className="header__post">
        <Link className="profile" to={`/profile/${user.username}`}>
          <div className="avatar">
            <img
              src={user.avatar ? user.avatar : Avatar}
              alt=""
              height="50px"
            />
          </div>

          <div className="perfil">
            <span className="perfil__span">
              <p className="name">
                {user.first_name} {user.last_name}
              </p>
              <p className="username">@{user.username} </p>
            </span>
          </div>
        </Link>
        <Link
          className="view-more"
          to={`/comunidad/publication/${publication.id}`}
        >
          <i class="uil uil-eye"></i>Ver Más
        </Link>
      </div>
      <div className="content__post">
        <img src={publication.file} alt={publication.idCloud} height="50px" />
      </div>
      <div className="desc__post">
        <div className="counters__section">
          <Likes likes={likes} id={publication.id} />
          <div className="comments">
            <i class="fa-regular fa-comment"></i>
            <span>
              {comments} {comments === 1 ? "Comentario" : "Comentarios"}
            </span>
          </div>
        </div>
        <div className="desc__section">
          <p className="">{publication.description}</p>
        </div>
      </div>
    </div>
  );
}

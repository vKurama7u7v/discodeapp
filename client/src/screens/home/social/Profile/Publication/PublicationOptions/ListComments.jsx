import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { size, map } from "lodash";

import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../../../../../gql/comment";

import Spinner from "../../../../../components/Spinners/Dots.jsx";

export default function ListComments(props) {
  const { avatar, post } = props;

  const { data, loading, startPolling, stopPolling } = useQuery(GET_COMMENTS, {
    variables: {
      idPublication: post.id,
    },
  });

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return <Spinner />;
  const { getComments } = data;
  console.log(getComments);

  return (
    <div className="comentarios__wrapper">
      {size(getComments) === 0
        ? null
        : map(getComments, (comment) => (
            <Link to={`/profile/${comment.idUser.username}`} className="perfil">
              <div className="avatar">
                <img
                  src={comment.idUser.avatar ? comment.idUser.avatar : avatar}
                  alt=""
                  width="40px"
                />
              </div>
              <div className="comentario">
                <div className="info">
                  <span>
                    <span className="name">
                      {comment.idUser.first_name} {comment.idUser.last_name}
                    </span>
                    <br />
                    <span className="username">@{comment.idUser.username}</span>
                  </span>
                  {/* <span className="fecha">
                    <i className="uil uil-clock-eight"></i>
                    {comment.createdAt.toString()}
                  </span> */}
                </div>
                <p>{comment.comment}</p>
              </div>
            </Link>
          ))}
    </div>
  );
}

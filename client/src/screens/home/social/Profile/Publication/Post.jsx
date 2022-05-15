import React from "react";
import { toast } from "react-toastify";

import { useQuery } from "@apollo/client";
import { GET_POST_INFO } from "../../../../../gql/publication";

import avatar from "../../../../../assets/png/avatar.png";
import Loading from "../../../../components/Loading/Loading.jsx";

// * ==== PUBLICATION OPTIONS ==== *
import PostInfo from "./PublicationOptions/PostInfo.jsx";
import AddComment from "./PublicationOptions/AddComment.jsx";
import ListComments from "./PublicationOptions/ListComments.jsx";
import CounterLikes from "./PublicationOptions/CounterLikes.jsx";

export default function Post(props) {
  const { idPost } = props;
  const { data, loading, error } = useQuery(GET_POST_INFO, {
    variables: {
      getPostInfoId: idPost,
    },
  });

  if (loading) return <Loading />;
  if (error) {
    toast.error("Publicación no encontrada");
    return <h1>No se encontro</h1>;
  }

  const { getPostInfo: post } = data;

  return (
    <div className="cuerpo header__navbarapp-cuerpo">
      <main className="publication">
        <div className="align-center">
          <div className="card__publication">
            <div className="publication__wrapper">
              <div className="left">
                <div className="cont__img">
                  <img src={post.file} alt="" width="40px" height="40px" />
                </div>
              </div>
              <div className="right">
                <PostInfo avatar={avatar} idUser={post.idUser} />
                <div className="cont__description">
                  <p>
                    {post.description ? (
                      post.description
                    ) : (
                      <div>
                        <br />
                      </div>
                    )}
                  </p>
                </div>
                <div className="cont__comentarios">
                  <h3>Comentarios</h3>
                  <ListComments avatar={avatar} post={post} />
                </div>
                <CounterLikes post={post} />
                <AddComment post={post} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

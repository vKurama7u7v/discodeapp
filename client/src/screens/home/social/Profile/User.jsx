import React from "react";
import { toast } from "react-toastify";
import { size } from "lodash";

import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../../gql/user";
import { GET_PUBLICATIONS } from "../../../../gql/publication";

import avatar from "../../../../assets/png/avatar.png";
import Navbar from "../../../components/Navbars/NavbarApp/NavbarApp.jsx";
import UserNotFound from "../UserNotFound/UserNotFound.jsx";
import Loading from "../../../components/Loading/Loading.jsx";

// ==== OPCIONES INFO PROFILE ====
import Gamertag from "./UserHeader/Gamertag.jsx";
import Followers from "./UserHeader/Followers.jsx";
import BtnSettings from "./UserHeader/BtnSettings.jsx";

// ==== OPCIONES FEED PROFILE ====
import NewPost from "./Feed/NewPost.jsx";
import Publications from "./Feed/Publications.jsx";

import "../../zhome.styles.css";
import "./profile.styles.css";

export default function User(props) {
  const { username } = props;
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      username,
    },
  });

  const { data: dataPublications, loading: loadingPublications } = useQuery(
    GET_PUBLICATIONS,
    {
      variables: { username },
    }
  );

  if (loading) return <Loading />;
  if (error) {
    toast.error("Usuario no encontrado");
    return <UserNotFound />;
  }

  if (loadingPublications) return <Loading />;

  const { getPublications } = dataPublications;
  const { getUser } = data;

  return (
    <div className="cuerpo header__navbarapp-cuerpo">
      <main className="main__profile">
        <div className="perfil">
          <div className="contenedor__avatar">
            <div className="avatar">
              <img
                src={!getUser.avatar ? avatar : getUser.avatar}
                alt={`${getUser.first_name} ${getUser.last_name}`}
                title={`${getUser.first_name} ${getUser.last_name}`}
              />
            </div>
            <BtnSettings getUser={getUser} />
          </div>
          <div className="contenedor__info">
            <Gamertag getUser={getUser} />

            <Followers
              username={getUser.username}
              totalPublications={size(getPublications)}
            />

            <div className="info">
              <h4 className="nombre">{`${getUser.first_name} ${getUser.last_name}`}</h4>
              <p>{getUser.description}</p>
            </div>

            <div className="social">
              {getUser.siteWeb ? (
                <a
                  className="website"
                  target="_blank"
                  href={`${getUser.siteWeb}`}
                  rel="noreferrer"
                >
                  <i class="fa-solid fa-globe"></i>
                </a>
              ) : null}

              {getUser.linkedinWeb ? (
                <a
                  className="linkedin"
                  target="_blank"
                  href={`${getUser.linkedinWeb}`}
                  rel="noreferrer"
                >
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
              ) : null}

              {getUser.dribbbleWeb ? (
                <a
                  className="dribbble"
                  target="_blank"
                  href={`${getUser.dribbbleWeb}`}
                  rel="noreferrer"
                >
                  <i class="fa-solid fa-basketball"></i>
                </a>
              ) : null}

              {getUser.githubWeb ? (
                <a
                  className="github"
                  target="_blank"
                  href={`${getUser.githubWeb}`}
                  rel="noreferrer"
                >
                  <i class="fa-brands fa-github-alt"></i>
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="feed">
          <div className="feed__title">
            <h2>Publicaciones</h2>
            <NewPost getUser={getUser} />
          </div>

          <Publications getPublications={getPublications} />
        </div>
      </main>
    </div>
  );
}

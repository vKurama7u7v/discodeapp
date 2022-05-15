import React, { useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { size, map } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS, GET_FOLLOWS } from "../../../../../gql/follow";
import { GET_PUBLICATIONS } from "../../../../../gql/publication";
import { Link } from "react-router-dom";

import avatar from "../../../../../assets/png/avatar.png";

export default function Followers(props) {
  const { username, totalPublications } = props;

  const {
    data: dataFollowers,
    loading: loadingFollowers,
    startPolling: startPollingFollowers,
    stopPolling: stopPollingFollowers,
  } = useQuery(GET_FOLLOWERS, {
    variables: {
      username,
    },
  });

  const {
    data: dataFollows,
    loading: loadingFollows,
    startPolling: startPollingFollows,
    stopPolling: stopPollingFollows,
  } = useQuery(GET_FOLLOWS, {
    variables: {
      username,
    },
  });

  // REAL TIME (!No abusar de ello, afecta a servidor)
  useEffect(() => {
    // Cada 1000ms = 1s
    startPollingFollowers(1000);
    startPollingFollows(1000);
    return () => {
      stopPollingFollowers();
      stopPollingFollows();
    };
  }, [
    startPollingFollowers,
    stopPollingFollowers,
    startPollingFollows,
    stopPollingFollows,
  ]);

  if (loadingFollowers || loadingFollows) return null;
  const { getFollowers } = dataFollowers;
  const { getFollows } = dataFollows;

  const OpenFollowers = () => {
    Swal.fire({
      title: "Lista de Seguidores",
      showCloseButton: true,
      html: `
      <div class="body-sweetAlert">
        <div class="wrapper-sweetAlert">
            <ul class="listUsers">
            ${
              size(getFollowers) === 0
                ? "<li><h3>No hay seguidores</h3></li>"
                : mapUsers(getFollowers)
            }
            </ul>
        </div>
    </div>`,
    });
  };

  const OpenFollows = () => {
    Swal.fire({
      title: "Lista de Seguidos",
      showCloseButton: true,
      html: `
      <div class="body-sweetAlert">
        <div class="wrapper-sweetAlert">
            <ul class="listUsers">
            ${
              size(getFollows) === 0
                ? "<li><h3>No hay seguidos</h3></li>"
                : mapUsers(getFollows)
            }
            </ul>
        </div>
    </div>`,
    });
  };

  const mapUsers = (data) => {
    return data.map((user) =>
      UserItem(user.avatar, user.first_name, user.last_name, user.username)
    );
  };

  const UserItem = (img_avatar, first_name, last_name, username) => {
    return `<li>
        <a href="/profile/${username}"class="item-username">
            <div class="avatar">
                <img src="${img_avatar ? img_avatar : avatar}" />
            </div>
            <span class="info-user">
                <span class="name">
                    ${first_name}
                    ${last_name}
                </span>
                <br />
                <span class="username">
                    @${username}
                </span>
            </span>
        </a>
    </li>`;
  };

  return (
    <div className="seguidores">
      <Link>
        <span>{totalPublications}</span>
        <span>Publicaciones</span>
      </Link>
      <Link onClick={OpenFollowers}>
        <span>{size(getFollowers)}</span>
        <span>Seguidores</span>
      </Link>
      <Link onClick={OpenFollows}>
        <span>{size(getFollows)}</span>
        <span>Seguidos</span>
      </Link>
    </div>
  );
}

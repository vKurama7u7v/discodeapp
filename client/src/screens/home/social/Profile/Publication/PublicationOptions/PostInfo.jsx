import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../../../../gql/user";
import { toast } from "react-toastify";

import Spinner from "../../../../../components/Spinners/Basic.jsx";

export default function PostInfo(props) {
  const { avatar, idUser } = props;

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      getUserId: idUser,
    },
  });

  if (loading) return <Spinner />;
  if (error) {
    toast.warning("Algo salio mal");
  }

  const { getUser: user } = data;

  return (
    <Link to={`/profile/${user.username}`} className="cont__profile">
      <div className="avatar">
        <img src={user.avatar ? user.avatar : avatar} alt="" />
      </div>
      <div className="perfil">
        <span className="perfil__span">
          <span className="name">
            {user.first_name} {user.last_name}
          </span>
          <br />
          <span className="username">@{user.username}</span>
        </span>
      </div>
    </Link>
  );
}

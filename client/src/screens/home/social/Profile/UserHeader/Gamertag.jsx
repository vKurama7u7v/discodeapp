import React from "react";
import { toast } from "react-toastify";

import useAuth from "../../../../../hooks/useAuth";
import { useQuery, useMutation } from "@apollo/client";
import { IS_FOLLOW, FOLLOW, UNFOLLOW } from "../../../../../gql/follow";

import "./user-header.styles.css";
export default function Gamertag(props) {
  const { auth } = useAuth();
  const { getUser } = props;

  const [follow] = useMutation(FOLLOW);
  const [unfollow] = useMutation(UNFOLLOW);

  const { data, loading, refetch } = useQuery(IS_FOLLOW, {
    variables: { username: getUser.username },
  });

  const onFollow = async () => {
    try {
      const result = await follow({
        variables: {
          username: getUser.username,
        },
      });
      refetch();
      toast.success(`Haz empezado a seguir a @${getUser.username}`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const onUnFollow = async () => {
    try {
      const result = await unfollow({
        variables: {
          username: getUser.username,
        },
      });
      refetch();
      toast.info(`Dejaste de seguir a @${getUser.username}`);
    } catch (error) {
      console.log(error);
      toast.error("Error al dejar de seguir usuario");
    }
  };

  const buttonFollow = () => {
    if (data.isFollow) {
      return (
        <button className="reset btn-danger" onClick={onUnFollow}>
          Unfollow
        </button>
      );
    } else {
      return (
        <button className="reset btn-primary" onClick={onFollow}>
          Follow
        </button>
      );
    }
  };

  return (
    <div className="header-gamertag">
      <div className="gamertag">
        <h3 className="username">{getUser.username}</h3>
        <span className="role">{getUser.role}</span>
      </div>
      {getUser.username !== auth.username ? (
        <div className="gamertag-options">{!loading && buttonFollow()}</div>
      ) : null}
    </div>
  );
}

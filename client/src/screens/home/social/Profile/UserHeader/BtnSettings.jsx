import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";

export default function BtnSettings(props) {
  const { auth } = useAuth();
  const { getUser } = props;

  return (
    <div>
      {getUser.username === auth.username ? (
        <div className="settings">
          <Link to={`/settings/account`}>
            <i className="fa-solid fa-gear"></i>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

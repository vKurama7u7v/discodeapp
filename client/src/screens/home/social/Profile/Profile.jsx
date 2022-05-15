import React from "react";
import { useParams } from "react-router-dom";
import User from "./User.jsx";

export default function Profile() {
  const { username } = useParams();
  return (
    <>
      <User username={username} />
    </>
  );
}

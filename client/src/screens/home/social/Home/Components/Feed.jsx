import React from "react";
import { toast } from "react-toastify";
import { map } from "lodash";

import { useQuery } from "@apollo/client";
import { GET_PUBLICATIONS_FOLLOWS } from "../../../../../gql/publication";

import Publication from "./Publication.jsx";

export default function Feed() {
  const { data, loading, error } = useQuery(GET_PUBLICATIONS_FOLLOWS);

  if (loading) return null;
  if (error) {
    toast.error("Publicación no encontrada");
    return <h1>No se encontro</h1>;
  }

  const { getPublicationsFollows: publications } = data;

  return (
    <div className="contenedor__feed">
      {publications.length === 0
        ? null
        : map(publications, (item, index) => (
            <Publication data={item} key={index} />
          ))}
    </div>
  );
}

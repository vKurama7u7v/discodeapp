import React, { useState } from "react";
import { toast } from "react-toastify";

import { useMutation, useQuery } from "@apollo/client";
import { GET_LANGUAGES, GET_CODE_SANDBOXES } from "../../../../gql/codeSandbox";

import NewSandbox from "../NewCodeSandbox/NewCodeSandbox.jsx";
import Items from "./ItemsGrid/Items.jsx";

import "../../zhome.styles.css";
import "./code-sandbox.styles.css";

export default function CodeSanbox() {
  const { data, loading, error } = useQuery(GET_LANGUAGES, {
    variables: {
      status: true,
    },
  });

  const {
    data: dataSandboxes,
    loading: loadingSandboxes,
    error: errorSandboxes,
    refetch,
  } = useQuery(GET_CODE_SANDBOXES, {
    variables: {
      status: true,
    },
  });

  if (loading) return null;
  else if (error) {
    toast.error("Ups! Algo salio mal al obtener los Lenguajes");
  }

  if (loadingSandboxes) return null;
  else if (errorSandboxes) {
    console.log(errorSandboxes);
  }

  const { getLanguages } = data;

  return (
    <div className="cuerpo header__navbarapp-cuerpo">
      <main className="codesandbox" onLoad={refetch()}>
        <div className="header__sandbox">
          <h1>Compiladores</h1>
          <div className="buscador">
            <input type="search" name="" id="" placeholder="Buscar Sandbox" />
            <button className="sandbox__search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <div className="addSandbox">
          <NewSandbox getLanguages={getLanguages} refetch={refetch} />
        </div>
        <div className="section__sandboxes">
          <h1>Mis Sandboxes</h1>
          <Items
            data={dataSandboxes}
            loading={loadingSandboxes}
            error={errorSandboxes}
            refetch={refetch}
          />
        </div>
      </main>
    </div>
  );
}

import React from "react";
import { useHistory } from "react-router-dom";
import { map, size } from "lodash";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_SANDBOX_DATA,
  SAVE_SANDBOX,
  DELETE_SANDBOX,
} from "../../../../gql/codeSandbox";

import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2";
import { StatusAlert } from "../../../../utils/alerts.utils";

import "../../zhome.styles.css";
import "./sandbox.styles.css";

var saveRes;

export default function Sandbox() {
  const history = useHistory();
  const { language, idSandbox } = useParams();
  const [saveSandbox] = useMutation(SAVE_SANDBOX);
  const [removeSandbox] = useMutation(DELETE_SANDBOX);

  const { data, loading, error } = useQuery(GET_SANDBOX_DATA, {
    variables: {
      getCodeSandboxId: idSandbox,
    },
  });

  if (loading) return null;
  else if (error) {
    toast.error("Parece que esta CodeSandbox ya no esta disponible");
    return null;
  }

  const { getCodeSandbox } = data;

  const onSetCode = () => {
    const iFrame = document.getElementById("oc-editor"); // add an ID for the <iframe tag
    iFrame.contentWindow.postMessage(
      {
        eventType: "populateCode",
        language: `${getCodeSandbox.language}`,
        files: getCodeSandbox.content
          ? getCodeSandbox.content
          : [
              {
                name: "",
                content: "",
              },
            ],
      },
      "*"
    );
  };

  const onKeyUp = () => {
    window.onmessage = function (e) {
      if (e.data && e.data.language) {
        const { language, files } = e.data;

        saveRes = { language, files };
      }
    };
  };

  const onLoad = () => {
    onKeyUp();
    onSetCode();
  };

  const onSave = async () => {
    if (size(saveRes.files) > 0) {
      try {
        // Creando Array para mandar
        const files = [];
        await map(saveRes.files, (item) => {
          files.push({ name: item.name, content: item.content });
        });

        // Consultar Peticion
        const response = await saveSandbox({
          variables: {
            saveSandboxId: idSandbox,
            files: files,
          },
        });
        console.log("response", response);
        toast.info("¡Sandbox Guardada con Exito!");
      } catch (error) {
        console.log(error);
        if (!saveRes) {
          toast.error("No se detectaron Cambios a Guardar");
        } else {
          toast.error("Ups! Algo salio mal al guardar tu Sandbox");
        }
      }
    } else {
      toast.warning("Necesitar Crear almenos un Programa");
    }
  };

  const onDelete = () => {
    Swal.fire({
      title: "¿Quieres Eliminar está Sandbox?",
      text: "Todo su contenido será eliminado y no prodras revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        try {
          const { data } = await removeSandbox({
            variables: {
              removeSandboxId: idSandbox,
            },
          });

          history.push("/codesandbox");
          if (data.removeSandbox.status) {
            StatusAlert(
              "Sandbox Eliminada",
              "Tu Sandbox ha sido eliminada con exito",
              "success"
            );
          }
        } catch (error) {
          toast.error("Error al eliminar Sandbox");
        }
      }
    });
  };

  return (
    <div className="cuerpo header__navbarapp-cuerpo">
      <main className="main__sandbox">
        <div className="header__sandbox">
          <h1>{getCodeSandbox.name}</h1>
          <div className="options">
            <button id="delete" onClick={onDelete}>
              <i className="uil uil-trash-alt"></i>
              <span>Eliminar</span>
            </button>
            <button id="edit">
              <i className="uil uil-pen"></i>
              <span>Editar</span>
            </button>
            <button id="save" onClick={onSave}>
              <i className="uil uil-save"></i>
              <span>Guardar</span>
            </button>
          </div>
        </div>
        {/* <button onClick={onSetCode}>set</button>
        <button onClick={onKeyUp}>get</button>
        <button onClick={onSave}>save</button> */}
        <div className="compiler">
          <iframe
            id="oc-editor"
            src="https://onecompiler.com/embed/python?hideTitle=true&amp;codeChangeEvent=true&amp;listenToEvents=true&amp;hideLanguageSelection=true"
            width="100%"
            frameBorder="0"
            className="codesandbox"
            onLoad={onLoad}
            onKeyUp={onKeyUp}
          ></iframe>
        </div>
      </main>
    </div>
  );
}

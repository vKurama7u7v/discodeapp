import React from "react";

import { v1 as uuidv1 } from "uuid";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { toast } from "react-toastify";

import { useMutation } from "@apollo/client";
import { AUTHORIZE_FILE, PUBLISH } from "../../../../../gql/publication";
import { uploadPublication } from "../../../../tools/cloudinary.tools";
import { StatusAlert } from "../../../../../utils/alerts.utils";
import useAuth from "../../../../../hooks/useAuth";

import "./feed.styles.css";

export default function NewPost(props) {
  const { auth } = useAuth();
  const { getUser } = props;

  const [authorizeFile] = useMutation(AUTHORIZE_FILE);
  const [publish] = useMutation(PUBLISH);

  const OpenNewPost = async () => {
    const { value: file } = await Swal.fire({
      title: "Nueva Publicación",
      text: "Selecciona una Imagen",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: "#6242EE",
      confirmButtonText: "Siguiente",
      input: "file",
      customClass: {
        input: "dropzone",
      },
      inputAttributes: {
        accept: "image/jpeg, image/png",
        "aria-label": "Upload your profile picture",
      },
      html: `
        <div class="input-dropzone">
            <i class="uil uil-image-upload"></i>
            <p>Click para Buscar Imagen</p>
        </div>
      `,
      preConfirm: (inputValue) => {
        if (!inputValue) {
          Swal.showValidationMessage("No ha seleccionado una imagen");
        }

        return inputValue;
      },
    });

    AddDescription(file);
  };

  const AddDescription = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonColor: "#6242EE",
          confirmButtonText: "Continuar",
          html: `
              <div class="post-sweetAlert">
                  <div class="post-swal__cont-img">
                      <img src="${e.target.result}" alt="" width="20px"/>
                  </div>
              </div>
              `,
          input: "textarea",
          inputLabel: "Descripción (Opcional)",
          inputPlaceholder: "En que estas pensando...",
          inputAttributes: {
            maxlength: 150,
            "aria-label": "Type your message here",
          },
          preConfirm: (inputValue) => {
            const description = inputValue.trim();
            return description;
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            if (file) {
              ConfirmAddPublication(e.target.result, file, result.value);
            }
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const ConfirmAddPublication = (preview, file, description) => {
    Swal.fire({
      title: "Nueva Publicación",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: "#6242EE",
      confirmButtonText: "Publicar",
      html: `
                <div class="post-sweetAlert">
                    <div class="post-swal__cont-img">
                        <img src="${preview}" alt="" width="20px"/>
                    </div>
                    ${
                      description
                        ? ` <div class="post-swal__description">
                              <p>${description}</p>
                            </div>`
                        : ""
                    }

                </div>
                `,
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const permiso = await isAuthorize(file);
          if (permiso.status) {
            // Generando id de la imagen
            const newID = uuidv1();

            const { status: ok, data } = await uploadPublication(newID, file);

            const sendData = {
              status: ok,
              idUser: permiso.id,
              idCloud: newID,
              description: description,
              file: data.url,
              typeFile: data.format,
            };

            const response = await PostPublication(sendData);
            console.log(response);
            StatusAlert(
              "Publicación Realizada",
              "¡Tu Publicación fue Realizada con Exito!",
              "success"
            );
          }
        } catch (error) {
          console.log(error);
          toast.error("Error al Crear Nueva Publicación");
        }
      }
    });
  };

  const isAuthorize = async (file) => {
    const { data } = await authorizeFile({
      variables: {
        file: file,
      },
    });

    return data.authorizeFile;
  };

  const PostPublication = async (req) => {
    const { status, idUser, idCloud, description, file, typeFile } = req;
    if (status === 200) {
      console.log(req);
      return await publish({
        variables: {
          input: {
            idUser: idUser,
            idCloud: idCloud,
            description: description,
            file: file,
            typeFile: typeFile,
            status: true,
          },
        },
      });
    } else {
      return null;
    }
  };

  return (
    <>
      {getUser.username === auth.username ? (
        <button id="NewPost" onClick={OpenNewPost}>
          Publicar <i className="fa-solid fa-plus"></i>
        </button>
      ) : null}
    </>
  );
}

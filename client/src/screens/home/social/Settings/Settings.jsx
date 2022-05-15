import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { StatusAlert } from "../../../../utils/alerts.utils";

import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import {
  GET_USER,
  UPLOAD_AVATAR,
  DESTROY_AVATAR,
  CHANGE_AVATAR,
} from "../../../../gql/user";

import { uploadPFP } from "../../../tools/cloudinary.tools";

import avatar from "../../../../assets/png/avatar.png";
import Navbar from "../../../components/Navbars/NavbarApp/NavbarApp.jsx";

import InformationForm from "./UserSettings/InformationForm.jsx";
import WebSitesForm from "./UserSettings/WebSitesForm.jsx";
import ChangePassword from "./UserSettings/ChangePassword.jsx";

import Loading from "../../../components/Loading/Loading.jsx";

import "../../zhome.styles.css";
import "./settings.styles.css";

export default function Settings(props) {
  const { username, id: userID } = props;
  const [updateAvatar] = useMutation(UPLOAD_AVATAR);
  const [destroyAvatar] = useMutation(DESTROY_AVATAR);
  const [changeAvatar] = useMutation(CHANGE_AVATAR, {
    update(cache, { data: { changeAvatar } }) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: username },
      });

      cache.writeQuery({
        query: GET_USER,
        variables: { username: username },
        data: {
          getUser: { ...getUser, avatar: changeAvatar.urlAvatar },
        },
      });
    },
  });

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      username: username,
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];

    try {
      const permiso = await UpdateAvatar(file);
      if (permiso.status) {
        Swal.fire({
          title: "¿Quieres Actualizar tu Avatar?",
          text: "¡Se eliminará el Avatar anterior!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f1646c",
          confirmButtonText: "Eliminar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const destroy = await DestroyAvatar(permiso.id);

              const { status, id } = destroy;

              if (status) {
                const { status: ok, data } = await uploadPFP(id, file);
                const result = await UploadAvatar(ok, id, data.url);
              }

              StatusAlert(
                "Avatar Actualizado",
                "¡Avatar Actualizado con Exito!",
                "success"
              );
            } catch (error) {
              console.log(error);
              toast.error(error.message);
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, []);

  const UpdateAvatar = async (file) => {
    const { data } = await updateAvatar({
      variables: {
        file: file,
      },
    });

    return data.updateAvatar;
  };

  const DestroyAvatar = async (id) => {
    const { data } = await destroyAvatar({
      variables: {
        input: {
          id: id,
        },
      },
    });

    return data.destroyAvatar;
  };

  const UploadAvatar = async (status, id, url) => {
    if (status === 200) {
      const result = await changeAvatar({
        variables: {
          input: {
            id: id,
            status: true,
            avatar: url,
          },
        },
      });

      return result;
    } else {
      return null;
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  if (loading) return <h1>Loading Profile</h1>;
  if (error) {
    return <h1>Error</h1>;
  }

  const { getUser } = data;

  return (
    <div className="cuerpo header__navbarapp-cuerpo">
      <main className="settings pd-1">
        <div className="settings__wrapper">
          <div className="left bg-light">
            <div className="cont__avatar">
              <div className="avatar">
                <img
                  src={!getUser.avatar ? avatar : getUser.avatar}
                  alt={getUser.username}
                />
              </div>
              <div className="change-pic">
                <button {...getRootProps()}>
                  <i className="fa-solid fa-camera-rotate"></i>
                </button>
                <input {...getInputProps()} hidden />
              </div>
            </div>

            {/*<!-- ===== CAMBIAR CONTRASEÑA ===== -->*/}
            <ChangePassword />

            {/*<!-- ===== ELIMINAR CUENTA ===== -->*/}
            <button className="reset btn-danger width-100">
              Eliminar Cuenta
            </button>
          </div>
          <div className="right bg-light">
            {/*<!-- ===== ACTUALIZAR INFORMACIÓN ===== -->*/}
            <InformationForm getUser={getUser} />
            <hr />

            {/*<!-- ===== ACTUALIZAR WEBSITES ===== -->*/}
            <WebSitesForm getUser={getUser} />
          </div>
        </div>
      </main>
    </div>
  );
}

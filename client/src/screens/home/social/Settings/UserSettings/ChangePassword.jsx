import React from "react";

import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { StatusAlert } from "../../../../../utils/alerts.utils";

import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD, GET_USER } from "../../../../../gql/user";

export default function ChangePassword() {
  const [changePassword] = useMutation(CHANGE_PASSWORD);

  const FormAlert = async () => {
    Swal.fire({
      title: "Cambiar Contraseña",
      text: "Introduce tu nueva contraseña",
      html: `
        <input type="password" id="swal-input1" class="swal2-input" placeholder="Contraseña">
        <input type="password" id="swal-input2" class="swal2-input" placeholder="Confirmar Contraseña">`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Guardar",
      preConfirm: () => {
        const password = document.getElementById("swal-input1").value;
        const password2 = document.getElementById("swal-input2").value;

        // Contraseñas Vacias
        if (!(password || password2)) {
          Swal.showValidationMessage("Porfavor rellene los campos");
        }

        // Contraseñas Distintas
        if (password !== password2) {
          Swal.showValidationMessage("Las Contraseñas no coinciden");
        }

        // Contraseñas Menor a 8 Carácteres
        if (password.length < 8 || password2.length < 8) {
          Swal.showValidationMessage(
            "La Contraseña debe tener un minímo de 8 Carácteres"
          );
        }

        // Contraseñas con un Carácter Númerico""
        if (!password.match(/\d/) || !password2.match(/\d/)) {
          Swal.showValidationMessage(
            "La Contraseña debe de contener un Carácter Númerico"
          );
        }

        return { password: password, password2: password2 };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { password, password2 } = result.value;
        if (password) {
          try {
            const response = await changePassword({
              variables: {
                input: {
                  password: password,
                },
              },
            });

            const { data } = response;
            const { status } = data.changePassword;

            if (status) {
              StatusAlert(
                "Contraseña Actualizada",
                "¡Tu Contraseña ha sido Actualizada con Exito!",
                "success"
              );
            }
          } catch (error) {
            console.log(error);
            toast.error(error.message);
          }
        }
      }
    });
  };
  return (
    <button className="reset btn-secondary width-100" onClick={FormAlert}>
      Cambiar Contraseña
    </button>
  );
}

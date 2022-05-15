import React from "react";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import { RESET } from "../../gql/user.js";

import { toast } from "react-toastify";

import Cody from "../../assets/cody/Reset.png";
import "../../styles/styles.css";
import enviroment from "../../config/env.json";

import BG from "../components/backgrounds/Background-Icons.jsx";

export default function Reset({ match }) {
  const [reset] = useMutation(RESET);

  const token = match.params.token;

  const formik = useFormik({
    initialValues: {
      resetPasswordLink: "",
      password: "",
      password2: "",
    },
    validationSchema: null,
    onSubmit: async (formData, { resetForm }) => {
      const { password, password2 } = formData;

      const schema = Yup.object().shape({
        password2: Yup.string()
          .required("¡Confirmar Contraseña Obligatoria!")
          .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
        password: Yup.string()
          .required("¡Contraseña Obligatoria!")
          .min(8, "La Contraseña debe tener un minímo de 8 Carácteres")
          .matches(/\d/, "La Contraseña debe de contener un Carácter Númerico")
          .oneOf([Yup.ref("password2")], "Las contraseñas no coinciden"),
      });

      const isValid = await schema
        .validate({ password, password2 })
        .catch(function (err) {
          toast.error(err.errors[0]);
        });

      if (isValid) {
        try {
          const { password } = formData;
          const userUpdated = {
            resetPasswordLink: token,
            password,
          };

          console.log(userUpdated);

          const result = await reset({
            variables: {
              input: userUpdated,
            },
          });

          // Obteniendo repuesta del servidor
          console.log("respuesta: ", result);
          toast.success("Contraseña Restablecida con Exito");

          // Resetenado Form
          resetForm({
            password: "",
            password2: "",
          });
        } catch (error) {
          toast.error(error.message);
        }
      }
    },
  });
  return (
    <div className="cuerpo">
      <div className="flex-center bg-animation">
        <BG />

        <div className="login__cont-form z-index">
          {/*<!-- ===== CONT IZQUIERDO ===== -->*/}
          <div className="left">
            <div className="form__cont-login">
              <div className="form-login">
                <h1>Restablecer Contraseña</h1>
                <form onSubmit={formik.handleSubmit}>
                  <div className="form__div">
                    <input
                      type="password"
                      className="form__input"
                      placeholder=" "
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <label htmlFor="pass1" className="form__label">
                      Contraseña
                    </label>
                    <i className="fas fa-lock icon"></i>
                  </div>

                  <div className="form__div">
                    <input
                      type="password"
                      className="form__input"
                      placeholder=" "
                      name="password2"
                      onChange={formik.handleChange}
                      value={formik.values.password2}
                    />
                    <label htmlFor="pass2" className="form__label">
                      Confirmar Contraseña
                    </label>
                    <i className="fas fa-lock icon"></i>
                  </div>

                  <div className="form__div form__button">
                    <button type="submit" className="reset-button btn-submit">
                      Restablecer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/*<!-- ===== CONT DERECHO ===== -->*/}
          <div className="right">
            <Link className="btn-close" to="/">
              <i className="fas fa-times"></i>
            </Link>
            <div className="container">
              <div className="cont-img">
                <img src={Cody} alt="Cody - DisCode" title="Cody - Sign In" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

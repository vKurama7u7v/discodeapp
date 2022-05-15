import React from "react";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import { FORGET } from "../../gql/user.js";

import { toast } from "react-toastify";
import "../../styles/styles.css";
import enviroment from "../../config/env.json";

import Cody from "../../assets/cody/Forgot.png";
import BG from "../components/backgrounds/Background-Icons.jsx";

export default function Forget() {
  const [forget] = useMutation(FORGET);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: null,
    onSubmit: async (formData, { resetForm }) => {
      const { email } = formData;

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("¡Correo Electrónico Obligatorio!")
          .email("Necesitas un Correo Electrónico Valido!"),
      });

      const isValid = await schema.validate({ email }).catch(function (err) {
        toast.error(err.errors[0]);
      });

      if (isValid) {
        try {
          const { email } = formData;
          const request = { email };

          const result = await forget({
            variables: {
              input: request,
            },
          });

          // Obteniendo response
          console.log("respuesta: ", result);
          toast.success(
            `Enviando Correo Electrónico a ${email}. ¡Por favor revisa tu correo!`
          );

          // Reseteando Form
          resetForm({
            email: "",
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
                <h1>Olvide mi Contraseña</h1>
                <form onSubmit={formik.handleSubmit}>
                  <div className="form__div">
                    <input
                      type="email"
                      className="form__input"
                      placeholder=" "
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <label htmlFor="email" for="email" className="form__label">
                      Correo Electrónico
                    </label>
                    <i className="fas fa-envelope icon"></i>
                  </div>
                  <div className="form__div">
                    <button className="reset-button btn-submit" type="submit">
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/*<!-- ===== CONT DERECHO ===== -->*/}
          <div className="right">
            <Link className="btn-close" to="/">
              <i class="fas fa-times"></i>
            </Link>
            <div className="container">
              <div className="cont-img">
                <img
                  src={Cody}
                  alt="Cody - DisCode"
                  title="Cody - Forget Password"
                />
              </div>
              <div className="cont-info">
                <h2>¿Aún no tienes una cuenta?</h2>
                <p>
                  Regístrate para crear una cuenta. Haz clic en el siguiente
                  botón.
                </p>
                <Link to="/register">Regístrarse</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

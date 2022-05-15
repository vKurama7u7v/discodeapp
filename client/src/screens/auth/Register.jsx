import React from "react";
import { Redirect, Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import { REGISTER } from "../../gql/user.js";

import { toast } from "react-toastify";

import Cody from "../../assets/cody/Register.png";
import "../../styles/styles.css";

import BG from "../components/backgrounds/Background-Icons.jsx";

function initialValues() {
  return {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  };
}

export default function Register() {
  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: null,
    onSubmit: async (formData, { resetForm }) => {
      const { first_name, last_name, username, email, password, password2 } =
        formData;
      const schema = Yup.object().shape({
        password2: Yup.string()
          .required("¡Confirmar Contraseña Obligatoria!")
          .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
        password: Yup.string()
          .required("¡Contraseña Obligatoria!")
          .min(8, "La Contraseña debe tener un minímo de 8 Carácteres")
          .matches(/\d/, "La Contraseña debe de contener un Carácter Númerico")
          .oneOf([Yup.ref("password2")], "Las contraseñas no coinciden"),
        email: Yup.string()
          .required("¡Correo Electrónico Obligatorio!")
          .email("Necesitas un Correo Electrónico Valido!"),
        username: Yup.string()
          .required("¡Username Obligatorio!")
          .min(4, "Necesitas un Username de 3 a 15 Carácteres")
          .matches(
            /^[a-zA-Z0-9\.\_\-]{4,16}$/,
            "El Username no debe de contener espacios"
          )
          .matches(
            /\d/,
            "El Username debe de contener por lo menos un Carácter Númerico"
          )
          .max(16, "Necesitas un Username de 3 a 15 Carácteres"),
        last_name: Yup.string()
          .required("¡Apellido Obligatorio!")
          .min(4, "Necesitas un Apellido de 3 a 30 Carácteres")
          .max(30, "Necesitas un Apellido de 3 a 30 Carácteres"),
        first_name: Yup.string()
          .required("¡Nombre Obligatorio!")
          .min(4, "Necesitas un Nombre de 3 a 30 Carácteres")
          .max(30, "Necesitas un Nombre de 3 a 30 Carácteres"),
      });

      const isValid = await schema
        .validate({
          first_name,
          last_name,
          username,
          email,
          password,
          password2,
        })
        .catch(function (err) {
          toast.error(err.errors[0]);
        });

      if (isValid) {
        try {
          // Destructurando Objeto
          const { first_name, last_name, username, email, password } = formData;
          const newUser = { first_name, last_name, username, email, password };

          // Mandando datos al servirdor
          const result = await register({
            variables: {
              input: newUser,
            },
          });

          // Obteniendo repuesta del servidor
          console.log("respuesta: ", result);
          toast.success(`Email enviado a ${isValid.email}`);

          // Resetenado Form
          resetForm({
            first_name: "",
            last_name: "",
            username: "",
            email: "",
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
      <div className="flex-center bg-animation form__register-height">
        <BG />
        <div className="login__cont-form mt-3 mb-3 z-index">
          {/*<!-- ===== CONT IZQUIERDO ===== -->*/}
          <div className="left">
            <div className="form__cont-login">
              <div className="form-login">
                <h1>Crear Cuenta</h1>
                <form onSubmit={formik.handleSubmit}>
                  <div className="form__div">
                    <input
                      type="text"
                      className="form__input"
                      placeholder=" "
                      name="first_name"
                      onChange={formik.handleChange}
                      value={formik.values.first_name}
                    />

                    <label htmlFor="first_name" className="form__label">
                      Nombre
                    </label>
                    <i className="fa-solid fa-user icon"></i>
                  </div>
                  <div className="form__div">
                    <input
                      type="text"
                      className="form__input"
                      placeholder=" "
                      name="last_name"
                      onChange={formik.handleChange}
                      value={formik.values.last_name}
                    />
                    <label htmlFor="last_name" className="form__label">
                      Apellido
                    </label>
                    <i className="fa-solid fa-user icon"></i>
                  </div>
                  <div className="form__div">
                    <input
                      type="text"
                      className="form__input"
                      placeholder=" "
                      name="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                    <label htmlFor="username" className="form__label">
                      Nombre de Usuario
                    </label>
                    <i className="fa-solid fa-user-astronaut icon"></i>
                  </div>
                  <div className="form__div">
                    <input
                      type="email"
                      className="form__input"
                      placeholder=" "
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <label htmlFor="email" className="form__label">
                      Correo Electrónico
                    </label>
                    <i className="fa-solid fa-envelope icon"></i>
                  </div>
                  <div className="form__div">
                    <input
                      type="password"
                      className="form__input"
                      placeholder=" "
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <label htmlFor="password" className="form__label">
                      Contraseña
                    </label>
                    <i className="fa-solid fa-lock icon"></i>
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
                    <label htmlFor="password2" className="form__label">
                      Confirmar Contraseña
                    </label>
                    <i className="fa-solid fa-lock icon"></i>
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
              <i className="fas fa-times"></i>
            </Link>
            <div className="container">
              <div className="cont-img">
                <img src={Cody} alt="Cody - DisCode" title="Cody - Sign Up" />
              </div>
              <br></br>
              <div className="cont-info">
                <h2>¿Ya tienes una cuenta?</h2>
                <p>Haz clic en el siguiente boton para Iniciar Sesión.</p>
                <Link to="/login">Iniciar Sesión</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link, useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import { LOGIN_WITH_GOOGLE, LOGIN } from "../../gql/user.js";

import { setToken, decodeToken } from "../../utils/token.utils";
import { isAuth } from "../../utils/auth.utils.js";
import useAuth from "../../hooks/useAuth";
import AppNav from "../../routes/app/Navigation.jsx";

import { toast } from "react-toastify";

import Cody from "../../assets/cody/Login.png";
import "../../styles/styles.css";
import enviroment from "../../config/env.json";

import BG from "../components/backgrounds/Background-Icons.jsx";

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export default function Login() {
  const [googleSignIn] = useMutation(LOGIN_WITH_GOOGLE);
  const [login] = useMutation(LOGIN);

  const history = useHistory();
  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: null,
    onSubmit: async (formData, { resetForm }) => {
      const { email, password } = formData;

      const schema = Yup.object().shape({
        password: Yup.string().required("¡Contraseña Obligatoria!"),
        email: Yup.string()
          .required("¡Correo Electrónico Obligatorio!")
          .email("Necesitas un Correo Electrónico Valido!"),
      });

      const isValid = await schema
        .validate({ email, password })
        .catch(function (err) {
          toast.error(err.errors[0]);
        });

      if (isValid) {
        try {
          // Destructurando Objeto
          const { email, password } = formData;
          const credentials = { email, password };

          // Mandando datos al servidor
          const { data } = await login({
            variables: {
              input: credentials,
            },
          });

          console.log("respuesta: ", data);

          const { token } = data.login;
          setToken(token);
          setUser(decodeToken(token));

          // Obteniendo Respuesta
          toast.success("Usuario Logueado con Exito", {
            onOpen: () => {
              window.location.reload();
            },
          });

          // Reseteando Form
          resetForm({
            email: "",
            password: "",
          });
        } catch (error) {
          toast.error(error.message);
        }
      }
    },
  });

  // Enviar token para Iniciar Sesion con Google
  const sendGoogleToken = async (tokenId) => {
    try {
      const { data } = await googleSignIn({
        variables: {
          input: {
            token: tokenId,
          },
        },
      });

      console.log("respuestaGoogle: ", data);
      const { token } = data.googleSignIn;
      setToken(token);
      setUser(decodeToken(token));

      // Obteniendo Respuesta
      toast.success("Usuario Logueado con Google", {
        onOpen: () => {
          window.location.reload();
        },
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // Enviando tokenId a Servidor
  const responseGoogle = (response) => {
    // console.log(response);
    sendGoogleToken(response.tokenId);
  };

  return (
    <div>
      <div className="flex-center bg-animation">
        <BG />
        <div className="login__cont-form z-index">
          {/*<!-- ===== CONT IZQUIERDO ===== -->*/}
          <div className="left">
            <div className="form__cont-login">
              <div className="form-login">
                <h1>Iniciar Sesión</h1>
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
                    <input
                      type="password"
                      className="form__input"
                      placeholder=" "
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <label
                      htmlFor="password"
                      for="password"
                      className="form__label"
                    >
                      Contraseña
                    </label>
                    <i className="fas fa-lock icon"></i>
                  </div>
                  <div className="form__div">
                    <button className="reset-button btn-submit" type="submit">
                      Entrar
                    </button>
                  </div>
                  {/*SEPARADOR*/}
                  <div className="form__forgot-password">
                    <span>
                      <Link to="/users/password/forget">
                        Olvidaste tu Contraseña?
                      </Link>
                    </span>
                  </div>

                  <div className="form__div separador">
                    <hr />
                    <span className="login">Ó Iniciar Sesión con:</span>
                  </div>

                  <div className="form__div">
                    <GoogleLogin
                      clientId={`${enviroment.REACT_APP_GOOGLE_CLIENT}`}
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={"single_host_origin"}
                      render={(renderProps) => (
                        <button
                          className="reset-button btn-google"
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                        >
                          Entrar con Google
                        </button>
                      )}
                    ></GoogleLogin>
                    <i className="bx bxl-google btn-icon"></i>
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

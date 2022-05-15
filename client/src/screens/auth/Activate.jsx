import React from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { useFormik } from "formik";

import { useMutation } from "@apollo/client";
import { ACTIVATE_ACCOUNT } from "../../gql/user.js";

import { toast } from "react-toastify";

import Cody from "../../assets/cody/Activate.png";
import "../../styles/styles.css";

import BG from "../components/backgrounds/Background-Icons.jsx";

export default function Activate({ match, history }) {
  const [activate] = useMutation(ACTIVATE_ACCOUNT);

  const token = match.params.token;
  const { username } = jwt_decode(token);

  const formik = useFormik({
    initialValues: {
      token: "",
      username: "",
      show: "",
    },
    validationSchema: null,
    onSubmit: async () => {
      try {
        const result = await activate({
          variables: {
            input: { token },
          },
        });

        console.log("result: ", result);
        toast.success("¡Tu cuenta ha sido activada 😃!", {
          autoClose: 2000,
          onClose: () => {
            history.push("/login");
          },
        });
      } catch (error) {
        toast.error(error.message);
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
                <h1>
                  Bienvenido <i>{username}</i>
                </h1>
                <form onSubmit={formik.handleSubmit}>
                  <div className="form__div">
                    <button className="reset-button btn-submit" type="submit">
                      Activar Cuenta
                    </button>
                  </div>

                  <div className="form__div separador">
                    <hr />
                    <span className="login">¿Tu token expiró?</span>
                  </div>

                  <div className="form__div">
                    <Link className="reset-button btn-google" to="/register">
                      Regístrarse
                    </Link>
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

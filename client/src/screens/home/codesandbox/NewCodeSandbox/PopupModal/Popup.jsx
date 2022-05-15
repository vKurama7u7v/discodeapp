import React from "react";
import { map } from "lodash";

import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import { NEW_SANDBOX } from "../../../../../gql/codeSandbox";

import LanguageList from "../LanguageList/LanguagesList.jsx";

import "./popup.styles.css";
export default function Popup(props) {
  const { show, setShow, getLanguages, refetch } = props;
  const [newCodeSandbox] = useMutation(NEW_SANDBOX);

  const onClose = () => {
    setShow(false);
    resetInputRadio();
  };

  const resetInputRadio = () => {
    document.querySelector('input[name="language"]:checked').checked = false;
  };

  var formik = useFormik({
    initialValues: {
      name: "",
      language: "",
      icon: "",
      name_language: "",
    },
    validationSchema: null,
    onSubmit: async (formData, { resetForm }) => {
      let valueInputRadio = null;
      let img = null;
      let nameLanguage = null;

      try {
        // Obteniendo valor del input:radio => Lenguaje
        valueInputRadio = document.querySelector(
          'input[name="language"]:checked'
        ).value;

        // Obteniendo valor del input:radio => Icon & Name
        map(getLanguages, (item) => {
          if (item.language === valueInputRadio) {
            img = item.icon;
            nameLanguage = item.name;
          }
        });
      } catch (nulo) {
        valueInputRadio = "";
        img = "";
        nameLanguage = "";
      }

      // Asignandole Valores
      formData.language = valueInputRadio;
      formData.icon = img;
      formData.name_language = nameLanguage;

      // Destructurando
      const { name, language, icon, name_language } = formData;

      // Estableciendo Validaciones
      const schema = Yup.object().shape({
        name_language: Yup.string().required(),
        icon: Yup.string().required(),
        language: Yup.string().required("¡Debes Seleccionar un Lenguaje!"),
        name: Yup.string()
          .required("¡Debes Asignarle un Nombre a tu Sandbox!")
          .min(5, "Necesitas un nombre de 5 a 30 Carácteres")
          .max(31, "Necesitas un nombre de 5 a 30 Carácteres"),
      });

      // Validando campos
      const isValid = await schema
        .validate({
          name,
          language,
          icon,
          name_language,
        })
        .catch(function name(err) {
          toast.info(err.errors[0]);
        });

      // Validaciones Correctas
      if (isValid) {
        try {
          const { name, language, icon, name_language } = formData;

          const result = await newCodeSandbox({
            variables: {
              input: {
                name,
                language,
                icon,
                name_language,
              },
            },
          });

          toast.success("Sandbox creada con Exito!");

          // Resetenado Form
          resetForm({
            name: "",
            language: "",
            icon: "",
            name_language: "",
          });

          refetch();
          onClose();
        } catch (error) {
          toast.error(error.message);
        }
      }
    },
  });

  return (
    <div className={show ? "wrapper-popup active" : "wrapper-popup"}>
      <div className="popup_wrap">
        <div className="shadow close_btn"></div>
        <div className="popup">
          <div className="header">
            <h3 className="title">Crear Nueva Sandbox</h3>
            <span className="icon" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>

          <form className="container" onSubmit={formik.handleSubmit}>
            <div className="container__body">
              <div className="container_name_wrap">
                <p className="label_title">Nombre Sandbox</p>
                <input
                  type="text"
                  className="input_text"
                  name="name"
                  placeholder="Nombre Sandbox..."
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>

              <div>
                <LanguageList getLanguages={getLanguages} />
              </div>
            </div>

            <div class="footer">
              <div class="btn_wrap">
                <button
                  class="cancel_btn close_btn"
                  type="button"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button class="create_btn" type="submit">
                  Crear CodeSandbox
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

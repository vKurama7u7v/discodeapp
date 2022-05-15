import React from "react";
import { toast } from "react-toastify";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { UPDATE_INFO_USER, GET_USER } from "../../../../../gql/user";

export default function InformationForm(props) {
  const { getUser } = props;
  const { username } = getUser;

  const [updateInfoUser] = useMutation(UPDATE_INFO_USER, {
    update(cache, { data: { updateInfoUser } }) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: username },
      });

      cache.writeQuery({
        query: GET_USER,
        variables: { username: username },
        data: {
          getUser: {
            ...getUser,
            first_name: updateInfoUser.first_name,
            last_name: updateInfoUser.last_name,
            description: updateInfoUser.description,
          },
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      first_name: getUser.first_name,
      last_name: getUser.last_name,
      description: getUser.description
        ? getUser.description
        : "Descripción de 50 Carácteres",
    },
    validationSchema: null,
    onSubmit: async (formData, { resetForm }) => {
      const { first_name, last_name, description } = formData;

      const schema = Yup.object().shape({
        description: Yup.string().max(
          50,
          "¡La Descripción debe contener 50 Carácteres!"
        ),
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
          description,
        })
        .catch(function (err) {
          toast.error(err.errors[0]);
        });

      if (isValid) {
        try {
          const { first_name, last_name, description } = formData;
          const payload = { first_name, last_name, description };

          const result = await updateInfoUser({
            variables: {
              input: payload,
            },
          });

          toast.success("¡Información Actualizada con Exito!");
        } catch (error) {
          toast.error(error.message);
        }
      }
    },
  });

  return (
    <div className="form">
      <h2>Información</h2>
      <form onSubmit={formik.handleSubmit}>
        {/*NOMBRE*/}
        <div className="form__div">
          <input
            type="text"
            className="form__input"
            placeholder=""
            onChange={formik.handleChange}
            value={formik.values.first_name}
            name="first_name"
          />
          <label htmlFor="first_name" className="form__label">
            Nombre(s)
          </label>
        </div>

        {/*APELLIDO*/}
        <div className="form__div">
          <input
            type="text"
            className="form__input"
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.last_name}
            name="last_name"
          />
          <label htmlFor="last_name" className="form__label">
            Apellido(s)
          </label>
        </div>

        {/*Biografía*/}
        <div className="form__div textarea">
          <input
            type="text"
            className="form__input"
            placeholder=" "
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <label htmlFor="description" className="form__label">
            Descripción
          </label>
        </div>
        <div className="form__div buttons">
          <button className="reset btn-primary" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

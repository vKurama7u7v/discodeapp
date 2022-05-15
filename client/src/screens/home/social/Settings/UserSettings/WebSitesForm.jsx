import React from "react";
import { toast } from "react-toastify";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { UPDATE_CONTACT_USER, GET_USER } from "../../../../../gql/user";

export default function WebSitesForm(props) {
  const { getUser } = props;
  const { username } = getUser;

  const [updateContactUser] = useMutation(UPDATE_CONTACT_USER, {
    update(cache, { data: { updateContactUser } }) {
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
            siteWeb: updateContactUser.siteWeb,
            linkedinWeb: updateContactUser.linkedinWeb,
            githubWeb: updateContactUser.githubWeb,
            dribbbleWeb: updateContactUser.dribbbleWeb,
          },
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      siteWeb: getUser.siteWeb ? getUser.siteWeb : "",
      linkedinWeb: getUser.linkedinWeb ? getUser.linkedinWeb : "",
      githubWeb: getUser.githubWeb ? getUser.githubWeb : "",
      dribbbleWeb: getUser.dribbbleWeb ? getUser.dribbbleWeb : "",
    },
    validationSchema: null,
    onSubmit: async (formData, { resetForm }) => {
      try {
        const { siteWeb, linkedinWeb, githubWeb, dribbbleWeb } = formData;
        const payload = {
          siteWeb,
          linkedinWeb,
          githubWeb,
          dribbbleWeb,
        };

        const result = await updateContactUser({
          variables: {
            input: payload,
          },
        });

        toast.success("¡Información Actualizada Correctamente!");
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="form">
      <h2>Conecta</h2>
      <form onSubmit={formik.handleSubmit}>
        {/*WEBSITE*/}
        <div className="form__div">
          <input
            type="text"
            className="form__input"
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.siteWeb}
            name="siteWeb"
          />
          <label htmlFor="siteWeb" className="form__label">
            Sitio Web
          </label>
        </div>

        {/*LINKEDIN*/}
        <div className="form__div">
          <input
            type="text"
            className="form__input"
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.linkedinWeb}
            name="linkedinWeb"
          />
          <label htmlFor="linkedinWeb" className="form__label">
            LinkedIn
          </label>
        </div>

        {/*DRIBBBLE*/}
        <div className="form__div">
          <input
            type="text"
            className="form__input"
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.dribbbleWeb}
            name="dribbbleWeb"
          />
          <label htmlFor="dribbbleWeb" className="form__label">
            Dribbble
          </label>
        </div>

        {/*GITHUB*/}
        <div className="form__div">
          <input
            type="text"
            className="form__input"
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.githubWeb}
            name="githubWeb"
          />
          <label htmlFor="githubWeb" className="form__label">
            GitHub
          </label>
        </div>
        <div className="form__div">
          <button className="reset btn-primary" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

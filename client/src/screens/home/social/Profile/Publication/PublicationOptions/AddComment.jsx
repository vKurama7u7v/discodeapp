import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../../../../../gql/comment";
import { toast } from "react-toastify";

export default function AddComment(props) {
  const { post } = props;
  const [addComment] = useMutation(ADD_COMMENT);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: null,
    onSubmit: async (formData, { resetForm }) => {
      const { comment } = formData;

      const schema = Yup.object().shape({
        comment: Yup.string().required("Campo Vacio"),
      });

      const isValid = await schema.validate({ comment }).catch(function (err) {
        toast.info(err.errors[0]);
      });

      if (isValid) {
        try {
          const { comment } = formData;
          await addComment({
            variables: {
              input: {
                idPublication: post.id,
                comment: comment,
              },
            },
          });
        } catch (error) {
          console.log(error);
        }

        resetForm({
          comment: "",
        });
      }
    },
  });
  return (
    <div className="add__comentario">
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          className="reset comment"
          placeholder="Añadir Comentario..."
          name="comment"
          onChange={formik.handleChange}
          value={formik.values.comment}
        />
        <button className="btn-comment" type="submit">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}

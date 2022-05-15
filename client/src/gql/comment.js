import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation AddComment($input: CommentInput) {
    addComment(input: $input) {
      idPublication
      idUser {
        id
      }
      comment
      createdAt
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($idPublication: ID!) {
    getComments(idPublication: $idPublication) {
      idPublication
      comment
      createdAt
      idUser {
        id
        username
        first_name
        last_name
        avatar
      }
    }
  }
`;

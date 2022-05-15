import { gql } from "@apollo/client";

export const ADD_LIKE = gql`
  mutation AddLike($idPublication: ID!) {
    addLike(idPublication: $idPublication)
  }
`;

export const IS_LIKE = gql`
  query Query($idPublication: ID!) {
    isLike(idPublication: $idPublication)
  }
`;

export const REMOVE_LIKE = gql`
  mutation RemoveLike($idPublication: ID!) {
    removeLike(idPublication: $idPublication)
  }
`;

export const COUNT_LIKES = gql`
  query Query($idPublication: ID!) {
    countLikes(idPublication: $idPublication)
  }
`;

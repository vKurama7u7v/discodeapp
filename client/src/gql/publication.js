import { gql } from "@apollo/client";

export const AUTHORIZE_FILE = gql`
  mutation Mutation($file: Upload) {
    authorizeFile(file: $file) {
      id
      status
    }
  }
`;

export const PUBLISH = gql`
  mutation Publish($input: PublishInput) {
    publish(input: $input) {
      id
      status
    }
  }
`;

export const GET_PUBLICATIONS = gql`
  query GetPublications($username: String!) {
    getPublications(username: $username) {
      id
      idUser
      idCloud
      description
      file
      typeFile
      createdAt
    }
  }
`;

export const GET_POST_INFO = gql`
  query GetPostInfo($getPostInfoId: ID!) {
    getPostInfo(id: $getPostInfoId) {
      id
      idUser
      idCloud
      description
      file
      typeFile
      createdAt
    }
  }
`;

export const GET_PUBLICATIONS_FOLLOWS = gql`
  query Publication {
    getPublicationsFollows {
      publication {
        id
        idUser {
          id
          username
          first_name
          last_name
          avatar
        }
        idCloud
        description
        file
        typeFile
        createAt
      }
      comments
      likes
    }
  }
`;

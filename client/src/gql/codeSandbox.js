import { gql } from "@apollo/client";

export const GET_LANGUAGES = gql`
  query GetLanguages($status: Boolean!) {
    getLanguages(status: $status) {
      id
      name
      language
      category
      icon
      createdAt
    }
  }
`;

export const NEW_SANDBOX = gql`
  mutation NewCodeSandbox($input: SandboxInput) {
    newCodeSandbox(input: $input) {
      id
      idUser
      name
      language
      name_language
      icon
      createdAt
      updatedAt
    }
  }
`;

export const GET_CODE_SANDBOXES = gql`
  query GetCodeSandboxes($status: Boolean!) {
    getCodeSandboxes(status: $status) {
      updatedAt
      createdAt
      icon
      name_language
      content {
        name
        content
      }
      language
      name
      idUser
      id
    }
  }
`;

export const GET_SANDBOX_DATA = gql`
  query GetCodeSandbox($getCodeSandboxId: ID!) {
    getCodeSandbox(id: $getCodeSandboxId) {
      id
      idUser
      name
      language
      content {
        name
        content
      }
      name_language
      icon
      createdAt
      updatedAt
    }
  }
`;

export const SAVE_SANDBOX = gql`
  mutation SaveSandbox($saveSandboxId: ID!, $files: [FilesSandboxInput]) {
    saveSandbox(id: $saveSandboxId, files: $files) {
      id
      status
    }
  }
`;

export const DELETE_SANDBOX = gql`
  mutation RemoveSandbox($removeSandboxId: ID!) {
    removeSandbox(id: $removeSandboxId) {
      id
      status
    }
  }
`;

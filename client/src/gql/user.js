import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($input: UserInput) {
    register(input: $input) {
      id
      username
      first_name
      last_name
      email
      password
    }
  }
`;

export const ACTIVATE_ACCOUNT = gql`
  mutation Activate($input: ActivateInput) {
    activate(input: $input) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      token
    }
  }
`;

export const LOGIN_WITH_GOOGLE = gql`
  mutation GoogleSignIn($input: GoogleSignInInput) {
    googleSignIn(input: $input) {
      token
    }
  }
`;

export const FORGET = gql`
  mutation Forgot($input: ForgotInput) {
    forgot(input: $input) {
      email
    }
  }
`;

export const RESET = gql`
  mutation Reset($input: ResetPassInput) {
    reset(input: $input) {
      resetPasswordLink
      password
    }
  }
`;

export const GET_USER = gql`
  query GetUser($getUserId: ID, $username: String) {
    getUser(id: $getUserId, username: $username) {
      id
      username
      avatar
      role
      email
      first_name
      last_name
      siteWeb
      linkedinWeb
      githubWeb
      dribbbleWeb
      description
      updatedAt
      createdAt
      is_active
      is_staff
      is_superuser
    }
  }
`;

export const UPLOAD_AVATAR = gql`
  mutation UpdateAvatar($file: Upload) {
    updateAvatar(file: $file) {
      id
      urlAvatar
      status
    }
  }
`;

export const DESTROY_AVATAR = gql`
  mutation DestroyAvatar($input: IdentifierInput) {
    destroyAvatar(input: $input) {
      status
      id
    }
  }
`;

export const CHANGE_AVATAR = gql`
  mutation ChangeAvatar($input: AvatarInput) {
    changeAvatar(input: $input) {
      id
      urlAvatar
      status
    }
  }
`;

export const UPDATE_INFO_USER = gql`
  mutation UpdateInfoUser($input: InfoUserInput) {
    updateInfoUser(input: $input) {
      first_name
      last_name
      description
    }
  }
`;

export const UPDATE_CONTACT_USER = gql`
  mutation UpdateContactUser($input: ContactUserInput) {
    updateContactUser(input: $input) {
      dribbbleWeb
      githubWeb
      linkedinWeb
      siteWeb
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: PasswordInput) {
    changePassword(input: $input) {
      id
      status
    }
  }
`;

export const SEARCH_USER = gql`
  query SearchUsers($search: String) {
    searchUsers(search: $search) {
      username
      first_name
      last_name
      avatar
    }
  }
`;

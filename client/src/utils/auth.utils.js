import { getToken } from "./token.utils";

export const isAuth = () => {
  return getToken();
};

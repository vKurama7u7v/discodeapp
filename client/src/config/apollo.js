import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { getToken } from "../utils/token.utils";
import process from "./env.json";

const httpLink = createUploadLink({
  uri: `${process.APOLLO_SERVER}`,
  // uri: "https://git.heroku.com/discodeappserver.git",
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;

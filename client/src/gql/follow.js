import { gql } from "@apollo/client";

export const IS_FOLLOW = gql`
  query Query($username: String!) {
    isFollow(username: $username)
  }
`;

export const FOLLOW = gql`
  mutation Follow($username: String!) {
    follow(username: $username)
  }
`;

export const UNFOLLOW = gql`
  mutation Unfollow($username: String!) {
    unfollow(username: $username)
  }
`;

export const GET_FOLLOWERS = gql`
  query GetFollowers($username: String!) {
    getFollowers(username: $username) {
      username
      first_name
      last_name
      avatar
    }
  }
`;

export const GET_FOLLOWS = gql`
  query GetFollows($username: String!) {
    getFollows(username: $username) {
      username
      first_name
      last_name
      avatar
    }
  }
`;

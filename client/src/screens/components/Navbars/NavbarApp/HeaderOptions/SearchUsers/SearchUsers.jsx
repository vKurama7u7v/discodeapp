import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { size, map } from "lodash";
import { useQuery } from "@apollo/client";
import { SEARCH_USER } from "../../../../../../gql/user";

import Avatar from "../../../../../../assets/png/avatar.png";
import "./search-users.styles.css";

export default function SearchUser() {
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);
  const { data, loading } = useQuery(SEARCH_USER, {
    variables: {
      search,
    },
  });

  useEffect(() => {
    if (size(data?.searchUsers) > 0) {
      const users = [];
      data.searchUsers.forEach((user, index) => {
        users.push({
          key: index,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          avatar: user.avatar,
        });
      });
      setResults(users);
    } else {
      setResults([]);
    }
  }, [data]);

  const onChange = (e) => {
    if (e.target.value) setSearch(e.target.value);
    else setSearch(null);
  };

  const handleResultSelect = () => {
    setSearch(null);
    setResults([]);
  };

  return (
    <div className="wrapper">
      <div className="search-input">
        {/* <a href="" hidden></a> */}
        <input
          type="search"
          placeholder="Buscar Usuario..."
          value={search || ""}
          onChange={onChange}
        />
        <div className="autocom-box">
          {loading ? (
            <LoadingSearchUsers />
          ) : (
            <ResultsSearchUsers data={results} onClick={handleResultSelect} />
          )}
        </div>
        <div className="icon">
          <i className="fas fa-search"></i>
        </div>
      </div>
    </div>
  );
}

function ResultsSearchUsers(props) {
  const { data, onClick } = props;

  if (!(size(data) > 0)) return null;
  return (
    <div onClick={onClick}>
      {map(data, (user, index) => (
        <li>
          <Link to={`/profile/${user.username}`} className="item-username">
            <div className="avatar">
              <img
                src={user.avatar ? user.avatar : Avatar}
                alt={user.username}
              />
            </div>
            <span className="info-user">
              <span className="name">
                {user.first_name} {user.last_name}
              </span>
              <br />
              <span className="username">@{user.username}</span>
            </span>
          </Link>
        </li>
      ))}
    </div>
  );
}

function LoadingSearchUsers() {
  return (
    <li>
      <h3>Buscando Usuarios...</h3>
    </li>
  );
}

import React from "react";
import { size, map } from "lodash";

import Programming from "./Types/Programming.jsx";
import Web from "./Types/Web.jsx";
import Database from "./Types/Database.jsx";

export default function LanguageList(props) {
  const { getLanguages } = props;

  const ProgrammingList = [];
  const WebList = [];
  const DataBaseList = [];

  const PushType = () => {
    map(getLanguages, (item) => {
      if (item.category === "programming") {
        ProgrammingList.push(item);
      } else if (item.category === "web") {
        WebList.push(item);
      } else if (item.category === "database") {
        DataBaseList.push(item);
      }
    });
  };

  PushType();

  return (
    <div className="programming_type_wrap">
      <Programming programming={ProgrammingList} />
      <Web web={WebList} />
      <Database database={DataBaseList} />
    </div>
  );
}

import React, { useCallback, useState } from "react";
import Folder from "./folder";
import Grid from "@material-ui/core/Grid";
export default function FoldersWrapper() {
  const [infos, setInfos] = useState([
    {
      title: "Academic",
      id: 0,
    },
    {
      title: "Design",
      id: 1,
    },
    {
      title: "Reading",
      id: 2,
    },
    {
      title: null,
      id: 3,
    },
  ]);

  return (
    <div className="folders-wrapper">
      {infos.map((info) => (
        <Folder key={info.title} info={info} />
      ))}
    </div>
  );
}

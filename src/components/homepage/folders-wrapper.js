import React, { useCallback, useState, useRef } from "react";
//import Folder from "./folder";
import Grid from "@material-ui/core/Grid";
import AddFolder from "./folder";

export default function FoldersWrapper() {
  const Folder = (info) => {
    console.log(info.info.title);
    return (
      <>
        {/* {info.title ? ( */}
        <div className="folder-wrapper">
          <div className="folder-title">{info.info.title}</div>
        </div>
        {/* ) : (
          <AddFolder />
        )} */}
      </>
    );
  };
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
    // {
    //   title: null,
    //   id: 3,
    // },
  ]);
  const nextId = useRef(3);
  const onInsert = useCallback(
    (title) => {
      const info = {
        title,
        id: nextId.current,
      };
      setInfos(infos.concat(info));
      nextId.current += 1;
    },
    [infos]
  );
  return (
    <div className="folders-wrapper">
      {infos.map((info) => (
        <Folder key={info.title} info={info} />
      ))}
      <AddFolder onInsert={onInsert} />
    </div>
  );
}

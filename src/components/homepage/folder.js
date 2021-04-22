import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";

export default function Folder({ folder }) {
  const { jiggle, selectedFolderId, setSelectedFolderId } = useContext(
    UserContext
  );
  const handleClick = (id) => {
    setSelectedFolderId(id);
  };
  return (
    <div
      className={
        jiggle
          ? "folder-wrapper not-hoverable"
          : folder.id === selectedFolderId
          ? "folder-wrapper hoverable clicked"
          : "folder-wrapper hoverable"
      }
    >
      <div className="folder-title" onClick={() => handleClick(folder.id)}>
        {folder.title}
      </div>
    </div>
  );
}

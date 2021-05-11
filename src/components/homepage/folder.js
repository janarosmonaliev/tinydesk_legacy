import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";
const Folder = ({ folder }) => {
  const { jiggle, selectedFolderId, setSelectedFolderId } = useContext(
    UserContext
  );
  const handleClick = (_id) => {
    setSelectedFolderId(_id);
  };
  return (
    <div
      className={
        jiggle
          ? "folder-wrapper not-hoverable"
          : folder._id === selectedFolderId
          ? "folder-wrapper hoverable clicked"
          : "folder-wrapper hoverable"
      }
    >
      <div
        className="folder-title"
        id={folder._id}
        onClick={() => handleClick(folder._id)}
      >
        {folder.title}
      </div>
    </div>
  );
};
export default React.memo(Folder);

import React from "react";

export default function Folders({ folders, setSelectedFolderId, jiggle }) {
  const handleClick = (id) => {
    setSelectedFolderId(id);
  };
  return (
    <>
      {folders.map((folder) => (
        <a className={jiggle ? "folder-wrapper jiggle" : "folder-wrapper"}>
          <div className="folder-title" onClick={() => handleClick(folder.id)}>
            {folder.title}
          </div>
        </a>
      ))}
    </>
  );
}

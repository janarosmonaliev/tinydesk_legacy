import React from "react";

export default function Folders({
  folders,
  // selectedFolderId,
  setSelectedFolderId,
}) {
  const handleClick = (id) => {
    setSelectedFolderId(id);
  };
  return (
    <>
      {folders.map((folder) => (
        <a className="folder-wrapper">
          <div className="folder-title" onClick={() => handleClick(folder.id)}>
            {folder.title}
          </div>
        </a>
      ))}
    </>
  );
}

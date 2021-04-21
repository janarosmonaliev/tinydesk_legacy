import React from "react";

export default function Folder({
  folder,
  selectedFolderId,
  setSelectedFolderId,
  jiggle,
}) {
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

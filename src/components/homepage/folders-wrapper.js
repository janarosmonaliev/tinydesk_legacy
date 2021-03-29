import React from "react";
import Folder from "./folder";

export default function FoldersWrapper() {
  return (
    <div className="folders-wrapper">
      <Folder folderName="Home" />
      <Folder folderName="Academic" />
      <Folder folderName="Other" />
    </div>
  );
}

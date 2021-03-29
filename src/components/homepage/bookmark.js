import React from "react";

export default function Bookmark(props) {
  const handleClick = (url) => {
    window.open(url, "_blank", "noopener noreferrer");
  };
  return (
    <div className="bookmark-wrapper" onClick={() => handleClick(props.url)}>
      <img src={props.thumbnail} width="80" height="80"></img>
      <small>{props.name}</small>
    </div>
  );
}

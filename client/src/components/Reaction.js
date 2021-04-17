import React from "react";

export default function Reaction({ onClick = null, icon: Icon, text }) {
  return (
    <button className="btn p-0 me-1" onClick={onClick}>
      <Icon />
      <small className="ms-1">{text}</small>
    </button>
  );
}

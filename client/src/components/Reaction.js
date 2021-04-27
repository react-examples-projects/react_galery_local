import React from "react";
import PropTypes from "prop-types";

function Reaction({ onClick = null, icon: Icon, text }) {
  return (
    <button className="btn p-0 me-1" onClick={onClick}>
      <Icon />
      <small className="ms-1">{text}</small>
    </button>
  );
}

Reaction.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func,
};

export default Reaction;

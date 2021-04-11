import PropTypes from "prop-types";
import React from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import TextError from "../components/TextError";

function ReactionsCount({
  onReaction,
  likes = 0,
  dislikes = 0,
  isError = false,
}) {
  const onDislikes = () => onReaction(false);
  return (
    <div>
      <button className="btn p-0 me-1 ms-auto" onClick={onReaction}>
        <BiLike />
        <small className="ms-1">{likes}</small>
      </button>

      <button className="btn p-0 me-1" onClick={onDislikes}>
        <BiDislike />
        <small className="ms-1">{dislikes}</small>
      </button>
      {isError && <TextError text="Ocurrió un error" />}
    </div>
  );
}

ReactionsCount.propTypes = {
  onReaction: PropTypes.func.isRequired,
  likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dislikes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isError: PropTypes.bool,
};

export default ReactionsCount;

import PropTypes from "prop-types";
import React from "react";
import { BiLike, BiDislike, BiCommentDetail } from "react-icons/bi";
import Reaction from "./Reaction";
import TextError from "../components/TextError";

function ReactionsCount({
  onReaction,
  likes = 0,
  dislikes = 0,
  isError = false,
  comments = 0,
  children,
}) {
  const onDislikes = () => onReaction(false);
  return (
    <div className="d-flex">
      <Reaction onClick={onReaction} icon={BiLike} text={likes} />
      <Reaction onClick={onDislikes} icon={BiDislike} text={dislikes} />
      <Reaction icon={BiCommentDetail} text={comments} />
      {children}
      {isError && <TextError text="Ocurrió un error" />}
    </div>
  );
}

ReactionsCount.propTypes = {
  onReaction: PropTypes.func.isRequired,
  likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dislikes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  comments: PropTypes.number.isRequired,
  isError: PropTypes.bool,
};

export default ReactionsCount;

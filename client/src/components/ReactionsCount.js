import React from "react";
import { BiLike, BiDislike } from "react-icons/bi";

export default function ReactionsCount({
  onLike = null,
  onDislike = null,
  likes = 0,
  dislikes = 0,
}) {
  return (
    <div>
      <button className="btn p-0 me-1 ms-auto" onClick={onLike}>
        <BiLike />
        <small className="ms-1">{likes}</small>
      </button>

      <button className="btn p-0 me-1" onClick={onDislike}>
        <BiDislike />
        <small className="ms-1">{dislikes}</small>
      </button>
    </div>
  );
}

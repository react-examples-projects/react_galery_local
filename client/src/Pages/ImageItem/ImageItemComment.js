import React from "react";
import css from "./css/ImageItem.module.css";
import { BiLike, BiDislike } from "react-icons/bi";
import { likeComment } from "../../helpers/api";

export default function ImageItemComment({
  _id,
  username,
  content,
  date,
  likes,
  dislikes,
  setComments,
}) {
  const handleLike = async () => {
    try {
      const data = await likeComment(_id);
      setComments((comments) => {
        const copy = [...comments];
        const comment = copy.find((comment) => comment._id === _id);
        comment.likes = data.data.likes;
        console.log(comment);
        return copy;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = () => {};
  return (
    <div className={`p-3 mb-4 bg-dark rounded shadow-sm ${css.comment}`}>
      <p className="text-capitalize fw-bolder mb-2">{username}</p>
      <div
        style={{ fontSize: "14px" }}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />

      <div className="me-auto d-flex align-items-center justify-content-between">
        <time className="text-muted d-block" dateTime={date}>
          <small
            className="text-muted"
            style={{
              fontSize: ".675em",
            }}
          >
            {date}
          </small>
        </time>
        <div>
          <small className="me-3 d-inline-block">
            <button className="btn btn-sm p-0" onClick={handleLike}>
              <BiLike />
              <span className="ms-1 d-inline-block">{likes}</span>
            </button>
          </small>

          <small>
            <button className="btn btn-sm p-0">
              <BiDislike />
              <span className="ms-1 d-inline-block">{dislikes}</span>
            </button>
          </small>
        </div>
      </div>
    </div>
  );
}

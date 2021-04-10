import React from "react";
import css from "./css/ImageItem.module.css";
import { BiLike, BiDislike } from "react-icons/bi";

export default function ImageItemComment({
  username,
  content,
  date,
  likes,
  dislikes,
}) {
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
            <button className="btn btn-sm p-0">
              <BiLike />
            </button>
            <span className="ms-1 d-inline-block">{likes}</span>
          </small>

          <small>
            <button className="btn btn-sm p-0">
              <BiDislike />
            </button>
            <span className="ms-1 d-inline-block"> {dislikes}</span>
          </small>
        </div>
      </div>
    </div>
  );
}

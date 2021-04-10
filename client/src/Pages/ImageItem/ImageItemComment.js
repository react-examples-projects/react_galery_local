import React from "react";
import css from "./css/ImageItem.module.css";

export default function ImageItemComment({ username, content, date }) {
  return (
    <div className={`p-3 mb-4 bg-dark rounded shadow-sm ${css.comment}`}>
      <p className="text-capitalize fw-bolder mb-2">{username}</p>
      <div
        style={{ fontSize: "14px" }}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <time className="text-muted mt-2 d-block" dateTime={date}>
        <small
          style={{
            fontSize: ".675em",
          }}
        >
          {date}
        </small>
      </time>
    </div>
  );
}

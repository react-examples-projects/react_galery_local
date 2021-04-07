import React from "react";

export default function ImageItemComment({ username, content, date }) {
  return (
    <div className="p-3 mb-4 border rounded shadow-sm">
      <p className="text-capitalize fw-bolder mb-2">{username}</p>
      <div
        style={{ fontSize: "14px" }}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <time className="text-muted" dateTime={date}>
        <small>{date}</small>
      </time>
    </div>
  );
}

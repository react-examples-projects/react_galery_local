import { useState, useEffect } from "react";
import { getCommentsByPost } from "../../helpers/api";
import { useParams } from "react-router-dom";

export default function ImageItemComments() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getComments() {
      const comments = await getCommentsByPost(id);
      setComments(comments.data);
    }
    getComments();
  }, []);

  return (
    <div className="mb-5">
      {comments.map((comment) => {
        return (
          <div key={comment._id} className="p-3 mb-4 border rounded shadow-sm">
            <p className="text-capitalize fw-bolder mb-2">{comment.username}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: comment.content,
              }}
            />
            <time className="text-muted" dateTime={comment.date}>
              <small>{comment.date}</small>
            </time>
          </div>
        );
      })}
    </div>
  );
}

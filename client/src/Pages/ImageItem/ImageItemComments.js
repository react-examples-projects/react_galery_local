import useComments from "../../hooks/useComments";

export default function ImageItemComments() {
  const { comments } = useComments();
  return (
    <div className="mb-5">
      {comments.map((comment) => {
        return (
          <div key={comment._id} className="p-3 mb-4 border rounded shadow-sm">
            <p className="text-capitalize fw-bolder mb-2">{comment.username}</p>
            <div
              style={{ fontSize: "14px" }}
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

import useComments from "../../hooks/useComments";
import Loader from "react-loader-spinner";

export default function ImageItemComments() {
  const { comments, isLoading, isError } = useComments();

  if (isLoading) {
    return (
      <Loader
        type="Oval"
        color="#000000b2"
        height={40}
        width={40}
        className="d-flex justify-content-center"
        style={{ marginTop: "2rem", marginBottom: "4rem" }}
      />
    );
  }

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

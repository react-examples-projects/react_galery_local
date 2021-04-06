import useComments from "../../hooks/useComments";
import Loader from "react-loader-spinner";
import { BiError } from "react-icons/bi";

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

  if (isError) {
    return (
      <div className="alert alert-danger mb-5">
        <h6 className="text-danger mb-0 text-center d-flex align-items-center justify-content-center">
          <BiError />
          <span className="ms-1">Ocurrió un error obtener los comentarios</span>
        </h6>
      </div>
    );
  }

  if (!comments.length) {
    return (
      <h6 className="mb-5 p-3 border rounded text-center shadow-sm">
        Nadie ha comentado aún, sé el primero en hacerlo
      </h6>
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

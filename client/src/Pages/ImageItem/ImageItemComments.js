import Loader from "react-loader-spinner";
import AlertError from "../../components/AlertError";
import ImageItemComment from "./ImageItemComment";

export default function ImageItemComments({ comments, isLoading, isError }) {
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
      <AlertError
        text="Ocurrió un error obtener los comentarios"
        style={{ marginBottom: "5rem" }}
      />
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
        return <ImageItemComment key={comment._id} {...comment} />;
      })}
    </div>
  );
}

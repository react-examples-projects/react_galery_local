import useImagesItem from "../../hooks/useImageItem";
import Loader from "react-loader-spinner";
import css from "./ImageItem.module.css";
import SunEditor from "suneditor-react";
import ImageItemComments from "./ImageItemComments";

export default function ImageItem() {
  const {
    postImage,
    isLoading,
    isError,
    handleSubmit,
    refEditor,
  } = useImagesItem();

  if (isLoading) {
    return (
      <Loader
        type="Oval"
        color="#000000b2"
        height={80}
        width={80}
        className="d-flex justify-content-center"
        style={{ marginTop: "22rem" }}
      />
    );
  }

  if (isError) {
    return <h4>Ocurrió un error al consultar el post</h4>;
  }
  const { title, url, date } = postImage.data;

  return (
    <div className={`container mt-5 ${css.container}`}>
      <h2 className="mb-3 text-capitalize">{title}</h2>
      <time dateTime={date} className="d-block text-muted mb-2 fw-normal">
        Published at <small>{date}</small>
      </time>
      <img
        src={url}
        className="img-flud w-100 rounded"
        alt={"Post upload at " + date}
      />
      <h5 className="my-3">Let your comments</h5>
      <hr />
      <form onSubmit={handleSubmit} className="mb-5" autoComplete="off">
        <div className="mb-2">
          <input
            type="text"
            name="username"
            placeholder="Write your username"
            className="form-control form-control-sm"
            required
          />
        </div>
        <div className="mb-2">
          <SunEditor
            ref={refEditor}
            height={120}
            name="content"
            lang="es"
            autoFocus
          />
        </div>
        <button type="submit" className="btn btn-success btn-sm">
          Send comment
        </button>
      </form>
      <ImageItemComments />
    </div>
  );
}

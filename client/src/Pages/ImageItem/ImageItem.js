import useImagesItem from "../../hooks/useImageItem";
import Loader from "react-loader-spinner";
import css from "./css/ImageItem.module.css";
import ImageItemComments from "./ImageItemComments";
import AlertError from "../../components/AlertError";
import { BiCheck } from "react-icons/bi";
import BtnLoader from "../../components/BtnLoader";

export default function ImageItem() {
  const {
    postImage,
    isLoading,
    isLoadingCommenting,
    isErrorInDownloadPost,
    isErrorInComment,
    handleSubmit,
    commentsProps,
  } = useImagesItem();

  if (isLoading) {
    return (
      <Loader
        type="Oval"
        color="#dee3ea"
        height={80}
        width={80}
        className="d-flex justify-content-center"
        style={{ marginTop: "22rem" }}
      />
    );
  }

  if (isErrorInDownloadPost) {
    return <h4>Ocurrió un error al consultar el post</h4>;
  }
  const { title, url, date } = postImage.data;

  return (
    <div className={`container mt-5 ${css.container}`}>
      <h2 className="mb-3 text-capitalize">{title}</h2>
      <img
        src={url}
        className="img-flud mw-100 d-block rounded-3 w-100"
        alt={"Post upload at " + date}
      />
      <time dateTime={date} className="d-block text-muted mt-2 fw-normal">
        Published at <small>{date}</small>
      </time>

      <hr />
      <h5 className="my-3">Deja tu comentario</h5>

      <form onSubmit={handleSubmit} className="mb-5" autoComplete="off">
        {isErrorInComment && (
          <AlertError text="Ocurrió al comentar la publicación" />
        )}
        <div className="mb-3">
          <textarea
            className="form-control form-control-sm"
            name="content"
            placeholder="Deja tu comentario..."
            rows="5"
            required
          />
        </div>
        <small className="d-flex align-items-center text-muted my-2">
          <BiCheck className="me-1" /> Todos los campos son obligatorios
        </small>

        <BtnLoader
          type="submit"
          isLoading={isLoadingCommenting}
          text="Comentar"
          className="btn-success btn-sm"
        />
      </form>

      <ImageItemComments {...commentsProps} />
    </div>
  );
}

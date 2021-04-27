import useImagesItem from "../../hooks/useImageItem";
import css from "./css/ImageItem.module.css";
import ImageItemComments from "./ImageItemComments";
import AlertError from "../../components/AlertError";
import BtnLoader from "../../components/BtnLoader";
import ImageItemLoader from "../../components/skeletonLoaders/ImageItemLoader";
import HelmetMeta from "../../components/HelmetMeta";

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

  if (isLoading) return <ImageItemLoader />;

  if (isErrorInDownloadPost) {
    return <h4>Ocurrió un error al consultar el post</h4>;
  }
  const { title, url, date } = postImage.data;

  return (
    <div className={`container mt-5 ${css.container}`}>
      <HelmetMeta title={title} />
      
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
            placeholder="Escribe lo que piensas..."
            rows="5"
            required
          />
        </div>
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

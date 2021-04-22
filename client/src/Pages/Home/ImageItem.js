import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextError from "../../components/TextError";
import useImageItemList from "../../hooks/useImageItemList";
import ReactionsCount from "../../components/ReactionsCount";
import useReactionsImages from "../../hooks/useReactionsImages";
import EditAndRemove from "../../components/EditAndRemove";
function ImageItem(props) {
  const { url, title, id, likes, dislikes, comments } = props;
  const {
    setImages,
    setTitleImage,
    isEditing,
    titleImage,
    isLoadingDelete,
    isLoadingEditing,
    isErrorDeleting,
    isErrorEditing,
    handleSubmit,
    deleteItem,
    toggleEditing,
  } = useImageItemList(props);
  const { onReaction, isError } = useReactionsImages({ id, setImages });

  return (
    <div className="col-lg-4 col-md-4 col-sm-6 mb-5 col-image p-1">
      <figure className="w-100">
        <img src={url} alt="" className="img-fluid w-100 rounded-1 img-post" />
        <div className="row mt-2 w-100 mx-auto">
          <div className="col-md-12 d-flex align-items-center p-0">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="w-100">
                <input
                  type="text"
                  value={titleImage}
                  disabled={isLoadingEditing}
                  onChange={(e) => setTitleImage(e.target.value)}
                  className="form-control form-control-sm"
                  required
                />
              </form>
            ) : (
              <figcaption>{title}</figcaption>
            )}
          </div>
          <hr className="m-0 p-0 mt-2" />
          <div className="col-md-12 icons p-0 d-flex justify-content-between align-items-center">
            <EditAndRemove
              {...{
                isLoadingEditing,
                isEditing,
                toggleEditing,
                isLoadingDelete,
                deleteItem,
                id,
              }}
            />

            <ReactionsCount
              {...{ onReaction, dislikes, likes, isError, comments }}
            />
          </div>
        </div>

        {isErrorDeleting && <TextError text="Error al eliminar" />}
        {isErrorEditing && <TextError text="Error al editar" />}

        <div className="image-overlay">
          <Link to={`/image/${id}`} className="btn btn-success">
            Ver más
          </Link>
        </div>
      </figure>
    </div>
  );
}

ImageItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default ImageItem;

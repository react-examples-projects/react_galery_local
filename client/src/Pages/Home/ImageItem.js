import { BiTrash, BiEditAlt, BiLike, BiDislike } from "react-icons/bi";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import TextError from "../../components/TextError";
import useImageItemList from "../../hooks/useImageItemList";

export default function ImageItem(props) {
  const { url, title, id } = props;
  const {
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
            <div>
              {isLoadingEditing ? (
                <Loader
                  color="#dee3ea"
                  type="Oval"
                  width={18}
                  height={18}
                  className="loader-item"
                />
              ) : (
                <button className="btn p-0 me-1" onClick={toggleEditing}>
                  <BiEditAlt />
                </button>
              )}

              {isLoadingDelete ? (
                <Loader
                  color="#dee3ea"
                  type="Oval"
                  width={18}
                  height={18}
                  className="loader-item"
                />
              ) : (
                <button className="btn p-0 me-1" onClick={() => deleteItem(id)}>
                  <BiTrash />
                </button>
              )}
            </div>

            <div>
              <button className="btn p-0 me-1 ms-auto">
                <BiLike />
                <small className="ms-1">10</small>
              </button>

              <button className="btn p-0 me-1">
                <BiDislike />
                <small className="ms-1">20</small>
              </button>
            </div>
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

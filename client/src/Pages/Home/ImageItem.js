import { BiTrash, BiEditAlt } from "react-icons/bi";
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
    <div className="col-lg-4 col-md-4 col-sm-6 mb-5 col-image">
      <figure className="w-100">
        <img src={url} alt="" className="img-fluid w-100 rounded-1 img-post" />
        <div className="row mt-2">
          <div className="col-9 d-flex align-items-center">
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

          <div className="col-3 icons p-0">
            {isLoadingEditing ? (
              <Loader
                color="#000"
                type="Oval"
                width={18}
                height={18}
                className="loader-item"
              />
            ) : (
              <button className="btn p-1 me-1" onClick={toggleEditing}>
                <BiEditAlt />
              </button>
            )}

            {isLoadingDelete ? (
              <Loader
                color="#000"
                type="Oval"
                width={18}
                height={18}
                className="loader-item"
              />
            ) : (
              <button className="btn p-1" onClick={() => deleteItem(id)}>
                <BiTrash />
              </button>
            )}
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

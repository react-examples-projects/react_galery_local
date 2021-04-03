import { useState, useEffect } from "react";
import { BiTrash, BiEditAlt, BiError } from "react-icons/bi";
import { deleteImage, editTitleImage } from "../../helpers/api";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function ImageItem({ url, title, id, filename, setImages }) {
  const [isEditing, setEditing] = useState(false);
  const [titleImage, setTitleImage] = useState(title);

  // loader's status
  const [isLoadingEditing, setLoadingEditing] = useState(false);
  const [isLoadingDelete, setLoadingDelete] = useState(false);

  // error's status
  const [isErrorDeleting, setErrorDeleting] = useState(false);
  const [isErrorEditing, setErrorEditing] = useState(false);

  const toggleEditing = () => setEditing((e) => !e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleEditing();
    setLoadingEditing(true);
    setErrorEditing(false);
    try {
      await editTitleImage({ id, filename, title: titleImage });
      setImages((imgs) => {
        const copy = [...imgs];
        const filtered = copy.find((img) => img.id === id);
        filtered.title = titleImage;
        return copy;
      });
    } catch {
      setErrorDeleting(false);
      setErrorEditing(true);
    } finally {
      setLoadingEditing(false);
    }
  };

  const deleteItem = async (id) => {
    setLoadingDelete(true);
    setErrorDeleting(false);
    try {
      const data = await deleteImage(id, filename);
      setLoadingDelete(false);
      setImages((imgs) => {
        const filterImgs = imgs.filter((img) => img.id !== data.data.id);
        return filterImgs;
      });
    } catch {
      setErrorEditing(false);
      setErrorDeleting(true);
    } finally {
      setLoadingDelete(false);
    }
  };

  useEffect(() => {
    function toggleEsc(e) {
      if (e.keyCode === 27) setEditing(false);
    }

    window.addEventListener("keydown", toggleEsc);
    return () => window.removeEventListener("keydown", toggleEsc);
  }, []);

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
        {isErrorDeleting && (
          <small className="text-danger d-block">
            <BiError className="me-1" />
            Error al eliminar
          </small>
        )}

        {isErrorEditing && (
          <small className="text-danger d-block">
            <BiError className="me-1" />
            Error al editar
          </small>
        )}
        <div className="image-overlay">
          <Link to={`/image/${id}`} className="btn btn-success">
            Ver más
          </Link>
        </div>
      </figure>
    </div>
  );
}

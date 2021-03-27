import { useState, useEffect } from "react";
import { BiTrash, BiEditAlt } from "react-icons/bi";
import { deleteImage, editTitleImage } from "./helpers/api";

export default function ImageItem({ url, title, id, filename, setImages }) {
  const [isEditing, setEditing] = useState(false);
  const [titleImage, setTitleImage] = useState(title);
  const [isLoadingEditing, setLoadingEditing] = useState(false);

  const toggleEditing = () => setEditing((e) => !e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleEditing();
    setLoadingEditing(true);
    const data = await editTitleImage({ id, filename, title: titleImage });
    setLoadingEditing(false);

    setImages((imgs) => {
      const copy = [...imgs];
      const filtered = copy.find((img) => img.id === id);
      console.log(filtered);
      filtered.title = titleImage;
      return copy;
    });
  };

  const deleteItem = async (id) => {
    const data = await deleteImage(id, filename);
    setImages((imgs) => {
      const filterImgs = imgs.filter((img) => img.id !== data.id);
      return filterImgs;
    });
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
        <div className="d-flex align-items-center justify-content-between mt-2">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
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
          <div className="icons">
            <button className="btn p-1 me-1" onClick={toggleEditing}>
              <BiEditAlt />
            </button>
            <button className="btn p-1" onClick={() => deleteItem(id)}>
              <BiTrash />
            </button>
          </div>
        </div>
      </figure>
    </div>
  );
}

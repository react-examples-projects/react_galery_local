import { useState } from "react";
import { BiTrash, BiEditAlt } from "react-icons/bi";
import { deleteImage } from "./helpers/api";

export default function ImageItem({ url, title, id, filename, setImages }) {
  const [isEditing, setEditing] = useState(false);
  const toggleEditing = () => setEditing((e) => !e);

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleEditing();
  };

  const deleteItem = async (id) => {
    const data = await deleteImage(id, filename);
    setImages((imgs) => {
      const filterImgs = imgs.filter((img) => img.id !== data.id);
      return filterImgs;
    });
  };

  return (
    <div className="col-lg-4 col-md-3 col-sm-6 mb-5 col-image">
      <figure className="w-100">
        <img src={url} alt="" className="img-fluid w-100 rounded-1 img-post" />
        <div className="d-flex align-items-center justify-content-between mt-2">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                defaultValue={title}
                className="form-control form-control-sm"
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

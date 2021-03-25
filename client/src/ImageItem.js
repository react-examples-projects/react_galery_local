import { useState } from "react";
import { BiTrash, BiEditAlt } from "react-icons/bi";

export default function ImageItem({ url, title, id }) {
  const [isEditing, setEditing] = useState(false);
  const toggleEditing = () => setEditing((e) => !e);

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleEditing();
  };

  const deleteItem = (id) => {};

  return (
    <div className="col-lg-4 col-md-3 col-sm-6 mb-4 col-image">
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

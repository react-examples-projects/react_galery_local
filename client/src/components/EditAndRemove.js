import React from "react";
import { BiTrash, BiEditAlt, BiX } from "react-icons/bi";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";

function EditAndRemove({
  id,
  isLoadingEditing,
  isLoadingDelete,
  isEditing,
  toggleEditing = null,
  deleteItem = () => {},
}) {
  return (
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
          {isEditing ? <BiX /> : <BiEditAlt />}
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
  );
}

EditAndRemove.propTypes = {
  id: PropTypes.string.isRequired,
  isEditing: PropTypes.bool,
  isLoadingEditing: PropTypes.bool.isRequired,
  isLoadingDelete: PropTypes.bool.isRequired,
  toggleEditing: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default EditAndRemove;

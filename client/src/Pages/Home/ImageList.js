import PropTypes from "prop-types";
import ImageItem from "./ImageItem";
import { BiError } from "react-icons/bi";
import ThereNotPosts from "../../images/empty.svg";
function ImageList({ images, setImages, isErrorDownloadingImages }) {
  if (isErrorDownloadingImages) {
    return (
      <h5 className="fw-bolder mt-5 d-flex align-items-center">
        <BiError style={{ fill: "#dc3545" }} />
        <span className="mx-2 text-danger">
          Ocurrió un error, verifica tu conexión
        </span>
      </h5>
    );
  }

  if (!images.length) {
    return (
      <>
        <img
          src={ThereNotPosts}
          alt="There not post yet"
          className="d-block mx-auto mt-5"
          style={{
            width: "100%",
            maxWidth: "220px",
          }}
        />
        <h4 className="text-center mt-4">Aún no han publicado nada</h4>
      </>
    );
  }

  return (
    <div className="row w-100 mx-auto mb-5">
      {images.map((props) => {
        return <ImageItem {...props} {...{ setImages }} key={props.id} />;
      })}
    </div>
  );
}

ImageList.propTypes = {
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
  isErrorDownloadingImages: PropTypes.bool.isRequired,
};

export default ImageList;

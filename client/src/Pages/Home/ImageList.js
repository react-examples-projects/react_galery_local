import PropTypes from "prop-types";
import ImageItem from "./ImageItem";
import { BiError } from "react-icons/bi";
import ThereNotPosts from "../../images/empty.svg";

function ImageList({ images, setImages, isErrorDownloadingImages }) {
  if (isErrorDownloadingImages) {
    return (
      <h5 className="text-danger fw-bolder mt-5 d-flex align-items-center">
        <BiError />
        <span className="mx-2">Ocurrió un error, verifica tu conexión</span>
      </h5>
    );
  }

  if (!images.length) {
    return (
      <>
        <img
          src={ThereNotPosts}
          alt="There not post yet"
          className="d-block mx-auto"
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
    <div className="row w-100 mx-auto">
      {images.map(({ id, ...props }) => {
        return <ImageItem {...props} {...{ id, setImages }} key={id} />;
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

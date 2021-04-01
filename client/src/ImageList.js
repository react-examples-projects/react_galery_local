import ImageItem from "./ImageItem";
import { BiError } from "react-icons/bi";

export default function ImageList({
  images,
  setImages,
  isErrorDownloadingImages,
}) {
  if (isErrorDownloadingImages) {
    return (
      <h5 className="text-danger fw-bolder mt-5 d-flex align-items-center">
        <BiError />
        <span className="mx-2">Ocurrió un error, verifica tu conexión</span>
      </h5>
    );
  }
  return (
    <div className="row">
      {images.map(({ id, ...props }) => {
        return <ImageItem {...props} {...{ id, setImages }} key={id} />;
      })}
    </div>
  );
}

import useImages from "./hooks/useImages";
import ImageList from "./ImageList";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import headerImg from "./images/header.png";
import { BiError } from "react-icons/bi";

function App() {
  const {
    images,
    setImages,
    isDownloadingImages,
    isUploadingImages,
    isErrorDownloadingImages,
    isErrorSendingImages,
    inputFile,
    handleSubmit,
  } = useImages();

  return (
    <div className="App container container-images">
      <header className="header-file p-3 px-4 my-4 shadow-sm">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="files" className="mb-2">
              <h4 className="title"> Subir imágenes</h4>
            </label>

            <input
              type="file"
              name="files"
              id="files"
              accept="image/*"
              className="form-control form-control-sm w-auto"
              ref={inputFile}
              multiple
              required
            />
          </div>
          {isErrorSendingImages && (
            <small className="text-danger fw-bolder mb-2 d-flex align-items-center">
              <BiError />
              <span className="mx-2">
                Ocurrió un error al subir las imágenes, verifica tu conexión
              </span>
            </small>
          )}
          <button
            type="submit"
            className="btn btn-sm px-5 d-flex"
            disabled={isUploadingImages}
          >
            {isUploadingImages ? (
              <Loader
                type="Oval"
                color="#000000b2"
                height={18}
                width={18}
                className="ms-2"
              />
            ) : (
              "Enviar"
            )}
          </button>
        </form>
        <img
          src={headerImg}
          alt="Uploads your own images"
          className="header-image"
        />
      </header>

      {isDownloadingImages ? (
        <Loader
          type="Oval"
          color="#000000b2"
          height={50}
          width={50}
          className="loader-app"
        />
      ) : (
        <ImageList {...{ images, setImages, isErrorDownloadingImages }} />
      )}
    </div>
  );
}

export default App;

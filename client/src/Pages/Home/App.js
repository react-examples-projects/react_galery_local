import useImages from "../../hooks/useImages";
import ImageList from "./ImageList";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import headerImg from "../../images/header.png";
import TextError from "../../components/TextError";
import BtnLoader from "../../components/BtnLoader";
import ImageListLoader from "../../components/skeletonLoaders/ImageListLoader";
import HelmetMet from "../../components/HelmetMeta";

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

  const title = "AnimeArtists | ";
  const titleDynamic = isUploadingImages
    ? title + "🖼️ Uploading photos..."
    : title + "Home";

  return (
    <div className="App container container-images">
      <HelmetMet title={titleDynamic} />
      <header className="header-file p-3 px-4 my-4 shadow-sm">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="files" className="mb-2">
              <h4 className="title text-dark"> Subir imágenes</h4>
            </label>

            <input
              type="file"
              name="files"
              id="files"
              accept="image/*"
              className="form-control form-control-sm w-auto text-dark"
              ref={inputFile}
              multiple
              required
            />
          </div>

          {isErrorSendingImages && (
            <TextError text=" Ocurrió un error al subir las imágenes, verifica tu conexión" />
          )}

          <BtnLoader
            text="Enviar"
            className="btn-sm px-5"
            type="submit"
            isLoading={isUploadingImages}
          />
        </form>
        <img
          src={headerImg}
          alt="Uploads your own images"
          className="header-image"
        />
      </header>

      {isDownloadingImages ? (
        <ImageListLoader />
      ) : (
        <ImageList {...{ images, setImages, isErrorDownloadingImages }} />
      )}
    </div>
  );
}

export default App;

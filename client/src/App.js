import useImages from "./hooks/useImages";
import ImageList from "./ImageList";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function App() {
  const { images, setImages, isLoading, inputFile, handleSubmit } = useImages();

  return (
    <div className="App container container-images">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="d-inline-block p-3 mt-4"
      >
        <div className="mb-3">
          <label htmlFor="files" className="text-muted mb-2">
            Subir imágenes
          </label>
          <input
            type="file"
            name="files"
            id="files"
            accept="image/*"
            className="form-control form-control-sm"
            ref={inputFile}
            multiple
          />
        </div>

        <button
          type="submit"
          className="btn btn-outline-secondary btn-sm d-block w-100"
        >
          Enviar
        </button>
      </form>
      {isLoading ? (
        <Loader
          type="Oval"
          color="#000000b2"
          height={50}
          width={50}
          className="loader-app"
        />
      ) : (
        <ImageList {...{ images, setImages }} />
      )}
    </div>
  );
}

export default App;

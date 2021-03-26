import useImages from "./hooks/useImages";
import ImageList from "./ImageList";
import Loader from "./loaders/Loader";

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
      {isLoading ? <Loader /> : <ImageList {...{ images, setImages }} />}
    </div>
  );
}

export default App;

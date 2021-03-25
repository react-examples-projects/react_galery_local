import { useState, useEffect, useRef } from "react";
import ImageList from "./ImageList";
import Loader from "./loaders/Loader";

const getImages = async () => {
  const xhr = await fetch("http://localhost:5000/posts");
  const res = await xhr.json();
  return res;
};
   
function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const inputFile = useRef(null);

  useEffect(() => {
    getImages().then((data) => {
      setLoading(false);
      setImages(data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData(e.target);
    const xhr = await fetch("http://localhost:5000/post", {
      method: "POST",
      body,
    });

    const res = await xhr.json();
    console.log(res);
    const data = res instanceof Array ? res : [res];
    setImages((imgs) => [...imgs, ...data]);
    inputFile.current.value = null;
  };

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
      {isLoading ? <Loader /> : <ImageList images={images} />}
    </div>
  );
}

export default App;

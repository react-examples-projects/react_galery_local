import { useState, useEffect, useRef } from "react";
import { getImages, createImages } from "../helpers/api";

export default function useImages() {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const inputFile = useRef(null);

  useEffect(() => {
    getImages()
      .then((data) => {
        setImages(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createImages(inputFile.current.files);
    const data = res instanceof Array ? res : [res];
    setImages((imgs) => [...imgs, ...data]);
    inputFile.current.value = null;
  };

  return {
    images,
    setImages,
    isLoading,
    error,
    inputFile,
    handleSubmit,
  };
}

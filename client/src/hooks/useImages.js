import { useState, useEffect, useRef } from "react";
import { getImages, createImages } from "../helpers/api";

export default function useImages() {
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
    const res = await createImages(e.target);
    const data = res instanceof Array ? res : [res];
    setImages((imgs) => [...imgs, ...data]);
    inputFile.current.value = null;
  };

  return {
    images,
    setImages,
    isLoading,
    inputFile,
    handleSubmit,
  };
}

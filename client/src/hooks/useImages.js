import { useState, useEffect, useRef } from "react";
import { getImages, createImages } from "../helpers/api";

export default function useImages() {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const inputFile = useRef(null);

  useEffect(() => {
    setLoading(true);
    
    getImages((data) => {
      setImages(data);
      setLoading(false);
      console.log(data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const files = inputFile.current.files;
    createImages(files);
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

import { useState, useEffect, useRef } from "react";
import { getImages, createImages } from "../helpers/api";

export default function useImages() {
  const [images, setImages] = useState([]);
  const [isDownloadingImages, setDownloadingImages] = useState(true);
  const [isUploadingImages, setUploadingImages] = useState(false);
  const [isErrorDownloadingImages, setIsErrorDownloadingImages] = useState(
    false
  );
  const [isErrorSendingImages, setIsErrorSendingImages] = useState(false);
  const inputFile = useRef(null);

  useEffect(() => {
    getImages()
      .then((data) => {
        setImages(data);
      })
      .catch(() => setIsErrorDownloadingImages(true))
      .finally(() => setDownloadingImages(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsErrorSendingImages(false);
    setUploadingImages(true);
    try {
      const res = await createImages(inputFile.current.files);
      setImages((imgs) => [...imgs, ...res]);
    } catch {
      setIsErrorSendingImages(true);
    } finally {
      setUploadingImages(false);
    }
    if (inputFile.current) inputFile.current.value = null;
  };

  return {
    images,
    setImages,
    isDownloadingImages,
    isUploadingImages,
    isErrorDownloadingImages,
    isErrorSendingImages,
    inputFile,
    handleSubmit,
  };
}

import { useState, useEffect, useRef } from "react";
import { getImages, createImages } from "../helpers/api";
import {
  saveImagesInStorage,
  getImagesFromStorage,
  existsImagesInStorage,
  removeImagesFromStorage,
} from "../helpers/storage";

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
    async function _getImages() {
      try {
        const data = await getImages();
        if (!data.ok) return setIsErrorDownloadingImages(true);
        setImages(data.data);
        saveImagesInStorage(data.data);
      } catch(err) {
        console.log(err);
        setIsErrorDownloadingImages(true);
      } finally {
        setDownloadingImages(false);
      }
    }
    if (existsImagesInStorage()) {
      setDownloadingImages(false);
      return setImages(getImagesFromStorage());
    }
    _getImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsErrorSendingImages(false);
    setUploadingImages(true);
    try {
      const res = await createImages(inputFile.current.files);
      if (!res.ok) return setIsErrorSendingImages(true);

      setImages((imgs) => {
        removeImagesFromStorage();
        return [...imgs, ...res.data];
      });
    } catch (err) {
      console.log(err);
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

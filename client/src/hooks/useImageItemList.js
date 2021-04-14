import { useState, useEffect } from "react";
import {
  deleteImage,
  editTitleImage,
  deleteAllCommentsInPost,
} from "../helpers/api";
import { removeImagesFromStorage } from "../helpers/storage";

export default function useImageItemList({ title, id, filename, setImages }) {
  const [isEditing, setEditing] = useState(false);
  const [titleImage, setTitleImage] = useState(title);

  // loader's status
  const [isLoadingEditing, setLoadingEditing] = useState(false);
  const [isLoadingDelete, setLoadingDelete] = useState(false);

  // error's status
  const [isErrorDeleting, setErrorDeleting] = useState(false);
  const [isErrorEditing, setErrorEditing] = useState(false);

  const toggleEditing = () => setEditing((e) => !e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleEditing();
    setLoadingEditing(true);
    setErrorEditing(false);
    try {
      const data = await editTitleImage({ id, filename, title: titleImage });
      if (!data.ok) return setErrorEditing(true);
      setImages((imgs) => {
        const copy = [...imgs];
        const filtered = copy.find((img) => img.id === id);
        filtered.title = titleImage;
        removeImagesFromStorage();
        return copy;
      });
    } catch {
      setErrorDeleting(false);
      setErrorEditing(true);
    } finally {
      setLoadingEditing(false);
    }
  };

  const deleteItem = async (id) => {
    setLoadingDelete(true);
    setErrorDeleting(false);
    try {
      const data = await deleteImage(id, filename);
      const data2 = await deleteAllCommentsInPost(id);
      setLoadingDelete(false);

      if (!data2.ok)
        alert("Ocurrió un error al eliminar los comentarios de la publicación");
      if (!data.ok) return setErrorDeleting(true);

      setImages((imgs) => {
        const filterImgs = imgs.filter((img) => img.id !== data.data.id);
        removeImagesFromStorage();
        return filterImgs;
      });
    } catch {
      setErrorEditing(false);
      setErrorDeleting(true);
    }
    setLoadingDelete(false);
  };

  useEffect(() => {
    function toggleEsc(e) {
      if (e.keyCode === 27) setEditing(false);
    }

    window.addEventListener("keydown", toggleEsc);
    return () => window.removeEventListener("keydown", toggleEsc);
  }, []);

  return {
    setImages,
    setTitleImage,
    isEditing,
    titleImage,
    isLoadingDelete,
    isLoadingEditing,
    isErrorDeleting,
    isErrorEditing,
    handleSubmit,
    deleteItem,
    toggleEditing,
  };
}

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getPost, createComment } from "../helpers/api";

export default function useImagesItem() {
  const { id } = useParams();
  const [postImage, setPostImage] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const refEditor = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    fd.append("date", new Date().toLocaleString());
    fd.append("id_post", id);
    const data = await createComment(fd);
    if (!data.ok) return setError(true);
    console.log(refEditor.current.editor.getContents());
  };

  useEffect(() => {
    async function getPostImage() {
      try {
        const data = await getPost(id);
        if (!data.ok) return setError(true);
        setPostImage(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getPostImage();
  }, [id]);

  return {
    postImage,
    isLoading,
    isError,
    handleSubmit,
    refEditor,
  };
}

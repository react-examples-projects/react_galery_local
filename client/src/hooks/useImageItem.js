import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getPost, createComment } from "../helpers/api";
import useComments from "./useComments";

export default function useImagesItem() {
  const { id } = useParams();
  const [postImage, setPostImage] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isLoadingCommenting, setLoadingComenting] = useState(false);
  const [isErrorInDownloadPost, setErrorInDownloadPost] = useState(false);
  const [isErrorInComment, setErrorInComment] = useState(false);
  const { setComments, ...commentsProps } = useComments();
  const refEditor = useRef();

  const handleSubmit = async (e) => {
    setErrorInComment(false);
    setLoadingComenting(true);
    e.preventDefault();
    const fd = new FormData(e.target);
    fd.append("date", new Date().toLocaleString());
    fd.append("id_post", id);
    const data = await createComment(fd);
    setLoadingComenting(false);
    if (!data.ok) return setErrorInComment(true);
    setComments((comments) => [data.data, ...comments]);
  };

  useEffect(() => {
    async function getPostImage() {
      try {
        const data = await getPost(id);
        if (!data.ok) return setErrorInDownloadPost(true);
        setPostImage(data);
      } catch {
        setErrorInDownloadPost(true);
      } finally {
        setLoading(false);
      }
    }

    getPostImage();
  }, [id]);

  return {
    postImage,
    isLoading,
    isLoadingCommenting,
    isErrorInDownloadPost,
    isErrorInComment,
    handleSubmit,
    refEditor,
    commentsProps: {
      ...commentsProps,
    },
  };
}

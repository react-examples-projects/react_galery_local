import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getPost, createComment } from "../helpers/api";
import useComments from "./useComments";

export default function useImagesItem() {
  const { id } = useParams();
  const [postImage, setPostImage] = useState({});
  const [postContent, setPostContent] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isLoadingCommenting, setLoadingComenting] = useState(false);
  const [isErrorInDownloadPost, setErrorInDownloadPost] = useState(false);
  const [isErrorInComment, setErrorInComment] = useState(false);
  const { setComments, ...commentsProps } = useComments();
  const refEditor = useRef();

  const handleChangeContent = (content) => {
    setPostContent(content);
  };

  const handleSubmit = async (e) => {
    setErrorInComment(false);
    setLoadingComenting(true);
    e.preventDefault();
    try {
      const fd = new FormData(e.target);
      fd.append("date", new Date().toLocaleString());
      fd.append("id_post", id);
      fd.append("content", postContent);
      const data = await createComment(fd);
      if (!data.ok) return setErrorInComment(true);
      setComments((comments) => [data.data, ...comments]);
    } catch {
      setErrorInComment(true);
    }
    setLoadingComenting(false);
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
    handleChangeContent,
    refEditor,
    commentsProps: {
      ...commentsProps,
      setComments,
    },
  };
}

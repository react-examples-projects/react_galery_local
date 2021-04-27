import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost, createComment } from "../helpers/api";
import {
  savePostItem,
  getPostItemFromStorage,
  savePostItemComment,
} from "../helpers/storage";
import useComments from "./useComments";
import useRedirect from "./useRedirect";

export default function useImagesItem() {
  const { id } = useParams();
  const isCorrect = useRedirect(/^[0-9a-fA-F]{24}$/.test(id));
  const [postImage, setPostImage] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isLoadingCommenting, setLoadingComenting] = useState(false);
  const [isErrorInDownloadPost, setErrorInDownloadPost] = useState(false);
  const [isErrorInComment, setErrorInComment] = useState(false);
  const { setComments, ...commentsProps } = useComments();

  const handleSubmit = async (e) => {
    setErrorInComment(false);
    setLoadingComenting(true);
    e.preventDefault();
    try {
      const fd = new FormData(e.target);
      fd.append("username", "Anonymous");
      fd.append("id_post", id);
      
      const data = await createComment(fd);
      if (!data.ok) {
        setErrorInComment(true);
        return setLoadingComenting(false);
      }
      setComments((comments) => {
        const newComments = [data.data, ...comments];
        savePostItemComment(id, newComments);
        return newComments;
      });
    } catch {
      setErrorInComment(true);
    }
    e.target.content.value = "";
    setLoadingComenting(false);
  };

  useEffect(() => {
    async function getPostImage() {
      try {
        const data = await getPost(id);
        if (!data.ok) return setErrorInDownloadPost(true);
        setPostImage(data);
        savePostItem(id, data);
      } catch {
        setErrorInDownloadPost(true);
      }
      setLoading(false);
    }

    if (isCorrect) {
      const postCache = getPostItemFromStorage(id);
      if (!postCache) return getPostImage();
      setLoading(false);
      setPostImage(postCache);
    }
  }, [id, isCorrect]);

  return {
    postImage,
    isLoading,
    isLoadingCommenting,
    isErrorInDownloadPost,
    isErrorInComment,
    handleSubmit,
    commentsProps: {
      ...commentsProps,
      setComments,
    },
  };
}

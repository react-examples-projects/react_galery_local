import { useState } from "react";
import { deleteComment } from "../helpers/api";
import { removeCommentByIdPost } from "../helpers/storage";
import { useParams } from "react-router-dom";

export default function useComment({ id, setComments }) {
  const [isLoadingDelete, setLoadingDeleteComment] = useState(false);
  const [isLoadingEditing, setLoadingEditing] = useState(false);
  const [isErrorDeleteComment, setErrorDeleteComment] = useState(false);
  const [isEditing, , setEditing] = useState(false);
  const { id: id_post } = useParams();

  const deleteItem = async () => {
    setErrorDeleteComment(false);
    try {
      setLoadingDeleteComment(true);
      const data = await deleteComment(id, id_post);
      if (!data.ok) {
        setLoadingDeleteComment(false);
        return setErrorDeleteComment(true);
      }
      setComments((comments) => {
        removeCommentByIdPost(id, id_post);
        return [...comments].filter((cms) => cms._id !== id);
      });
    } catch (err) {
      console.log(err);
      setErrorDeleteComment(true);
    }
    setLoadingDeleteComment(false);
  };

  const toggleEditing = async () => {
    console.log("editing comment...");
  };

  return {
    isEditing,
    isLoadingDelete,
    isLoadingEditing,
    isErrorDeleteComment,
    deleteItem,
    toggleEditing,
  };
}

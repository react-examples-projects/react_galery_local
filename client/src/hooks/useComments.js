import { useState, useEffect } from "react";
import { getCommentsByPost } from "../helpers/api";
import { useParams } from "react-router-dom";

export default function useComments() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getComments() {
      const comments = await getCommentsByPost(id);
      setComments(comments.data);
    }
    getComments();
  }, [id]);
  return {
    comments,
  };
}

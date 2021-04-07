import { useState, useEffect } from "react";
import { getCommentsByPost } from "../helpers/api";
import { useParams } from "react-router-dom";

export default function useComments() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    async function getComments() {
      try {
        const comments = await getCommentsByPost(id);
        if (!comments.ok) return setError(true);
        setComments(comments.data);
      } catch (err) {
        console.log(err);
        setError(true);
      }
      setLoading(false);
    }
    getComments();
  }, [id]);
  return {
    setComments,
    comments,
    isLoading,
    isError,
  };
}

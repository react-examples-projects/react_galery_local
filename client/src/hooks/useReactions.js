import { useState } from "react";
import { likeComment, dislikeComment } from "../helpers/api";

export default function useReactions({ id, setComments }) {
  const [isError, setError] = useState(false);

  const onReaction = async (isLike = true) => {
    try {
      setError(false);
      const data = await (isLike ? likeComment(id) : dislikeComment(id));
      if (!data.ok) return setError(true);
      setComments((comments) => {
        const copy = [...comments];
        const comment = copy.find((comment) => comment._id === id);
        if (isLike) comment.likes = data.data.likes;
        else comment.dislikes = data.data.dislikes;
        return copy;
      });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const onDislike = () => {};

  return {
    isError,
    onReaction,
    onDislike,
  };
}

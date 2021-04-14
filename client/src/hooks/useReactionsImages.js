import { useState } from "react";
import { likeImage, dislikeImage } from "../helpers/api";
import { saveImagesInStorage } from "../helpers/storage";

export default function useReactionsImages({ id, setImages }) {
  const [isError, setError] = useState(false);

  const onReaction = async (isLike = true) => {
    try {
      setError(false);
      const data = await (isLike ? likeImage(id) : dislikeImage(id));
      if (!data.ok) return setError(true);
      setImages((images) => {
        const copy = [...images];
        const image = copy.find((image) => image.id === id);
        if (isLike) image.likes = data.data.likes;
        else image.dislikes = data.data.dislikes;
        saveImagesInStorage(copy);
        return copy;
      });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return { isError, onReaction };
}

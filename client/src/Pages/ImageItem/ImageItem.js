import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../helpers/api";
import Loader from "react-loader-spinner";
import css from "./ImageItem.module.css";

export default function ImageItem() {
  const { id } = useParams();
  const [postImage, setPostImage] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    async function getPostImage() {
      try {
        const data = await getPost(id);
        setPostImage(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getPostImage();
  }, [id]);

  if (isLoading) {
    return (
      <Loader
        type="Oval"
        color="#000000b2"
        height={80}
        width={80}
        className="ms-2"
      />
    );
  }
  const { title, url, date } = postImage.data;

  return (
    <div className={`container mt-5 ${css.container}`}>
      <h2 className="mb-3">{title}</h2>
      <time dateTime={date} className="d-block text-muted mb-2 fw-normal">
        Published at <small>{date}</small>
      </time>
      <img
        src={url}
        className="img-flud w-100 rounded"
        alt={"Post upload at " + date}
      />
      <code>
        <pre>{JSON.stringify(postImage, null, 4)}</pre>
      </code>
    </div>
  );
}

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
        className="d-flex justify-content-center"
        style={{ marginTop: "22rem" }}
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
      <h5 className="my-3">Let your comments</h5>
      <hr />
      <form>
        <div className="mb-2">
          <input
            type="text"
            name="name"
            placeholder="put your username"
            className="form-control form-control-sm"
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            name="comment"
            cols="10"
            rows="4"
            placeholder="write your comment"
            className="form-control form-control-sm"
            required
          />
        </div>
        <button type="submit" className="btn btn-success btn-sm">
          Send comment
        </button>
      </form>
    </div>
  );
}

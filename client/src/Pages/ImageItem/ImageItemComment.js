import css from "./css/ImageItem.module.css";
import { likeComment } from "../../helpers/api";
import ReactionsCount from "../../components/ReactionsCount";

export default function ImageItemComment({
  _id,
  username,
  content,
  date,
  likes,
  dislikes,
  setComments,
}) {
  const onLike = async () => {
    try {
      const data = await likeComment(_id);
      setComments((comments) => {
        const copy = [...comments];
        const comment = copy.find((comment) => comment._id === _id);
        comment.likes = data.data.likes;
        console.log(comment);
        return copy;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onDislike = () => {};

  return (
    <div className={`p-3 mb-4 bg-dark rounded shadow-sm ${css.comment}`}>
      <p className="text-capitalize fw-bolder mb-2">{username}</p>
      <div
        style={{ fontSize: "14px" }}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />

      <div className="me-auto d-flex align-items-center justify-content-between">
        <time className="text-muted d-block" dateTime={date}>
          <small
            className="text-muted"
            style={{
              fontSize: ".675em",
            }}
          >
            {date}
          </small>
        </time>

        <ReactionsCount {...{ likes, dislikes, onLike, onDislike }} />
      </div>
    </div>
  );
}

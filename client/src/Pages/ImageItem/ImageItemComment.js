import css from "./css/ImageItem.module.css";
import ReactionsCount from "../../components/ReactionsCount";
import EditAndRemove from "../../components/EditAndRemove";
import useReactionsComments from "../../hooks/useReactionsComments";
import useComment from "../../hooks/useComment";

export default function ImageItemComment({
  _id: id,
  username,
  content,
  date,
  likes,
  dislikes,
  setComments,
}) {
  const { isError, onReaction, onDislike } = useReactionsComments({
    id,
    setComments,
  });
  const propsUseComments = useComment({ id, setComments });
  return (
    <div className={`p-3 mb-4 bg-dark rounded shadow-sm ${css.comment}`}>
      <p className="text-capitalize fw-bolder mb-2">{username}</p>
      <div
        style={{ fontSize: "14px" }}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <time className="text-muted d-block mt-1" dateTime={date}>
        <small
          className="text-muted"
          style={{
            fontSize: ".675em",
          }}
        >
          {date}
        </small>
      </time>
      <div className="me-auto d-flex align-items-center justify-content-between mt-2">
        <EditAndRemove {...propsUseComments}/>
        <ReactionsCount
          {...{ likes, dislikes, onReaction, onDislike, isError }}
        />
      </div>
    </div>
  );
}

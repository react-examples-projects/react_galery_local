import css from "./css/ImageItem.module.css";
import ReactionsCount from "../../components/ReactionsCount";
import EditAndRemove from "../../components/EditAndRemove";
import useReactionsComments from "../../hooks/useReactionsComments";
import useComment from "../../hooks/useComment";
import PropTypes from "prop-types";

function ImageItemComment({
  _id: id,
  username,
  content,
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
      <div className="me-auto d-flex align-items-center justify-content-between mt-2">
        <EditAndRemove {...propsUseComments} id={id} />
        <ReactionsCount
          {...{ likes, dislikes, onReaction, onDislike, isError, comments: 0 }}
        />
      </div>
    </div>
  );
}

ImageItemComment.propTypes = {
  _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  setComments: PropTypes.func.isRequired,
};

export default ImageItemComment;

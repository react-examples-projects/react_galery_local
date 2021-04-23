import { BiError } from "react-icons/bi";
import PropTypes from "prop-types";

function TextError({ text = "An error ocurred", ...props }) {
  return (
    <small
      className="text-danger fw-bolder mb-2 d-flex align-items-center"
      {...props}
    >
      <BiError style={{ fill: "#dc3545" }} />
      <span className="ms-1 text-danger">{text}</span>
    </small>
  );
}

TextError.propTypes = {
  text: PropTypes.string,
};

export default TextError;

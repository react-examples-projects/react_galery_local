import PropTypes from "prop-types";
import { BiError } from "react-icons/bi";

function AlerError({ text, children, ...props }) {
  return (
    <div className="alert alert-danger" {...props}>
      <h6 className="text-danger mb-0 text-center d-flex align-items-center justify-content-center">
        <BiError style={{ fill: "#dc3545" }} />
        <span className="ms-1 text-danger">{text || children}</span>
      </h6>
    </div>
  );
}

AlerError.propTypes = {
  text: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.string,
  ]),
};

export default AlerError;

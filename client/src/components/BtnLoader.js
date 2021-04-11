import Loader from "react-loader-spinner";
import PropTypes from "prop-types";

function BtnLoader({ text, children, isLoading, className, ...props }) {
  className = className ? " " + className : "";
  return (
    <button
      type="submit"
      className={`btn d-flex ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader type="Oval" color="#000000b2" height={19} width={19} />
      ) : (
        text || children
      )}
    </button>
  );
}

BtnLoader.propTypes = {
  text: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default BtnLoader;

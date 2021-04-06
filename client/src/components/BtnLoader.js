import Loader from "react-loader-spinner";

export default function BtnLoader({
  text,
  children,
  isLoading,
  className,
  ...props
}) {
  className = className ? " " + className : "";
  return (
    <button
      type="submit"
      className={`btn d-flex ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader
          type="Oval"
          color="#000000b2"
          height={18}
          width={18}
          className="ms-2"
        />
      ) : (
        text || children
      )}
    </button>
  );
}

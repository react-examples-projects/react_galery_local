import React from "react";
import ErrorImage from "../../images/errorImage.png";
import TextError from "../TextError";
export default function ErrorImageItem({ error, resetErrorBoundary }) {
  return (
    <div className="col-lg-4 col-md-4 col-sm-6 mb-5 col-image p-1">
      <figure className="w-100">
        <img
          src={ErrorImage}
          alt="An error ocurred while trying render this post"
          title="An error ocurred while trying render this post"
          className="img-fluid w-100 rounded-1 img-post"
        />
      </figure>
      <hr />
      <TextError text="An error occurred in this component" />
      {/* <pre className="mb-1">{error.message}</pre> */}
      <button
        className="btn btn-outline-danger btn-sm w-100"
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  );
}

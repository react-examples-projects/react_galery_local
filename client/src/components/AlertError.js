import { BiError } from "react-icons/bi";

export default function AlerError({ text, children, ...props }) {
  return (
    <div className="alert alert-danger" {...props}>
      <h6 className="text-danger mb-0 text-center d-flex align-items-center justify-content-center">
        <BiError style={{ fill: "#dc3545" }} />   
        <span className="ms-1 text-danger">{text || children}</span>
      </h6>
    </div>
  );
}

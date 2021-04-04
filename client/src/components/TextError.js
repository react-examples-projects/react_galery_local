import { BiError } from "react-icons/bi";

export default function TextError({ text = "An error ocurred", ...props }) {
  return (
    <small
      className="text-danger fw-bolder mb-2 d-flex align-items-center"
      {...props}
    >
      <BiError />
      <span className="mx-2">{text}</span>
    </small>
  );
}

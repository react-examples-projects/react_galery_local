import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="w-100 mx-auto"
      style={{
        maxWidth: "500px",
      }}
    >
      <h1 style={{ marginTop: "10rem" }}>The page not found</h1>
      <Link className="btn btn-outline-success mt-3" to="/">
        Ir al inicio
      </Link>
    </div>
  );
}

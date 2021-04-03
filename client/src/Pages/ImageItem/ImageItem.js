import { useParams } from "react-router-dom";

export default function ImageItem() {
  const { id } = useParams();

  return <h1>Image Item {id}</h1>;
}

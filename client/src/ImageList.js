import ImageItem from "./ImageItem";

export default function ImageList({ images }) {
  return (
    <div className="row">
      {images.map(({ id, ...props }) => {
        return <ImageItem {...props} key={id} id={id} />;
      })}
    </div>
  );
}

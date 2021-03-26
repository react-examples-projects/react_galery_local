import ImageItem from "./ImageItem";

export default function ImageList({ images, setImages }) {
  return (
    <div className="row">
      {images.map(({ id, ...props }) => {
        return <ImageItem {...props} {...{ id, setImages }} key={id} />;
      })}
    </div>
  );
}

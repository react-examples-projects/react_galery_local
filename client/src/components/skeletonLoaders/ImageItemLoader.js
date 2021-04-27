import Skeleton, { SkeletonTheme } from "react-skeleton-loading";
import HelmetMeta from "../HelmetMeta";

export default function ImageItemLoader() {
  return (
    <div style={{ width: "800px" }} className="mx-auto mt-5">
      <HelmetMeta title="⌛ Loading post..." />
      <SkeletonTheme color="#212529" highlightColor="#444">
        <Skeleton height={30} width={200} />
        <div className="my-1">
          <Skeleton height={400} />
        </div>
        <Skeleton height={18} width={220} />
        <hr />
        <Skeleton height={18} width={220} />
        <div className="my-2">
          <Skeleton height={100} />
        </div>
        <div className="my-2">
          <Skeleton height={100} />
        </div>
      </SkeletonTheme>
    </div>
  );
}

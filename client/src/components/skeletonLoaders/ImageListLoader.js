import Skeleton, { SkeletonTheme } from "react-skeleton-loading";

import React from "react";

export default function ImageListLoader() {
  return (
    <SkeletonTheme color="#212529" highlightColor="#444">
      <div className="row w-100 mx-auto mb-5">
        {Array(6)
          .fill(null)
          .map((e) => {
            return (
              <div className="col-lg-4 col-md-4 col-sm-6 mb-1 col-image p-1">
                <Skeleton height={250} />
                <div className="mt-1">
                  <Skeleton height={30} />
                </div>
              </div>
            );
          })}
      </div>
    </SkeletonTheme>
  );
}

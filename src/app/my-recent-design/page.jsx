
import React, { Suspense } from "react";
import RecentDesign from "./MyRecentDesign";

const page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <RecentDesign></RecentDesign>
      </Suspense>
    </div>
  );
};

export default page;

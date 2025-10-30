import AllCategory from "@/components/categoryPage/AllCategory";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <AllCategory></AllCategory>
      </Suspense>
    </div>
  );
};

export default page;

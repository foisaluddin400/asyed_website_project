
import AllProduct from "@/components/productPage/AllProduct";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <AllProduct></AllProduct>
      </Suspense>
    </div>
  );
};

export default page;

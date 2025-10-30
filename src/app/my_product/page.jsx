
import React, { Suspense } from "react";
import IndividualProduct from "./MyProductPage";

const page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <IndividualProduct></IndividualProduct>
      </Suspense>
    </div>
  );
};

export default page;

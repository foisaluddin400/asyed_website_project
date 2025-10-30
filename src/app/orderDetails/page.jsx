
import React, { Suspense } from "react";
import OrderDetails from "./OrderDetailsPage";

const page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <OrderDetails></OrderDetails>
      </Suspense>
    </div>
  );
};

export default page;

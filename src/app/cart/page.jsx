import Cart from "@/components/cartPage/Cart";

import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <Cart></Cart>
      </Suspense>
    </div>
  );
};

export default page;

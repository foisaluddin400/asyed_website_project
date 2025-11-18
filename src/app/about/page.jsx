import React, { Suspense } from "react";

import AboutUs from "./AboutUs";

const page = () => {
  return (
    <div>
 
      <Suspense fallback={<p>loading..</p>}>
        <AboutUs></AboutUs>
      </Suspense>
    </div>
  );
};

export default page;

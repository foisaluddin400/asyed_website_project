
import React, { Suspense } from "react";
import Faq from "./FaqPage";

const page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <Faq></Faq>
      </Suspense>
    </div>
  );
};

export default page;

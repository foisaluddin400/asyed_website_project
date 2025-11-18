import React, { Suspense } from "react";

import TermsAndCondition from "./TermsAndCondition";

const page = () => {
  return (
    <div>
 
      <Suspense fallback={<p>loading..</p>}>
        <TermsAndCondition></TermsAndCondition>
      </Suspense>
    </div>
  );
};

export default page;

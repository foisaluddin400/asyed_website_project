import React, { Suspense } from "react";
import PrivecyAndPolicy from "./Privecy";

const page = () => {
  return (
    <div>
 
      <Suspense fallback={<p>loading..</p>}>
        <PrivecyAndPolicy></PrivecyAndPolicy>
      </Suspense>
    </div>
  );
};

export default page;

import SaveDesign from '@/components/productPage/SaveDesign'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
         <Suspense fallback={<p>loading..</p>}>
        <SaveDesign></SaveDesign>
      </Suspense>
    </div>
  )
}

export default page
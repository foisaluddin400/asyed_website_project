
import ContuctUsPage from '@/components/contactPage/ContuctUsPage'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
         <Suspense fallback={<p>loading..</p>}>
        <ContuctUsPage></ContuctUsPage>
      </Suspense>
    </div>
  )
}

export default page
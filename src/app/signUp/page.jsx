import SignUp from '@/components/authentication/Register'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
        <SignUp></SignUp>
      </Suspense>
    </div>
  )
}

export default page
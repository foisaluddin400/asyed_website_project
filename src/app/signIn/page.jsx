import Login from '@/components/authentication/Login'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
        <Login></Login>
      </Suspense>
    </div>
  )
}

export default page
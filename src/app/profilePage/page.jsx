import { ProfilePage } from '@/components/profile/ProfilePage'

import React, { Suspense } from 'react'

const page = () => {
  return (
    <>
       <Suspense fallback={<p>loading..</p>}>
        <ProfilePage></ProfilePage>
      </Suspense>
    </>
  )
}

export default page
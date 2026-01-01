import { ProfilePage } from '@/components/profile/ProfilePage'

import React, { Suspense } from 'react'

const page = () => {
  return (
    <>
       <Suspense fallback={<div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>}>
        <ProfilePage></ProfilePage>
      </Suspense>
    </>
  )
}

export default page
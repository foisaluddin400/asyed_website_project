import BlogPage from '@/components/blog/BlogPage'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
         <Suspense fallback={<p>loading..</p>}>
        <BlogPage></BlogPage>
      </Suspense>
    </div>
  )
}

export default page
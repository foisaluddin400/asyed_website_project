import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <h1>What do you want to do with your design?</h1>
        <Link href={'/addToDesignCart'}><button className='bg-primary p-2 text-white mt-5 border rounded'>Continue</button></Link>
    </div>
  )
}

export default page
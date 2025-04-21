import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='min-h-[80vh] relative'>
        <div className='absolute top-1/2 left-1/2 translate-[-50%] text-white text-center'>
        <h1 className='font-bold text-2xl mb-2 text-red-500'>404</h1>
        <p> Page Not Found</p>
        <Link href="/" className='bg-[var(--accent)] px-4 py-2 mt-4 block rounded-xl  '>Back To Home Page</Link>
        </div>
    </div>
  )
}

export default NotFoundPage
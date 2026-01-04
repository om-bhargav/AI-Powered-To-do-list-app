import React from 'react'
import Image from 'next/image'
const NotFound = () => {
  return (
    <div className='flex-1 flex flex-col justify-center items-center gap-4'>
        <Image alt='Loading...' src="/not-found.png" width={300} height={300}/>
        <div className='text-5xl'>404</div>
        <div className='text-2xl text-gray-300'>The page you are looking for is not here!</div>
    </div>
  )
}

export default NotFound
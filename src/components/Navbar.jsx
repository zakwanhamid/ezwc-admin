import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
        <h1 className='text-4xl font-bold cursor-pointer'>eZWC</h1>
        <div>
            <button className='bg-ezwcColor px-6 py-2 rounded cursor-pointer'>Sign In</button>
        </div>
    </div>
  )
}

export default Navbar
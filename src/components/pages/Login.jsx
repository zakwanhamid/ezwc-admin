import React from 'react'
import loginBg from '../../assets/loginBg.png'

const Login = () => {
  return (
    <div className='w-full h-screen flex items-start'>
        <div className='relative w-1/2 h-full flex flex-col'>
            <div className='absolute top-[25%] left-[10%] flex flex-col'>
                <h1 className='text-6xl text-white font-bold my-4'>eZWC</h1>
                <p className='text-xl text-white font-bold my-4'>Educate, Engage, Evolve: Towards a Greener Tomorrow</p>
            </div>

            <img src={loginBg} alt="bg-img" className='w-full h-full object-cover' />
        </div>

        <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-10 p-20 justify-between'>
            <h1 className='text-xl text-[#060606] font-semibold'>Center for Global Sustainability Studies (CGSS)</h1>

            <div className='w-full flex flex-col max-w-[500px]'>
                <div>
                    <h3 className='text-3xl font-semibold mb-4'>Admin Login</h3>
                    <p className='text-bsae mb-2'>Welcome Back! Please enter your details.</p>
                </div>

                <div className='w-full flex flex-col'>
                    <input 
                    type="email"
                    placeholder='Email'
                    className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                     />
                     <input 
                    type="password"
                    placeholder='Password'
                    className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                     />
                </div>

                <div className='w-full flex flex-col my-4'>
                    <button className='w-full text-white my-2 bg-ezwcColor rounded-md p-2 text-center flex items-center justify-center'>
                        Log In
                    </button>
                </div>
                
            </div>

            <div className='w-full flex items-center justify-center'>
                <p>This site is only associate for CGSS staff</p>
            </div>

        </div>

    </div>
  )
}

export default Login
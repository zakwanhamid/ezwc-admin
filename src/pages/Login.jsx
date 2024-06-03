import React, { useState } from 'react';
import loginBg from '../assets/loginBg.png';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase.config';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in successfully');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='w-full h-screen flex items-start'>
            <div className='relative w-2/3 h-full flex flex-col'>
                <div className='absolute top-[25%] left-[10%] flex flex-col'>
                    <h1 className='text-6xl text-white font-bold my-4'>eZWC</h1>
                    <p className='text-xl text-white font-bold my-4'>Educate, Engage, Evolve: Towards a Greener Tomorrow</p>
                </div>

                <img src={loginBg} alt="bg-img" className='w-full h-full object-cover' />
            </div>

            <div className='w-1/3 h-full bg-[#f5f5f5] flex flex-col p-10 p-20 justify-between min-w-[500px]'>
                <h1 className='text-xl text-[#060606] font-semibold'>Center for Global Sustainability Studies (CGSS)</h1>

                <div className='w-full flex flex-col max-w-[500px]'>
                    <div>
                        <h3 className='text-3xl font-semibold mb-4'>Admin Login</h3>
                        <p className='text-bsae mb-2'>Welcome Back! Please enter your details.</p>
                        <form onSubmit={handleLogin} className='w-full flex flex-col'>
                            <input
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                            />
                            <div className='w-full flex flex-col my-4'>
                                <button type='submit' className='w-full text-white my-2 bg-ezwcColor rounded-md p-2 text-center flex items-center justify-center'>
                                    Log In
                                </button>
                                <Link className='text-center text-ezwcColor'>Forgot Password?</Link>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='w-full flex items-center justify-center'>
                    <p>This site is only associate for CGSS staff</p>
                </div>
            </div>
        </div>
    );
};

export default Login;

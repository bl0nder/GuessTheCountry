import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
import Ripples from 'react-ripples'

export default function Login() {

    const [userInfo, setUserInfo] = useState({email: "", password: ""})
    const router = useRouter()
    const {login} = useAuth()

    return (
        <form className="font-barlow flex flex-col items-center justify-center h-screen bg-[#11161E] text-white">
            <div className="text-center text-[2.5rem] md:text-[3rem] font-medium">
                Login using your details
            </div>
            <div className="mt-[1rem]"></div>
            <input className="text-black text-[1.5rem] mt-[0.5rem] p-1 pl-[0.5rem] pr-[1rem] md:p-2 md:pl-[1rem] md:pr-[2rem]" placeholder="Email" required type="email" onChange={(event) => {
                setUserInfo({
                    ...userInfo,
                    email: event.target.value
                })
            }}>
            </input>

            <input className = "mt-3 text-[1.5rem] text-black p-1 pl-[0.5rem] pr-[1rem] md:p-2 md:pl-[1rem] md:pr-[2rem]" placeholder="Password" required type="password" onChange={(event) => {
                setUserInfo({
                    ...userInfo,
                    password: event.target.value
                })
            }}>
            </input>

            <div className="h-[1rem]"></div>

            <Ripples color = "#11161E" during="1250">
            <button 
            className="hover:bg-white hover:text-[#11161E] bg-transparent text-white font-medium text-[2rem] p-1 pl-[1rem] pr-[1rem] md:p-2 md:pl-[2rem] md:pr-[2rem]" 
            onClick={async (event) => {
                event.preventDefault()

                try {
                    await login(userInfo.email, userInfo.password)
                    router.push('/dashboard')
                } catch (error) {
                    console.log(error)
                    router.push('/login')
                }
                
            }}
            type="submit">
                Login
            </button>
            </Ripples>

        </form>
    )
}

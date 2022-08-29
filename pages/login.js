import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

export default function Login() {

    const [userInfo, setUserInfo] = useState({email: "", password: ""})
    const router = useRouter()
    const {user, login} = useAuth()

    return (
        <form className="flex flex-col items-center justify-center h-screen bg-black text-white">
            Login form
            <input className="text-black mt-3" placeholder="Email" required type="email" onChange={(event) => {
                setUserInfo({
                    ...userInfo,
                    email: event.target.value
                })
            }}>
            </input>

            <input className = "mt-3 text-black" placeholder="Password" required type="password" onChange={(event) => {
                setUserInfo({
                    ...userInfo,
                    password: event.target.value
                })
            }}>
            </input>

            <button 
            className="bg-white text-black mt-3 rounded p-2 w-[7rem]" 
            onClick={async (event) => {
                event.preventDefault()
                // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                // if (re.test(userInfo.email)) {
                //     console.log(userInfo)
                // }
                // else {
                //     console.log("Invalid email")
                // }
                try {
                    await login(userInfo.email, userInfo.password)
                } catch (error) {
                    console.log(error)
                    router.push('/login')
                }
                
            }}
            type="submit">
                Login
            </button>

        </form>
    )
}

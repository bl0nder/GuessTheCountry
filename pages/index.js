import styles from '../styles/Home.module.css'
import Login from './login'
import Signup from './signup'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Dashboard from './dashboard'
import { useRouter } from 'next/router'

export default function Homepage() {

  const router = useRouter()
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)

    const {user} = useAuth()

    if (user) {
      router.push("/dashboard")
    }

    else {
      if (login) {
        return <Login /> 
      }

      else if (signup) {
        return <Signup />
      }
      
      else {
        return (
          <div className={`${styles.global} min-h-screen h-full bg-[#11161E] flex flex-col`}>
        
          <h1 className = {`${styles.heading} text-white self-center font-medium mt-[3rem] text-5xl sm:text-[5.3125rem]`}>
            Guess the country
          </h1>
          
          <div className= {`${styles.flag} grid grid-rows-3 border-b-[3px] border-r-[3px] border-l-[3px] mt-16 w-1/2 max-w-[31.5rem] h-[18.25rem] self-center`}>
            <div className= {`${styles.flag} border-t-[3px]`}></div>
            <div className= {`${styles.flag} flex border-t-[3px] text-[4.5rem] text-white justify-center items-center`}>?</div>
            <div className= {`${styles.flag} border-t-[3px]`}></div>
          </div>
    
          <div className = {`flex justify-center`}>
            <button 
            className={`${styles.button} mt-16 font-medium text-[2.5rem] w-[19.875rem] rounded-md`}
            onClick = {() => setLogin(true)}
            >
              Login
            </button>
            <div className="w-[4rem]"></div>
            <button 
            className={`${styles.button} mt-16 font-medium text-[2.5rem] w-[19.875rem] rounded-md`}
            onClick = {() => setSignup(true)}
            >
              Sign Up 
            </button>
          </div>  
          </div>
        )
      }
    }
}

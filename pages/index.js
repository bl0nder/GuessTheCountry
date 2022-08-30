import styles from '../styles/Home.module.css'
import Login from './login'
import Signup from './signup'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ProtectedRoute from '../components/ProtectedRoute'
import { useRouter } from 'next/router'
import { Link, useNavigate } from 'react-router-dom'
import Dashboard from './dashboard'

export default function Homepage() {

  const router = useRouter()
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)

    const {user} = useAuth()

    if (user) {
      router.push('/dashboard')
    }

    else {
      if (login) {
        return (
          <Login />
        )
      }

      else if (signup) {
        return (
            <Signup />
          )
      }
      
      else {
        return (
          // <div className={`${styles.global} min-h-screen h-full bg-[#7877C5] grid grid-rows-2`}>
          //     <div className="bg-white">
          //       <h1 className = {`${styles.heading} text-black font-medium text-5xl sm:text-[5.3125rem]`}>
          //         Guess the country
          //       </h1>
          //     </div>  
          //     <div className="bg-[#11161E]"></div>
          
          // {/* <div className= {`${styles.flag} grid grid-rows-3 border-b-[3px] border-r-[3px] border-l-[3px] mt-16 w-1/2 max-w-[31.5rem] h-[18.25rem] self-center`}>
          //   <div className= {`${styles.flag} border-t-[3px]`}></div>
          //   <div className= {`${styles.flag} flex border-t-[3px] text-[4.5rem] text-white justify-center items-center`}>?</div>
          //   <div className= {`${styles.flag} border-t-[3px]`}></div>
          // </div> */}
    
          // <div className = {`flex justify-center`}>
          //   <button 
          //   className={`${styles.button} font-medium text-[2.5rem] w-[19.875rem] rounded-md`}
          //   onClick = {() => setLogin(true)}
          //   >
          //     Login
          //   </button>
          //   <div className="w-[4rem]"></div>
          //   <button 
          //   className={`${styles.button} font-medium text-[2.5rem] w-[19.875rem] rounded-md`}
          //   onClick = {() => setSignup(true)}
          //   >
          //     Sign Up 
          //   </button>
          // </div>  
          // </div>
          <div className="min-h-screen h-full grid grid-rows-2">
            <div className={`${styles.global} text-[#11161E] bg-white text-[5rem] md:text-[7rem] mt-auto text-center font-medium`}>
              Guess the
            </div>
            <div className={` ${styles.global} text-white text-center text-[5rem] md:text-[7rem] bg-[#11161E] font-medium`}>
              Country
            <div className = {`mt-[4rem] flex`}>
            <button 
            className={`${styles.button} text-[2.5rem] pl-[2rem] pr-[2rem] md:pl-[4rem] md:pr-[4rem]`}
            onClick = {() => setLogin(true)}
            >
              Login
            </button>
            {/* <div className="w-full"></div> */}
            <button 
            className={`${styles.button} ml-auto text-[2.5rem] pl-[2rem] pr-[2rem] md:pl-[4rem] md:pr-[4rem]`}
            onClick = {() => setSignup(true)}
            >
              Sign Up 
            </button>
          </div> 
            </div>


          </div>
        )
      }
    }
}

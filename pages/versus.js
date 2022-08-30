import {useRouter} from 'next/router'
import React from 'react'
import styles from '../styles/Versus.module.css'

export default function versus() {

    const router = useRouter()

    return (
        <main className={`${styles.main} bg-[#11161E] min-h-screen h-full text-center text-white text-[2rem] flex flex-col justify-center items-center`}>
            This game mode is not available yet. Sorry 😖
            <button 
            className="p-2 pl-4 pr-4 font-medium absolute text-[1.5rem] mt-[15rem] hover:bg-white hover:text-[#11161E]"
            onClick = {() => {
                router.push('/')
            }}
            >
                Go back
            </button>
        </main>
    )
}

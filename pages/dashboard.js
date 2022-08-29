import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from '../config/firebase'
import styles from '../styles/Dashboard.module.css'

export default function Dashboard() {

    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const { user, signout } = useAuth()
    const router = useRouter()

    const q = query(collection(db,'users'), where('email', '==', user ? user.email : null));
    // console.log(q)

    useEffect(() => {
        async function getUser() {
            const data = await getDocs(q)
            data.forEach((doc) => {
                // console.lo/g(doc.data())
                setUserData({
                    name: doc.data().displayName,
                    wins: doc.data().wins,
                    gamesPlayed: doc.data().gamesPlayed
                })
            })
        }
        getUser()
        setLoading(false)
    }, [])  



    return (
        <main className = {`${styles.main} min-h-screen h-full bg-[#11161E] text-white pt-[1rem]`}>
        {loading ? 
            <span className={styles.whirlyLoader}>
                Loading
            </span>:
            <div>
                <div className="ml-[2rem] mr-[2rem]">
                    <h1 className="text-[4rem] ">Welcome, <span className="pl-[1.2rem] pr-[1.2rem] pb-[0.4rem] bg-[#7877C5] rounded-md">{userData.name}</span> 😎</h1>
                    <div className="stats text-[1.5rem]">
                        <h2 className="text-[2rem] text-emerald-400">🧩Games played: {userData.gamesPlayed}</h2>
                        {/* <h2 className="text-emerald-300">Victories: {userData.wins}</h2>
                        <h2 className="text-rose-500">Losses: {userData.gamesPlayed - userData.wins}</h2> */}
                    </div>
                    <div className="mt-[3rem] text-[3rem]">
                        Play a game:
                    </div>  
                </div>
                
                

                <div className="playGame flex justify-center gap-[2rem] md:gap-[12rem]">
                    <button 
                    className={`${styles.playGame} hover:bg-[#7877C5] hover:text-white hover:border-transparent ml-[0.5rem] mt-[2rem] font-medium text-[2.5rem] w-[19.875rem] rounded-md`}
                    onClick = {() => {
                        router.push('/solo')
                    }}
                    >
                        Solo
                    </button>
                    <button className={`${styles.playGame} mt-[2rem] mr-[0.5rem] font-medium text-[2.5rem] w-[19.875rem] rounded-md`}>
                        Versus
                    </button>
                </div>

                <div className="flex justify-center ml-[2rem] mt-[5rem]">
                    <button 
                    className= "bg-rose-600 font-medium text-[1.5rem] hover:bg-rose-700 text-black p-2 pl-8 pr-8 rounded-md"
                    onClick = {() => {
                        signout()
                        router.push('/')
                    }}>
                        Sign Out
                    </button>
                </div>
            </div>
        }
        </main>
    )
}

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/ResultsSolo.module.css'
import Confetti from 'react-confetti'
import { getDocs, query, collection, where, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from '../config/firebase'
import { useAuth } from '../context/AuthContext'


export default function ResultsPageSolo(props) {
    const router = useRouter()
    const {user} = useAuth()

    const q = query(collection(db,'users'), where('email', '==', user ? user.email : null));
    // console.log(q)
    
    async function getId() {
        const data = await getDocs(q)
        data.forEach((document) => {
            // console.lo/g(doc.data())
            const id = document.data().id
            const userRef = doc(db, 'users', id)
            
            async function getGames() {
                const games = await getDoc(userRef)
                // console.log(games)
                
                async function updateUser() {
                    const update = await updateDoc(userRef, {
                        gamesPlayed: games.data().gamesPlayed + 1
                    }) 
                }
                
                updateUser()
            }
            
            getGames()
            // console.log(doc.data().id)
        })
    }
    
    getId()
    
    return (
        <main className="flex flex-col min-h-screen h-full justify-center items-center">
            <Confetti numberOfPieces={1000} tweenDuration={10000} recycle={false}/>
            <div className="text-[5rem]">
            🎉<span className={`${styles.score} p-2 pl-4 pr-4 rounded-md`}>Your score: {props.score}/10</span> 🎉
            </div>
            <div>
                <button 
                className="text-[#7877C5] text-[2.5rem] p-1 pl-4 pr-4 mt-3 hover:bg-teal-600 hover:text-white font-medium rounded-md"
                onClick={() => {
                    props.setRound()
                    props.setScore()
                }}
                >
                    New game!
                </button>
                <button
                className="text-[#7877C5] text-[2.5rem] p-1 pl-4 pr-4 mt-3 ml-[10rem] hover:bg-teal-600 hover:text-white font-medium rounded-md"
                onClick = {() => {
                    router.push('/dashboard')
                }}
                >
                   Dashboard
                </button>
            </div>
        </main>
    )
}

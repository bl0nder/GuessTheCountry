import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { db } from '../config/firebase'
import { collection, getDocs, addDoc, setDoc , doc } from 'firebase/firestore'
import styles from '../styles/Signup.module.css'

export default function Signup() {
    const [newUserInfo, setNewUserInfo] = useState({displayName: "", email: "", password: "", gamesPlayed:0, wins:0})
    const {userId, user, signup} = useAuth() 
    const [users, setUsers] = useState([])
    const usersRef = collection(db, 'users')

    async function addUser() {
        // await addDoc(usersRef, 
        //     {
        //         id: userId,
        //         displayName: newUserInfo.displayName,
        //         email: newUserInfo.email,
        //         gamesPlayed: newUserInfo.gamesPlayed,
        //         wins: newUserInfo.wins
        //     })
        // const userId = nanoid()
        await setDoc(doc(db, 'users', userId), {
            id: userId,
            displayName: newUserInfo.displayName,
            email: newUserInfo.email,
            gamesPlayed: newUserInfo.gamesPlayed,
            wins: newUserInfo.wins
        })
    }
    
    // console.log(users)

    return (
        <form 
        className={`${styles.form} flex flex-col items-center justify-center h-screen bg-[#11161E] text-white`}>
            <div className="text-center text-[2.5rem] md:text-[3rem] font-medium">
                Please enter your details
            </div>
            <div className="mt-[1rem]"></div>
            <input 
            className={`${styles.input} p-1 pl-[0.5rem] pr-[1rem] md:p-2 md:pl-[1rem] md:pr-[2rem]`} 
            placeholder="Username" 
            required 
            onChange={(event) => {
                setNewUserInfo({
                    ...newUserInfo,
                    displayName: event.target.value
                })
            }}>
            </input>

            <input className={`${styles.input} p-1 pl-[0.5rem] pr-[1rem] md:p-2 md:pl-[1rem] md:pr-[2rem]`} placeholder="Email" required type="email" onChange={(event) => {
                setNewUserInfo({
                    ...newUserInfo,
                    email: event.target.value
                })
            }}>
            </input>

            <input className = {`${styles.input} p-1 pl-[0.5rem] pr-[1rem] md:p-2 md:pl-[1rem] md:pr-[2rem]`} placeholder="Password" required type="password" onChange={(event) => {
                setNewUserInfo({
                    ...newUserInfo,
                    password: event.target.value
                })
            }}>
            </input>

            <button 
            className="bg-transparent hover:bg-white hover:text-[#11161E] text-white mt-[1rem] p-1 pl-[1rem] pr-[1rem] md:p-2 md:pl-[2rem] md:pr-[2rem] text-[2rem] font-medium" 
            onClick={async (event) => {
                
                event.preventDefault()
                
                try {
                    await signup(newUserInfo.email, newUserInfo.password)
                    addUser()

                } catch (error) {
                    console.log(error)
                } 
                
            }}
            type="submit">
                <span className={styles.underline}>Signup</span>
            </button>

        </form>
    )
}

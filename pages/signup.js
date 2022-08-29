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
        className={`${styles.form} flex flex-col items-center justify-center h-screen bg-black text-white`}>
            <div className="text-[3rem] font-medium">Please enter your details</div>

            <input 
            className={styles.input} 
            placeholder="Username" 
            required 
            onChange={(event) => {
                setNewUserInfo({
                    ...newUserInfo,
                    displayName: event.target.value
                })
            }}>
            </input>

            <input className={styles.input} placeholder="Email" required type="email" onChange={(event) => {
                setNewUserInfo({
                    ...newUserInfo,
                    email: event.target.value
                })
            }}>
            </input>

            <input className = {styles.input} placeholder="Password" required type="password" onChange={(event) => {
                setNewUserInfo({
                    ...newUserInfo,
                    password: event.target.value
                })
            }}>
            </input>

            <button 
            className="bg-transparent hover:bg-amber-400 hover:text-black text-white mt-[1.5rem] rounded-md p-2 pl-[3rem] pr-[3rem] text-[2rem] font-medium" 
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
                Signup
            </button>

        </form>
    )
}

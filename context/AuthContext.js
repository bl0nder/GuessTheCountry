import React, { createContext, useContext, useState, useEffect } from "react"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from '../config/firebase'
import { nanoid } from 'nanoid'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    
    const [userId, setUserId] = useState() 
    // const userId = temp
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    // console.log(user)
    
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email,password)
    }
    
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email,password)
    }
    
    async function signout() {
        await signOut(auth)
        setUser(null)
    }
    
    useEffect(() => {
        setUserId(nanoid())
    }, [user])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // const uid = user.uid
                setUser({
                    uid: userId,
                    email: user.email
                })
            }
            else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])
    

    return (
        <AuthContext.Provider value = {{ user, userId, signup, login, signout }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
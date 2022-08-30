import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

    const {user} = useAuth()

    if (!user) {
        <Navigate to='/' replace />
    }

    else {
        return children
    }

}

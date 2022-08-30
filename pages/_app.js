import '../styles/globals.css'
import { AuthProvider } from '../context/AuthContext' 
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import Dashboard from './dashboard' 
import Login from './login'
import Signup from './signup'
import Homepage from './index'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp

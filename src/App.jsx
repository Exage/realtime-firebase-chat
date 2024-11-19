import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import './App.scss'

import { Main } from './pages/Main/Main'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { useUserStore } from './lib/userStore'
import { useThemeStore } from './lib/themeStore'

import { AuthPageWrapper } from './components/AuthPageWrapper/AuthPageWrapper'

import { Loader } from './components/UI/Loader/Loader'

function App() {

    const { currentUser, isLoading, fetchUserInfo } = useUserStore()
    const { theme } = useThemeStore()
    const [isDarkMode, setIsDarkMode] = useState(
        theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    )

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            fetchUserInfo(user?.uid)
        })

        return () => {
            unSub()
        }
    }, [fetchUserInfo])

    useEffect(() => {
        document.body.classList.toggle('dark-theme', isDarkMode)
        document.body.classList.toggle('light-theme', !isDarkMode)
    }, [isDarkMode])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const updateSystemTheme = (e) => {
            if (theme === 'system') {
                setIsDarkMode(e.matches)
            }
        }

        mediaQuery.addEventListener('change', updateSystemTheme)
        return () => mediaQuery.removeEventListener('change', updateSystemTheme)
    }, [theme])

    useEffect(() => {
        if (theme === 'dark') {
            setIsDarkMode(true)
        } else if (theme === 'light') {
            setIsDarkMode(false)
        } else {
            setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
        }
    }, [theme])

    if (isLoading) {
        return (
            <div className='App'>
                <div className="App__loader">
                    <Loader />
                </div>
            </div>
        )
    }

    return (
        <div className='App'>
            <Routes>

                <Route path='/' element={currentUser ? <Main /> : <Navigate to='/auth/login' />} />

                <Route path='/auth' element={!currentUser ? <AuthPageWrapper /> : <Navigate to='/' />}>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route>

            </Routes>
        </div>
    )
}

export default App

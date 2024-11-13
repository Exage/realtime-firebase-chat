import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import './App.scss'

import { Main } from './pages/Main/Main'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { useUserStore } from './lib/userStore'

import { AuthPageWrapper } from './components/AuthPageWrapper/AuthPageWrapper'

import { Loader } from './components/UI/Loader/Loader'

function App() {

    const { currentUser, isLoading, fetchUserInfo } = useUserStore()
    const location = useLocation()

    console.log('Loading', isLoading)
    console.log('User', currentUser)

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            fetchUserInfo(user?.uid)
        })

        return () => {
            unSub()
        }
    }, [fetchUserInfo])

    // useEffect(() => {
    // 	if (location.pathname.startsWith('/auth')) {
    // 		document.body.setAttribute('class', 'about-bg')
    // 	} else {
    // 		document.body.removeAttribute('class', 'about-bg')
    // 	}
    // }, [location.pathname])

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

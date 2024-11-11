import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.scss'

import { Main } from './pages/Main/Main'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'

import { AuthPageWrapper } from './components/AuthPageWrapper/AuthPageWrapper'

function App() {

	const user = true
	const location = useLocation()

	useEffect(() => {
		if (location.pathname.startsWith('/auth')) {
			document.body.setAttribute('class', 'about-bg')
		} else {
			document.body.removeAttribute('class', 'about-bg')
		}
	}, [location.pathname])

	return (
		<div className='App'>
			<Routes>

				<Route path='/' element={user ? <Main /> : <Navigate to='/auth/login' />} />

				<Route path='/auth' element={!user ? <AuthPageWrapper /> : <Navigate to='/' />}>
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
				</Route>

			</Routes>
		</div>
	)
}

export default App

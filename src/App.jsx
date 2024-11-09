import React, { useState } from 'react'
import './App.scss'

import { Sidebar } from './components/Sidebar/Sidebar'
import { Chat } from './components/Chat/Chat'
import { Details } from './components/Details/Details'

function App() {

	const [details, setDetails] = useState(JSON.parse(localStorage.getItem('displayDetails')) || false)

	const showDetails = () => {
		localStorage.setItem('displayDetails', JSON.stringify(true))
		setDetails(true)
	}

	const hideDetails = () => {
		localStorage.setItem('displayDetails', JSON.stringify(false))
		setDetails(false)
	}

	return (
		<div className='App'>
			<Sidebar />
			<Chat details={details} showDetails={showDetails} />
			{details && <Details hideDetails={hideDetails} />}
		</div>
	)
}

export default App

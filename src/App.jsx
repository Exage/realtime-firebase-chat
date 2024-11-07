import React from 'react'
import './App.scss'

import { Sidebar } from './components/Sidebar/Sidebar'
import { Chat } from './components/Chat/Chat'
import { Details } from './components/Details/Details'

function App() {
	return (
		<div className='App'>
			<Sidebar />
			<Chat />
			<Details />
		</div>
	)
}

export default App

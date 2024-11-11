import React, { useState } from 'react'
import './Main.scss'

import { Chat } from '@/components/Chat/Chat'
import { Details } from '@/components/Details/Details'
import { Sidebar } from '@/components/Sidebar/Sidebar'

export const Main = () => {

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
        <main className='main'>
            <Sidebar />
            <Chat details={details} showDetails={showDetails} />
            {details && <Details hideDetails={hideDetails} />}
        </main>
    )
}

import React, { useState } from 'react'
import './Main.scss'

import { Chat } from '@/components/Chat/Chat'
import { Details } from '@/components/Details/Details'
import { Sidebar } from '@/components/Sidebar/Sidebar'

import { FindUser } from '@/modals/FindUser/FindUser'
import { StartGroup } from '@/modals/StartGroup/StartGroup'
import { UserSettings } from '@/modals/UserSettings/UserSettings'

import { useChatStore } from '@/lib/chatStore'

export const Main = () => {

    const { chatId } = useChatStore()

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
            {chatId && (details && <Details hideDetails={hideDetails} />)}

            <FindUser />
            <StartGroup />
            <UserSettings />
        </main>
    )
}

import React, { useState } from 'react'
import './Main.scss'

import { Chat } from '@/components/Chat/Chat'
import { Details } from '@/components/Details/Details'
import { Sidebar } from '@/components/Sidebar/Sidebar'

import { FindUser } from '@/modals/FindUser/FindUser'
import { StartGroup } from '@/modals/StartGroup/StartGroup'
import { UserSettings } from '@/modals/UserSettings/UserSettings'
import { Settings } from '@/modals/Settings/Settings'
import { ClearChat } from '@/modals/ClearChat/ClearChat'
import { DeleteChat } from '@/modals/DeleteChat/DeleteChat'
import { LeaveGroup } from '@/modals/LeaveGroup/LeaveGroup'
import { AddMember } from '@/modals/AddMember/AddMember'
import { MembersList } from '@/modals/MembersList/MembersList'
import { GroupSettings } from '@/modals/GroupSettings/GroupSettings'
import { BlockUser } from '@/modals/BlockUser/BlockUser'

import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'
import { useResponseMenus } from '@/lib/responseMenus'

export const Main = () => {

    const { currentUser } = useUserStore()
    const { chatId, type, groupData } = useChatStore()

    const { detailsOpened, setDetailsOpened } = useResponseMenus()
    const [details, setDetails] = useState(JSON.parse(localStorage.getItem('displayDetails')) || false)

    const showDetails = () => {
        localStorage.setItem('displayDetails', JSON.stringify(true))
        setDetails(true)
        setDetailsOpened(true)
    }

    const hideDetails = () => {
        localStorage.setItem('displayDetails', JSON.stringify(false))
        setDetails(false)
        setDetailsOpened(false)
    }

    return (
        <main className='main'>
            <Sidebar />
            <Chat details={details} showDetails={showDetails} />
            {chatId && <Details details={details} hideDetails={hideDetails} />}

            <FindUser />
            <StartGroup />
            <UserSettings />
            <Settings />
            
            {/* Single Modals */}
            {type === 'single' && <ClearChat />}
            {type === 'single' && <DeleteChat />}
            {type === 'single' && <BlockUser />}

            {/* Group Modals */}
            {type === 'group' && <GroupSettings />}
            {type === 'group' && <AddMember />}
            {type === 'group' && <MembersList />}
            {type === 'group' && <LeaveGroup />}
            {(type === 'group' && currentUser.id === groupData.owner) && <DeleteChat />}

        </main>
    )
}

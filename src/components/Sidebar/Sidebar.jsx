import React from 'react'
import './Sidebar.scss'

import { Top } from './Top/Top'
import { Search } from './Search/Search'
import { ChatList } from './ChatList/ChatList'
import { UserInfo } from './UserInfo/UserInfo'

export const Sidebar = () => {

    return (
        <div className='sidebar'>
            <Top />
            <Search />
            <ChatList />
            <UserInfo />
        </div>
    )
}

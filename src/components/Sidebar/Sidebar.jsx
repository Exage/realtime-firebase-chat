import React from 'react'
import './Sidebar.scss'
import { useResponseMenus } from '@/lib/responseMenus'

import classNames from 'classnames'

import { Top } from './Top/Top'
import { Search } from './Search/Search'
import { ChatList } from './ChatList/ChatList'
import { UserInfo } from './UserInfo/UserInfo'

export const Sidebar = () => {

    const { sidebarOpened, setSidebarOpened } = useResponseMenus()

    return (
        <div 
            className={classNames('sidebar__wrapper', { opened: sidebarOpened })}
            onClick={() => setSidebarOpened(false)}
        >
            <div 
                className={classNames('sidebar', { opened: sidebarOpened })}
                onClick={e => e.stopPropagation()}
            >
                <Top />
                <Search />
                <ChatList />
                <UserInfo />
            </div>
        </div>
    )
}

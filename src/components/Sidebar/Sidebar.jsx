import React from 'react'
import './Sidebar.scss'

import { Search } from './Search/Search'
import { UserList } from './UsersList/UserList'
import { UserInfo } from './UserInfo/UserInfo'

export const Sidebar = () => {

    return (
        <div className='sidebar'>
            <Search />
            <UserList />
            <UserInfo />
        </div>
    )
}

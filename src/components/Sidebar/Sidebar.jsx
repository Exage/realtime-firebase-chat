import React from 'react'
import './Sidebar.scss'

import { Top } from './Top/Top'
import { Search } from './Search/Search'
import { UserList } from './UsersList/UserList'
import { UserInfo } from './UserInfo/UserInfo'

export const Sidebar = () => {

    return (
        <div className='sidebar'>
            <Top />
            <Search />
            <UserList />
            <UserInfo />
        </div>
    )
}

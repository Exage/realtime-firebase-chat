import React from 'react'
import styles from './UserList.module.scss'

import { User } from './User/User'

const userData = [
    {
        id: Math.round(Math.random() * 100000).toString(),
        avatar: "https://placehold.co/56",
        name: "Ben",
        lastname: "Kenobi",
        username: "ben.kenobi",
        email: "kennobiben@gmail.com",
        blocked: []
    },
    {
        id: Math.round(Math.random() * 100000).toString(),
        avatar: "https://placehold.co/56",
        name: "Ben",
        lastname: "Kenobi",
        username: "ben.kenobi",
        email: "kennobiben@gmail.com",
        blocked: []
    },
    {
        id: Math.round(Math.random() * 100000).toString(),
        avatar: "https://placehold.co/56",
        name: "Ben",
        lastname: "Kenobi",
        username: "ben.kenobi",
        email: "kennobiben@gmail.com",
        blocked: []
    }
]

export const UserList = () => {

    const { users, users__overflow } = styles

    return (
        <div className={users}>
            <div className={users__overflow}>

                {userData.map((data, index) => {
                    return (
                        <User data={data} key={data.id} index={index} />
                    )
                })}

            </div>
        </div>
    )
}

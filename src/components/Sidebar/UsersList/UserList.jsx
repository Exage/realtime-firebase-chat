import React from 'react'
import styles from './UserList.module.scss'

const userData = [
    {
        id: "1351235",
        avatar: "https://placehold.co/56",
        name: "Ben",
        lastname: "Kenobi",
        username: "ben.kenobi",
        email: "kennobiben@gmail.com",
        blocked: []
    },
    {
        id: "65656552",
        avatar: "https://placehold.co/56",
        name: "Ben",
        lastname: "Kenobi",
        username: "ben.kenobi",
        email: "kennobiben@gmail.com",
        blocked: []
    },
    {
        id: "5456965",
        avatar: "https://placehold.co/56",
        name: "Ben",
        lastname: "Kenobi",
        username: "ben.kenobi",
        email: "kennobiben@gmail.com",
        blocked: []
    }
]

export const UserList = () => {

    const {
        users,
        users__overflow,
        user,
        active,
        user__photo,
        user__text,
        user__name,
        user__subtitle
    } = styles

    return (
        <div className={users}>
            <div className={users__overflow}>
                {userData.map((item, index) => {
                    return (
                        <div className={index === 1 ? `${user} ${active}` : user} key={item.id}>
                            {/* {<div className={user} key={item.id}>} */}
                            <div className={user__photo}>
                                <img src={item.avatar} alt="" />
                            </div>
                            <div className={user__text}>
                                <h3 className={user__name}>
                                    {`${item.name} ${item.lastname}`}
                                </h3>
                                <p className={user__subtitle}>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque aspernatur minima consectetur illo accusantium maiores mollitia incidunt omnis doloribus dolor magnam amet deserunt facere in cupiditate sequi, error explicabo accusamus.
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

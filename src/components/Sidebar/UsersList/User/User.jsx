import React from 'react'
import styles from './User.module.scss'

export const User = ({ data, index }) => {

    const { user, active, user__photo, user__text, user__name, user__subtitle } = styles

    const { avatar, name, lastname } = data

    return (
        <div className={index === 1 ? `${user} ${active}` : user}>
            {/* {<div className={user} */}
            <div className={user__photo}>
                <img src={avatar} alt="" />
            </div>
            <div className={user__text}>
                <h3 className={user__name}>
                    {`${name} ${lastname}`}
                </h3>
                <p className={user__subtitle}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque aspernatur minima consectetur illo accusantium maiores mollitia incidunt omnis doloribus dolor magnam amet deserunt facere in cupiditate sequi, error explicabo accusamus.
                </p>
            </div>
        </div>
    )
}

import React from 'react'
import styles from './Top.module.scss'

export const Top = () => {

    const { top, user, avatar, name } = styles

    return (
        <div className={top}>
            <div className={user}>
                <div className={avatar}>
                    <img src="https://placehold.co/54" alt="" />
                </div>
                <div className={name}>
                    Ben Kenobi
                </div>
            </div>
        </div>
    )
}

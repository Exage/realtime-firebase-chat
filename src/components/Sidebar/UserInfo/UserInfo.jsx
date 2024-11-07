import React from 'react'
import styles from './UserInfo.module.scss'

export const UserInfo = () => {

    const { user, user__info, user__photo, user__text, user__name, user__subtitle, buttons } = styles

    return (
        <div className={user__info}>
            <div className={user}>
                <div className={user__photo}>
                    <img src="https://placehold.co/56" alt="" />
                </div>
                <div className={user__text}>
                    <h3 className={user__name}>
                        Niktia Horkavchuk
                    </h3>
                    <p className={user__subtitle}>
                        @n.horkavchuk
                    </p>
                </div>
            </div>
            <div className={buttons}>

            </div>
        </div>
    )
}

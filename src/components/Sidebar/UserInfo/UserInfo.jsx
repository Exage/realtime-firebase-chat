import React from 'react'
import styles from './UserInfo.module.scss'

export const UserInfo = () => {

    const { 
        user, 
        ['user__info']: userInfo, 
        ['user__photo']: userPhoto, 
        ['user__text']: userText, 
        ['user__name']: userName, 
        ['user__subtitle']: userSubtitle, 
        buttons 
    } = styles

    return (
        <div className={userInfo}>
            <div className={user}>
                <div className={userPhoto}>
                    <img src="https://placehold.co/56" alt="" />
                </div>
                <div className={userText}>
                    <h3 className={userName}>
                        Niktia Horkavchuk
                    </h3>
                    <p className={userSubtitle}>
                        @n.horkavchuk
                    </p>
                </div>
            </div>
            <div className={buttons}>

            </div>
        </div>
    )
}

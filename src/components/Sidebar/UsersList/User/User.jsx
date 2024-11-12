import React from 'react'
import styles from './User.module.scss'

export const User = ({ data }) => {

    const {
        user,
        ['user__photo']: userPhoto,
        ['user__text']: userText,
        ['user__name']: userName,
        ['user__subtitle']: userSubtitle,
        active
    } = styles

    const { avatar, name } = data

    return (
        <div className={user}>
            <div className={userPhoto}>
                <img src={avatar} alt="" />
            </div>
            <div className={userText}>
                <h3 className={userName}>
                    {name}
                </h3>
                <p className={userSubtitle}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque aspernatur minima consectetur illo accusantium maiores mollitia incidunt omnis doloribus dolor magnam amet deserunt facere in cupiditate sequi, error explicabo accusamus.
                </p>
            </div>
        </div>
    )
}

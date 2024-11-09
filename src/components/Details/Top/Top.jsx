import React from 'react'
import styles from './Top.module.scss'

export const Top = () => {

    const { 
        top, 
        avatar,
        name
    } = styles

    return (
        <div className={top}>
            <div className={avatar}>
                <img src="https://placehold.co/100" alt="" />
            </div>
            <h3 className={name}>
                Ben Kenobi
            </h3>
        </div>
    )
}

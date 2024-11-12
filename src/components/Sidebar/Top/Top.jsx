import React from 'react'
import styles from './Top.module.scss'

import { IconButton } from '@/components/UI/IconButton/IconButton'

import userAdd from '@/assets/icons/pen-to-square.svg'

export const Top = () => {
    
    const { 
        top,
        ['top__btn']: topBtn 
    } = styles
    
    return (
        <div className={top}>
            <IconButton icon={userAdd} className={[topBtn]} />
        </div>
    )
}

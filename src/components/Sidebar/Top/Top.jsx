import React from 'react'
import styles from './Top.module.scss'

import { IconButton } from '@/components/UI/IconButton/IconButton'

import userAdd from '@/assets/icons/pen-to-square.svg'
import userGroup from '@/assets/icons/user-group.svg'

import { useModals } from '@/lib/modalsStore'

export const Top = () => {
    
    const { 
        top,
        ['top__btn']: topBtn 
    } = styles

    const { openModal } = useModals()
    
    return (
        <div className={top}>
            <IconButton 
                icon={userGroup} 
                className={[topBtn]}
                onClick={() => openModal('startGroup')} 
            />

            <IconButton 
                icon={userAdd} 
                className={[topBtn]}
                onClick={() => openModal('findUser')} 
            />
        </div>
    )
}

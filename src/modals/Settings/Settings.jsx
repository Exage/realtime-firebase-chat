import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from './Settings.module.scss'

import { Modal } from '@/components/Modal/Modal'

import { RadioButton } from './RadioButton/RadioButton'

import moon from '@/assets/icons/moon.svg'
import sun from '@/assets/icons/sun.svg'
import system from '@/assets/icons/system.svg'

export const Settings = () => {

    const { radios } = styles

    const btns = [
        {
            value: 'light',
            title: 'Light',
            icon: sun
        },
        {
            value: 'dark',
            title: 'Dark',
            icon: moon
        },
        {
            value: 'system',
            title: 'System',
            icon: system
        }
    ]

    return (
        <Modal
            modalId='settings'
            title='Change theme'
        >
            <div className={radios}>
                {btns.map((btn, index) => (
                    <RadioButton 
                        key={index} 
                        index={index} 
                        name={'theme-radio'}
                        value={btn.value}
                        icon={btn.icon}
                    >
                        {btn.title}
                    </RadioButton>
                ))}
            </div>
        </Modal>
    )
}
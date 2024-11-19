import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './Settings.module.scss'

import { Modal } from '@/components/Modal/Modal'
import { Button } from '@/components/UI/Button/Button'

import { useThemeStore } from '@/lib/themeStore'

export const Settings = () => {

    const { setTheme } = useThemeStore()

    return (
        <Modal
            modalId='settings'
            title='Settings'
        >
            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <Button onClick={() => setTheme('light')}>Light</Button>
                <Button onClick={() => setTheme('dark')}>Dark</Button>
                <Button onClick={() => setTheme('system')}>System</Button>
            </div>
        </Modal>
    )
}
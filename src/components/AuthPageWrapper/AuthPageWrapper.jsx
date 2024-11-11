import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './AuthPageWrapper.module.scss'

import { Blurhash } from 'react-blurhash'

import bgPhoto from '@/assets/auth/auth-bg.jpg'

export const AuthPageWrapper = () => {

    const [bgLoading, setBgLoading] = useState(true)

    const {
        ['auth-page__wrapper']: wrapper,
        ['auth-page__wrapper-bg']: background,
        ['auth-page__content']: content
    } = styles

    const handleBgLoading = () => {
        setBgLoading(false)
    }

    return (
        <div className={wrapper}>
            <div className={background}>
                {bgLoading && (
                    <Blurhash
                        hash='L8BDC8-i$rM.~T-,RoEN?HtdNFE0'
                        className='placeholder'
                        style={{ width: '100%', height: '100%' }}
                    />
                )}
                <img
                    src={bgPhoto}
                    alt="something went wrong :("
                    style={{
                        display: bgLoading ? 'none' : 'block'
                    }}
                    onLoad={handleBgLoading}
                />
            </div>
            <div className={content}>
                <Outlet />
            </div>
        </div>
    )
}

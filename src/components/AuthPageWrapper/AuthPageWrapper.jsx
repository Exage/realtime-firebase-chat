import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './AuthPageWrapper.module.scss'

import { Blurhash } from 'react-blurhash'

import bgPhoto from '@/assets/auth/auth-bg.jpg'
import bgPhotoDark from '@/assets/auth/auth-bg-dark.jpg'

export const AuthPageWrapper = () => {

    const {
        ['auth-page__wrapper']: wrapper,
        ['auth-page__wrapper-bg']: background,
        ['auth-page__content']: content
    } = styles

    const [bgLoading, setBgLoading] = useState(true)
    const [isDarkMode, setIsDarkMode] = useState(false)

    const hashLight = 'L8BDC8-i$rM.~T-,RoEN?HtdNFE0'
    const hashDark = 'L27cOT$%0]5$1Dne}K1C5#Ec^B,t'

    const handleBgLoading = () => {
        setBgLoading(false)
    }

    const updateTheme = (e) => {
        setIsDarkMode(e.matches)
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        setIsDarkMode(mediaQuery.matches)
        mediaQuery.addEventListener('change', updateTheme)

        return () => mediaQuery.removeEventListener('change', updateTheme)
    }, [])

    return (
        <div className={wrapper}>
            <div className={background}>
                {bgLoading && (
                    <Blurhash
                        hash={isDarkMode ? hashDark : hashLight}
                        className='placeholder'
                        style={{ width: '100%', height: '100%' }}
                    />
                )}
                <img
                    src={isDarkMode ? bgPhotoDark : bgPhoto}
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

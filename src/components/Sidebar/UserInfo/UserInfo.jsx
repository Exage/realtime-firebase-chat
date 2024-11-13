import React, { useRef, useState, useEffect } from 'react'
import styles from './UserInfo.module.scss'
import { useUserStore } from '@/lib/userStore'

import { Button } from '@/components/UI/Button/Button'

import logoutIcon from '@/assets/icons/logout.svg'
import userSettings from '@/assets/icons/user-pen.svg'

export const UserInfo = () => {

    const {
        user,
        ['user__info']: userInfo,
        ['user__photo']: userPhoto,
        ['user__photo-none']: userPhotoNone,
        ['user__text']: userText,
        ['user__name']: userName,
        ['user__subtitle']: userSubtitle,
        ['user__menu']: menu,
        ['user__menu-inner']: menuInner,
        ['user__menu-btn']: menuBtn,
        ['user__menu-wrapper']: menuWrapper,
        red
    } = styles

    const menuRef = useRef(null)
    const [openMenu, setOpenMenu] = useState(false)
    const { currentUser, logout } = useUserStore()

    const handleOpenMenu = (e) => {
        e.stopPropagation()
        setOpenMenu(true)
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(false)
            }
        }

        window.addEventListener('click', handleClickOutside)

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <div className={userInfo}>

            <div className={menuWrapper}>
                {openMenu && (
                    <div className={menu} ref={menuRef}>
                        <div className={menuInner}>
                            <Button
                                onClick={logout}
                                className={[menuBtn, red]}
                                icon={logoutIcon}
                            >
                                Logout
                            </Button>
                            <Button
                                className={[menuBtn]}
                                icon={userSettings}
                            >
                                User Settings
                            </Button>
                        </div>
                    </div>
                )}

                <div className={user} onClick={handleOpenMenu}>
                    <div className={userPhoto}>
                        {currentUser.avatar.photo || (
                            <div className={userPhotoNone}>
                                {currentUser.name[0]}
                            </div>
                        )}
                    </div>
                    <div className={userText}>
                        <h3 className={userName}>
                            {currentUser.name}
                        </h3>
                        <p className={userSubtitle}>
                            {currentUser.username}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import { ReactSVG } from 'react-svg'
import classNames from 'classnames'
import styles from './UserInfo.module.scss'

import { useUserStore } from '@/lib/userStore'
import { useModals } from '@/lib/modalsStore'

import { IconButton } from '@/components/UI/IconButton/IconButton'

import userSettings from '@/assets/icons/user-pen.svg'
import gear from '@/assets/icons/gear.svg'
import copy from '@/assets/icons/copy.svg'
import check from '@/assets/icons/check.svg'

export const UserInfo = () => {

    const {
        user,
        ['user__info']: userInfo,
        ['user__photo']: userPhoto,
        ['user__photo-none']: userPhotoNone,
        ['user__text']: userText,
        ['user__name']: userName,
        ['user__subtitle']: userSubtitle,
        ['user__subtitle-copied']: userCopied,
        ['user__subtitle-icon']: userSubtitleIcon,
        ['user__subtitle-text']: userSubtitleText,
        ['user__buttons']: userButtons,
        ['user__buttons-btn']: userButton
    } = styles

    const { currentUser } = useUserStore()
    const { openModal } = useModals()

    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(currentUser.username)
            .then(() => {
                setIsCopied(true)
            })
            .catch((error) => console.error('Copy username error:', error))
    }

    const handleMouseLeave = () => {
        setIsCopied(false)
    }

    const handleOpenUserSettings = () => {
        openModal('userSettings')
    }

    const handleOpenSettings = () => {
        openModal('settings')
    }

    return (
        <div className={userInfo}>

            <div className={user}>
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
                    <button 
                        className={classNames(userSubtitle, { [userCopied]: isCopied })} 
                        onClick={handleCopy}
                        onTouchStart={handleCopy}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className={userSubtitleIcon}>
                            {isCopied ? <ReactSVG src={check} /> : <ReactSVG src={copy} />}
                        </div>
                        <span className={userSubtitleText}>
                            {isCopied ? 'copied!' : currentUser.username }
                        </span>
                    </button>
                </div>
                <div className={userButtons}>
                    <IconButton 
                        icon={userSettings} 
                        className={[userButton]} 
                        onClick={handleOpenUserSettings} 
                    />
                    <IconButton 
                        icon={gear} 
                        className={[userButton]}
                        onClick={handleOpenSettings} 
                    />
                </div>
            </div>

        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormValidation } from '@/validation/formValidation'
import { useUpdateUser } from '@/hooks/useUpdateUser'

import classNames from 'classnames'

import styles from './UserSettings.module.scss'

import { useUserStore } from '@/lib/userStore'

import { Input } from '@/components/UI/Input/Input'
import { Button } from '@/components/UI/Button/Button'
import { IconButton } from '@/components/UI/IconButton/IconButton'

import { Modal } from '@/components/Modal/Modal'

import pen from '@/assets/icons/pen.svg'
import logoutIcon from '@/assets/icons/logout.svg'

import { NameEdit } from './NameEdit/NameEdit'
import { UsernameEditing } from './UsernameEditing/UsernameEditing'

export const UserSettings = () => {

    const {
        ['user-settings']: userSettings,
        ['user-settings__photo']: photoClass,
        ['user-settings__photo-none']: photoNone,
        ['user-settings__text']: text,
        ['user-settings__text-name']: title,
        ['user-settings__text-row']: row,
        ['user-settings__text-username']: usernameClass,
        ['pen']: penClass,
        ['logout']: logoutWrapper,
        ['logout__button']: logoutBtn
    } = styles

    const [displayedName, setNameDisplayed] = useState('')
    const [displayedUsername, setUsernameDisplayed] = useState('')

    const { currentUser, logout } = useUserStore()

    const [nameEditing, setNameEditing] = useState(false)
    const [usernameEditing, setUsernameEditing] = useState(false)
    const [photoEditing, setPhotoEditing] = useState(false)

    const [showBottom, setShowBottom] = useState(false)

    const handleNameEdit = () => {
        setNameEditing(true)
        setUsernameEditing(false)
        setPhotoEditing(false)
    }

    const handleUsernameEdit = () => {
        setNameEditing(false)
        setUsernameEditing(true)
        setPhotoEditing(false)
    }

    const handlePhotoEdit = () => {
        setNameEditing(false)
        setUsernameEditing(false)
        setPhotoEditing(true)
    }

    const handleSetFile = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    const resetData = () => {
        setNameEditing(false)
        setUsernameEditing(false)
        setPhotoEditing(false)
    }

    useEffect(() => {
        if (nameEditing || usernameEditing || photoEditing) {
            setShowBottom(false)
        } else {
            setShowBottom(true)
        }
    }, [nameEditing, usernameEditing, photoEditing])

    return (
        <Modal
            // title='User settings'
            modalId='userSettings'
            resetForms={resetData}
        >
            <div className={userSettings}>

                <button onClick={handlePhotoEdit} >
                    <div className={photoClass}>
                        {currentUser.avatar.photo || (
                            <div className={photoNone}>
                                {displayedName ? displayedName[0] : currentUser.name[0]}
                            </div>
                        )}
                    </div>
                </button>

                <div className={text}>
                    <div className={row}>
                        <h3 className={title}>
                            <span>
                                {displayedName || currentUser.name}
                            </span>

                            <IconButton
                                icon={pen}
                                className={[penClass]}
                                size={18}
                                onClick={handleNameEdit}
                            />
                        </h3>
                    </div>
                    <div className={row}>
                        <h4 className={usernameClass}>
                            <span>
                                {displayedUsername ? `@${displayedUsername}` : currentUser.username}
                            </span>

                            <IconButton
                                icon={pen}
                                className={[penClass]}
                                size={18}
                                onClick={handleUsernameEdit}
                            />
                        </h4>
                    </div>

                </div>

            </div>

            {nameEditing && (
                <NameEdit
                    setNameDisplayed={setNameDisplayed}
                    editing={nameEditing}
                    setEditing={setNameEditing} />
            )}
            {usernameEditing && (
                <UsernameEditing
                    setUsernameDisplayed={setUsernameDisplayed}
                    editing={usernameEditing}
                    setEditing={setUsernameEditing} />
            )}

            {showBottom && (
                <div className={logoutWrapper}>
                    <Button
                        className={[logoutBtn]}
                        icon={logoutIcon}
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </div>
            )}

        </Modal>
    )
}

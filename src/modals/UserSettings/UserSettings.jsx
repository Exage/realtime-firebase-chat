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

export const UserSettings = () => {

    const {
        ['user-settings']: userSettings,
        ['user-settings__photo']: photo,
        ['user-settings__photo-none']: photoNone,
        ['user-settings__text']: text,
        ['user-settings__text-name']: title,
        ['user-settings__text-name__input']: titleInput,
        ['user-settings__text-row']: row,
        ['user-settings__text-username']: usernameClass,
        ['user-settings__text-username__input']: usernameInput,
        ['pen']: penClass,
        ['editing']: editing,
        ['editing__title']: editingTitle,
        ['editing__form']: editingForm,
        ['editing__form-input']: editingFormInput,
        ['editing__form-error']: editingFormError,
        ['logout']: logoutWrapper,
        ['logout__button']: logoutBtn,
        buttons,
        button
    } = styles

    const { register, watch, handleSubmit, formState: { errors, isValid }, setError, reset } = useForm({
        mode: 'onChange'
    })

    const { currentUser, logout } = useUserStore()
    const { updateUser, loading, error } = useUpdateUser()

    const name = watch('name')
    const username = watch('username')

    const [nameEditing, setNameEditing] = useState(false)
    const [usernameEditing, setUsernameEditing] = useState(false)
    const [editingOpen, setEditingOpen] = useState(false)
    const [disableSave, setDisableSave] = useState(true)

    useEffect(() => {
        const isNameChanged = name && name !== currentUser.name
        const isUsernameChanged = username && username !== currentUser.username

        setDisableSave(!(isValid && (isNameChanged || isUsernameChanged)))
    }, [name, username, currentUser.name, currentUser.username])

    const handleNameEdit = () => {
        setEditingOpen(true)
        setNameEditing(true)
        setUsernameEditing(false)
    }

    const handleUsernameEdit = () => {
        setEditingOpen(true)
        setNameEditing(false)
        setUsernameEditing(true)
    }

    const handleCancelBtn = () => {
        setEditingOpen(false)
        setNameEditing(false)
        setUsernameEditing(false)
        reset()
    }

    const resetData = () => {
        setEditingOpen(false)
        setNameEditing(false)
        setUsernameEditing(false)
        reset()
    }

    const handleSave = async () => {

        const updatedName = name
        const updatedUsername = username

        const updatedData = {}

        if (updatedName && updatedName !== currentUser.name) {
            updatedData.name = updatedName
        }

        if (updatedUsername && updatedUsername !== currentUser.username) {
            updatedData.username = updatedUsername
        }

        if (Object.keys(updatedData).length === 0) {
            return
        }

        await updateUser(updatedData)
        resetData()
    
    }

    useEffect(() => {
        if (error && error.field) {
            setError(error.field, { type: 'server', message: error.message })
        }
    }, [error])

    return (
        <Modal
            // title='User settings'
            modalId='userSettings'
            resetForms={resetData}
        >
            <div className={userSettings}>

                <div className={photo}>
                    {currentUser.avatar.photo || (
                        <div className={photoNone}>
                            {currentUser.name[0]}
                        </div>
                    )}
                </div>
                <div className={text}>
                    <div className={row}>
                        <h3 className={title}>
                            <span>
                                {name || currentUser.name}
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
                                {username || currentUser.username}
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
                <div className={editing}>
                    <h3 className={editingTitle}>
                        Change Name
                    </h3>
                    <div className={editingForm}>
                        <Input
                            className={[editingFormInput, { invalid: errors.name }]}
                            {...register('name', FormValidation.Name)}
                            placeholder='new name'
                            disabled={loading}
                            maxLength={50}
                        />
                    </div>
                    <p className={classNames('error', editingFormError)}>{errors.name && errors.name.message}</p>
                </div>
            )}

            {usernameEditing && (
                <div className={editing}>
                    <h3 className={editingTitle}>
                        Change username
                    </h3>
                    <div className={editingForm}>
                        <Input
                            className={[editingFormInput, { invalid: errors.username }]}
                            {...register('username', FormValidation.Username)}
                            placeholder='new username'
                            disabled={loading}
                        />
                    </div>
                    <p className={classNames('error', editingFormError)}>{errors.username && errors.username.message}</p>
                </div>
            )}

            {editingOpen && (
                <div className={buttons}>
                    <Button
                        filled={true}
                        className={[button]}
                        loading={loading}
                        disabled={disableSave}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button
                        className={[button]}
                        onClick={handleCancelBtn}
                    >
                        Cancel
                    </Button>
                </div>
            )}

            {!editingOpen && (
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

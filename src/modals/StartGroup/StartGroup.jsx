import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { useFetchUser } from '@/hooks/useFetchUser'
import { useStartGroup } from '@/hooks/useStartGroup'
import { FormValidation } from '@/validation/formValidation'
import styles from './StartGroup.module.scss'

import { Modal } from '@/components/Modal/Modal'
import { Input } from '@/components/UI/Input/Input'
import { Button } from '@/components/UI/Button/Button'
import { IconButton } from '@/components/UI/IconButton/IconButton'
import { Loader } from '@/components/UI/Loader/Loader'

import searchIcon from '@/assets/icons/search.svg'
import plusIcon from '@/assets/icons/plus.svg'
import xmarkIcon from '@/assets/icons/xmark.svg'

export const StartGroup = () => {
    const {
        ['start-group']: startGroupClass,
        ['start-group__form']: form,
        ['start-group__form-input']: formInput,
        ['start-group__form-btn']: formBtn,
        ['start-group__error']: errorClass,
        ['start-group__results']: results,
        ['start-group__bottom']: bottom,
        ['start-group__bottom-btn']: button,
        ['selected']: selected,
        ['selected__user']: selectedUser,
        ['selected__user-photo']: selectedUserPhoto,
        ['selected__user-photo__none']: selectedUserPhotoNone,
        ['selected__user-close']: selectedUserClose,
        ['selected__user-name']: selectedUserName,
        ['user']: resultsUser,
        ['user__photo']: resultsUserPhoto,
        ['user__photo-none']: resultsUserPhotoNone,
        ['user__name']: resultsUserName,
        ['user__controls']: resultsUserControls,
        icon
    } = styles

    const { fetchUser, error: fetchError, loading: fetchLoading } = useFetchUser()
    const { startGroup, error: chatError, loading: chatLoading } = useStartGroup()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const [user, setUser] = useState(null)
    const [selectedUsers, setSelectedUsers] = useState([])

    const isUserSelected = (userId) => selectedUsers.some(u => u.id === userId)

    const handleSearch = async (data) => {
        const res = await fetchUser(data)
        setUser(res)
    }

    const handleSelectUser = () => {
        if (!isUserSelected(user.id)) {
            setSelectedUsers(prev => [...prev, user])
            setUser(null)
            reset()
        }
    }

    const removeUser = (id) => {
        setSelectedUsers(prev => prev.filter(user => user.id !== id))
    }

    const resetData = () => {
        reset()
        setUser(null)
        setSelectedUsers([])
    }

    const handleStartGroup = () => {
        startGroup(selectedUsers)
    }

    return (
        <Modal title='Start new group' modalId='startGroup' resetForms={resetData}>
            <div className={startGroupClass}>
                <form className={form} onSubmit={handleSubmit(handleSearch)}>
                    <Input
                        placeholder="@username"
                        className={[formInput, { invalid: errors.username }]}
                        {...register('username', FormValidation.Username)}
                    />
                    <IconButton icon={searchIcon} className={formBtn} />
                </form>
                <p className={classNames('error', errorClass)}>{errors.username?.message}</p>

                {selectedUsers.length > 0 && (
                    <div className={selected}>
                        {selectedUsers.map(user => (
                            <div className={selectedUser} key={user.id}>
                                <div className={selectedUserPhoto}>
                                    {user.avatar.url || (
                                        <div className={selectedUserPhotoNone}>
                                            {user.name[0]}
                                        </div>
                                    )}
                                </div>
                                <div className={selectedUserName}>{user.name}</div>
                                <button className={selectedUserClose} onClick={() => removeUser(user.id)}>
                                    <ReactSVG src={xmarkIcon} className={icon} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className={results}>
                    {fetchLoading ? (
                        <Loader />
                    ) : user ? (
                        <div className={resultsUser}>
                            <div className={resultsUserPhoto}>
                                {user.avatar.photo || (
                                    <div className={resultsUserPhotoNone}>{user.name[0]}</div>
                                )}
                            </div>
                            <h3 className={resultsUserName}>{user.name}</h3>
                            <div className={resultsUserControls}>
                                <IconButton
                                    icon={plusIcon}
                                    onClick={handleSelectUser}
                                    disabled={isUserSelected(user.id)}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>Type username and try to find user</div>
                    )}
                </div>

                {selectedUsers.length > 0 && (
                    <div className={bottom}>
                        <Button filled={true} className={[button]} onClick={() => handleStartGroup()}>
                            Start chat
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    )
}

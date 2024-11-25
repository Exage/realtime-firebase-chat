import React, { useState } from 'react'

import classNames from 'classnames'
import { FormValidation } from '@/validation/formValidation'
import styles from './AddMember.module.scss'

import { useForm } from 'react-hook-form'
import { useFetchUser } from '@/hooks/useFetchUser'
import { useAddUserToGroup } from '@/hooks/useAddUserToGroup'

import { useChatStore } from '@/lib/chatStore'
import { useUserStore } from '@/lib/userStore'

import { Modal } from '@/components/Modal/Modal'

import { Input } from '@/components/UI/Input/Input'
import { IconButton } from '@/components/UI/IconButton/IconButton'
import { Loader } from '@/components/UI/Loader/Loader'

import searchIcon from '@/assets/icons/search.svg'
import plusIcon from '@/assets/icons/plus.svg'

export const AddMember = () => {

    const {
        ['find-user']: findUser,
        ['find-user__form']: form,
        ['find-user__form-input']: formInput,
        ['find-user__form-btn']: formBtn,
        ['find-user__error']: errorClass,
        ['find-user__results']: results,
        ['user']: resultsUser,
        ['user__photo']: resultsUserPhoto,
        ['user__photo-none']: resultsUserPhotoNone,
        ['user__name']: resultsUserName,
        ['user__controls']: resultsUserControls,
    } = styles

    const { fetchUser, error: fetchError, loading: fetchLoading } = useFetchUser()
    const { addUserToGroup, error: chatError, loading: chatLoading } = useAddUserToGroup()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const { currentUser } = useUserStore()
    const { chatId, groupData, users } = useChatStore()

    const [user, setUser] = useState(null)

    const handleSearch = async (data) => {
        const res = await fetchUser(data)
        setUser(res)
    }

    const resetData = () => {
        reset()
        setUser(null)
    }

    const handleAddMember = () => {
        const receiversIDs = [currentUser.id, ...users.map(user => user.id)]
        addUserToGroup(chatId, user.id, groupData, receiversIDs)
    }

    return (
        <Modal
            modalId='addMember'
            title='Add member'
            resetForms={resetData}
        >
            <div className={findUser}>
                <form className={form} onSubmit={handleSubmit(handleSearch)}>
                    <Input
                        placeholder="@username"
                        className={[formInput, { invalid: errors.username }]}
                        autoComplete="off"
                        {...register('username', FormValidation.Username)}
                    />
                    <IconButton
                        icon={searchIcon}
                        className={[formBtn]}
                    />
                </form>
                <p className={classNames('error', errorClass)}>{errors.username && errors.username.message}</p>
                {/* {errors.username && <p className={classNames('error', errorClass)}>{errors.username.message}</p>} */}

                <div className={results}>

                    {fetchLoading ? (
                        <Loader />
                    ) : (
                        <>
                            {!user && (
                                <div>
                                    Type username and try to find user
                                </div>
                            )}

                            {(user && Object.keys(user).length === 0 && (
                                <div>
                                    No results
                                </div>
                            ))}

                            {(user && Object.keys(user).length !== 0 && (
                                <div className={resultsUser}>
                                    <div className={resultsUserPhoto}>
                                        {user.avatar.photo || (
                                            <div className={resultsUserPhotoNone}>
                                                {user.name[0]}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className={resultsUserName}>
                                        {user.name}
                                    </h3>
                                    <div className={resultsUserControls}>
                                        <IconButton 
                                            icon={plusIcon}
                                            onClick={handleAddMember}
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                </div>

            </div>
        </Modal>
    )
}
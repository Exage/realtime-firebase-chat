import React, { useState } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { FormValidation } from '@/validation/formValidation'
import { useFetchUser } from '@/hooks/useFetchUser'
import { useStartChat } from '@/hooks/useStartChat'
import { useChatStore } from '@/lib/chatStore'
import { useModals } from '@/lib/modalsStore'
import styles from './FindUser.module.scss'

import { Modal } from '@/components/Modal/Modal'

import { Input } from '@/components/UI/Input/Input'
import { IconButton } from '@/components/UI/IconButton/IconButton'
import { Loader } from '@/components/UI/Loader/Loader'

import searchIcon from '@/assets/icons/search.svg'
import chatIcon from '@/assets/icons/chat.svg'

export const FindUser = () => {

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
    const { startChat, error: chatError, loading: chatLoading } = useStartChat()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { changeChat } = useChatStore()
    const { closeModal } = useModals()

    const [user, setUser] = useState(null)

    const handleSearch = async (data) => {
        const res = await fetchUser(data)
        setUser(res)
    }

    const resetData = () => {
        reset()
        setUser(null)
    }

    const handleStartNewChat = async () => {
        const res = await startChat(user)

        if (res) {
            changeChat(res)
            closeModal('findUser')
            resetData()
        }
    }

    return (
        <Modal
            modalId='findUser'
            title='Find user'
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
                                            icon={chatIcon}
                                            onClick={handleStartNewChat}
                                            loading={chatLoading}
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
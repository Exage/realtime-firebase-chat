import React, { useState } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { useFetchUser } from '@/hooks/useFetchUser'
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

    const { fetchUser, error, loading } = useFetchUser()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const [user, setUser] = useState(null)

    const handleSearch = async (data) => {
        const res = await fetchUser(data)
        setUser(res)
    }

    const resetData = () => {
        reset()
        setUser(null)
    }

    const FormValidation = {
        Username: {
            required: "This field is required",
            minLength: {
                value: 4,
                message: "Username must be at least 3 characters long"
            },
            maxLength: {
                value: 20,
                message: "Username must not exceed 20 characters"
            },
            validate: {
                startsWithAt: (value) => {
                    if (!value.startsWith('@')) {
                        return "Username must start with @"
                    }
                },
                noSpaces: (value) => {
                    if (/\s/.test(value)) {
                        return "Username must not contain spaces"
                    }
                },
                alidChars: (value) => {
                    const regex = /^[a-zA-Z0-9._@]+$/
                    if (!regex.test(value)) {
                        return "The username can only contain letters, numbers, _ and ."
                    }
                },
                // onlyEnglishLetters: value => {
                //     const regex = /^[a-zA-Z]+$/
                //     if (!regex.test(value.replace('@', ''))) {
                //         return "Username must contain only English letters"
                //     }
                // }
            }
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

                    {loading ? (
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
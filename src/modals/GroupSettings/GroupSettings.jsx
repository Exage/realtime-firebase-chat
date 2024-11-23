import React, { useEffect, useState } from 'react'
import { FormValidation } from '@/validation/formValidation'
import { useForm } from 'react-hook-form'
import styles from './GroupSettings.module.scss'
import classNames from 'classnames'

import { useChangeGroupData } from '@/hooks/useChangeGroupData'

import { Modal } from '@/components/Modal/Modal'
import { Input } from '@/components/UI/Input/Input'

import { useChatStore } from '@/lib/chatStore'
import { Button } from '@/components/UI/Button/Button'
import { IconButton } from '@/components/UI/IconButton/IconButton'

import pen from '@/assets/icons/pen.svg'

export const GroupSettings = () => {

    const {
        ['group-settings']: groupSettings,
        ['group-settings__photo']: groupSettingsPhoto,
        ['photo']: photo,
        ['photo__none']: photoNone,
        ['title']: titleClass,
        ['title__wrapper']: titleWrapper,
        ['title__edit']: titleEdit,
        ['pen']: penClass,
        ['form']: form,
        ['form__input']: input,
        ['form__input-wrapper']: inputWrapper,
        ['form__btn']: formBtn,
        ['form__error']: formError,
        ['form__btn-cancel']: formBtnCancel
    } = styles

    const { groupData } = useChatStore()
    const { changeGroupData, loading, error } = useChangeGroupData()

    const { register, handleSubmit, formState: { errors }, setError, watch } = useForm({
        mode: 'onChange',
        defaultValues: {
            groupTitle: groupData?.title
        }
    })

    const groupTitle = watch('groupTitle')

    const [isTitleEditing, setTitleEditing] = useState(false)

    const [disableSubmit, setDisableSubmit] = useState(false)

    useEffect(() => {
        if (groupTitle === groupData.title) {
            setDisableSubmit(true)
        } else {
            setDisableSubmit(false)
        }
    }, [groupData, groupTitle])

    const handleEditTitle = () => {
        setTitleEditing(true)
    }

    const handleCancelBtn = () => {
        setTitleEditing(false)
    }

    const handleSubmitForm = (Event) => {
        Event.preventDefault()
    }

    const handleSubmitNewData = async () => {
        const newGroupData = {...groupData, title: groupTitle}
        await changeGroupData(newGroupData)
        setTitleEditing(false)
    }

    const resetForms = () => {
        setTitleEditing(false)
    }

    return (
        <Modal
            modalId='groupSettings'
            title='Group settings'
            resetForms={resetForms}
        >
            <div className={groupSettings}>

                <div className={groupSettingsPhoto}>
                    <div className={photo}>
                        {groupData.cover.photo || (
                            <div className={photoNone}>
                                {groupTitle[0] || 'U'}
                            </div>
                        )}
                    </div>
                </div>

                <div className={titleWrapper}>

                    <h3 className={titleClass}>
                        {groupTitle || 'Unnamed group'}
                    </h3>

                    {!isTitleEditing && (
                        <Button
                            icon={pen}
                            className={[titleEdit]}
                            onClick={handleEditTitle}
                        >
                            Edit Title
                        </Button>
                    )}

                </div>

                {isTitleEditing && (
                    <form className={form} onSubmit={handleSubmit(handleSubmitNewData)}>

                        <div className={inputWrapper}>
                            <Input
                                placeholder="New Title"
                                className={[input, { invalid: errors.groupTitle }]}
                                maxLength={50}
                                {...register('groupTitle', FormValidation.GroupTitle)}
                            />
                        </div>
                        <p className={classNames('error', formError)}>{errors.groupTitle && errors.groupTitle.message}</p>

                        <Button
                            filled={true}
                            className={[formBtn]}
                            onClick={() => handleSubmitNewData()}
                            loading={loading}
                            disabled={disableSubmit || errors.groupTitle}
                        >
                            Save
                        </Button>
                        <Button
                            className={[formBtnCancel]}
                            onClick={handleCancelBtn}
                        >
                            Cancel
                        </Button>
                    </form>
                )}

            </div>
        </Modal>
    )
}

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

import { PhotoEdit } from './PhotoEdit/PhotoEdit'
import { TitleEdit } from './TitleEdit/TitleEdit'

import pen from '@/assets/icons/pen.svg'

export const GroupSettings = () => {

    const {
        ['group-settings']: groupSettings,
        ['group-settings__photo']: groupSettingsPhoto,
        ['photo']: photo,
        ['photo__none']: photoNone,
        ['title']: titleClass,
        ['title__edit']: titleEdit,
        wrapper
    } = styles

    const [displayedTitle, setTitleDisplayed] = useState('')
    const [displayedPhoto, setPhotoDisplayed] = useState(null)

    const { groupData } = useChatStore()

    const [titleEditing, setTitleEditing] = useState(false)
    const [photoEditing, setPhotoEditing] = useState(false)

    const handlePhotoEdit = () => {
        setTitleEditing(false)
        setPhotoEditing(true)
    }

    const handleEditTitle = () => {
        setTitleEditing(true)
        setPhotoEditing(false)
    }

    const resetData = () => {
        setTitleEditing(false)
        setPhotoEditing(false)

        setPhotoDisplayed(null)
        setTitleDisplayed('')
    }

    return (
        <Modal
            modalId='groupSettings'
            title='Group settings'
            resetForms={resetData}
        >
            <div className={groupSettings}>

                <div className={wrapper}>
                    <button onClick={handlePhotoEdit} className={groupSettingsPhoto}>
                        <div className={photo}>

                            {displayedPhoto && <img src={URL.createObjectURL(displayedPhoto)} alt='' />}

                            {!displayedPhoto && (groupData.cover.url && <Image src={groupData.cover.url} hash={groupData.cover.hash} />)}

                            {!displayedPhoto && (!groupData.cover.url && (
                                <div className={photoNone}>
                                    {displayedTitle ? displayedTitle[0] : groupData.title[0]}
                                </div>
                            ))}

                        </div>
                    </button>

                    <h3 className={titleClass}>
                        <span>
                            {displayedTitle || groupData.title}
                        </span>
                    </h3>

                    {!(titleEditing || photoEditing) && (
                        <Button
                            icon={pen}
                            className={[titleEdit]}
                            onClick={handleEditTitle}
                        >
                            Edit Title
                        </Button>
                    )}
                </div>

                {photoEditing && (
                    <PhotoEdit
                        setPhotoDisplayed={setPhotoDisplayed}
                        setEditing={setPhotoEditing}
                        resetData={resetData}
                    />
                )}

                {titleEditing && (
                    <TitleEdit
                        setTitleDisplayed={setTitleDisplayed}
                        setEditing={setTitleEditing}
                        resetData={resetData}
                    />
                )}

            </div>
        </Modal>
    )
}

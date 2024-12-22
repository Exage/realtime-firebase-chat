import React, { useState } from 'react'
import styles from './PhotoEdit.module.scss'

import { FormWrapper } from '../FormWrapper/FormWrapper'

import { useChangeGroupData } from '@/hooks/useChangeGroupData'
import { Button } from '@/components/UI/Button/Button'

import photoIcon from '@/assets/icons/photo-video.svg'

export const PhotoEdit = ({ setPhotoDisplayed, setEditing, resetData }) => {

    const { input, btn, ['btn__wrapper']: btnWrapper } = styles

    const [file, setFile] = useState(null)

    const { loading, error, changeGroupPhoto } = useChangeGroupData()

    const handleCancel = (e) => {
        e.preventDefault()
        setEditing(false)
        setPhotoDisplayed(null)
        resetData()
    }

    const handleSetFile = (e) => {
        setPhotoDisplayed(e.target.files[0])
        setFile(e.target.files[0])
    }

    const handleSave = async () => {
        await changeGroupPhoto(file)
    }

    return (
        <FormWrapper
            title='New Photo'
            errors={error}

            handleCancel={handleCancel}
            handleSave={handleSave}

            loading={loading}

            saveText='Save new photo'
        >

            {/* <div className={btnWrapper}> */}
                <Button
                    type="button"
                    labelId={'new-group-photo'}
                    filled={true}
                    icon={photoIcon}
                    tabIndex={-1}
                    className={[btn]}
                >
                    Choose group photo
                </Button>
            {/* </div> */}

            <input
                className={input}
                id='new-group-photo'
                type="file"

                onChange={handleSetFile}
            />
        </FormWrapper>
    )

}

import React, { useState } from 'react'
import modules from './PhotoEdit.module.scss'

import { FormWrapper } from '../FormWrapper/FormWrapper'

import { useUpdateUser } from '@/hooks/useUpdateUser'
import { Button } from '@/components/UI/Button/Button'

export const PhotoEdit = ({ setPhotoDisplayed, setEditing, resetData }) => {

    const { input } = modules

    const [file, setFile] = useState(null)

    const { loading, error, updatePhoto } = useUpdateUser()

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
        await updatePhoto(file)
    }

    return (
        <FormWrapper
            title='New Photo'
            errors={error}

            handleCancel={handleCancel}
            handleSave={handleSave}

            loading={loading}
        >

            <label
                htmlFor="new-user-photo"
                className='btn'
            >
                Choose photo
            </label>

            <input
                className={input}
                id='new-user-photo'
                type="file"

                onChange={handleSetFile}
            />
        </FormWrapper>
    )

}

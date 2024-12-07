import React, { useState } from 'react'
import modules from './PhotoEdit.module.scss'

import { FormWrapper } from '../FormWrapper/FormWrapper'

import { useUpdateUser } from '@/hooks/useUpdateUser'

export const PhotoEdit = ({ setPhotoDisplayed, setEditing, resetData }) => {

    const { input } = modules

    const [file, setFile] = useState(null)

    const { loading, error, updatePhoto } = useUpdateUser()

    const handleCancel = (e) => {
        e.preventDefault()
        setEditing(false)
        resetData()
    }

    const handleSetFile = (e) => {
        console.log(e.target.files[0])
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
                Choose New photo
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

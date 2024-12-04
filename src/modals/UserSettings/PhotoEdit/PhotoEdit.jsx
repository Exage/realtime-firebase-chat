import React from 'react'
import modules from './PhotoEdit.module.scss'

import { FormWrapper } from '../FormWrapper/FormWrapper'

export const PhotoEdit = ({ setPhotoDisplayed, setEditing, resetData }) => {

    const { input } = modules

    const handleCancel = (e) => {
        e.preventDefault()
        setEditing(false)
        resetData()
    }

    return (
        <FormWrapper
            title='New Photo'
            handleCancel={handleCancel}
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
            />
        </FormWrapper>
    )

}

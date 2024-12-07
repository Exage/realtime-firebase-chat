import React, { useEffect } from 'react'
import modules from './UsernameEdit.module.scss'

import { useForm } from 'react-hook-form'

import { FormValidation } from '@/validation/formValidation'

import { Input } from '@/components/UI/Input/Input'
import { FormWrapper } from '../FormWrapper/FormWrapper'

import { useUpdateUser } from '@/hooks/useUpdateUser'

export const UsernameEdit = ({ setUsernameDisplayed, editing, setEditing, resetData }) => {

    const { input } = modules

    const { updateUsername, loading, error } = useUpdateUser()

    const { register, formState: { errors }, setError, watch } = useForm({
        mode: 'onChange'
    })

    const username = watch('username')

    useEffect(() => {
        setUsernameDisplayed(username ? username.trim() : '')
    }, [username])

    useEffect(() => {
        if (error && error.field) {
            setError(error.field, { type: 'server', message: error.message })
        }
    }, [error])

    const handleCancel = (e) => {
        e.preventDefault()
        setEditing(false)
        resetData()
    }

    const handleSave = async () => {
        await updateUsername(username)
    }

    return (
        <FormWrapper
            title='Username edit'
            errors={errors.username}
            
            saveText='Save new username'
            handleCancel={handleCancel}
            handleSave={handleSave}

            loading={loading}
        >
            <Input
                className={[input, { invalid: errors.username }]}
                {...register('username', FormValidation.Username)}
                placeholder='new username'
                maxLength={20}
            />
        </FormWrapper>
    )
}

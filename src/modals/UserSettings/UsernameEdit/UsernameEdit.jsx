import React, { useEffect } from 'react'
import modules from './UsernameEdit.module.scss'

import { useForm } from 'react-hook-form'

import { FormValidation } from '@/validation/formValidation'

import { Input } from '@/components/UI/Input/Input'
import { FormWrapper } from '../FormWrapper/FormWrapper'

export const UsernameEdit = ({ setUsernameDisplayed, editing, setEditing, resetData }) => {

    const { input } = modules

    const { register, formState: { errors }, watch } = useForm({
        mode: 'onChange'
    })

    const username = watch('username')

    useEffect(() => {
        setUsernameDisplayed(username ? username.trim() : '')
    }, [username])

    const handleCancel = (e) => {
        e.preventDefault()
        setEditing(false)
        resetData()
    }

    return (
        <FormWrapper
            title='Username edit'
            errors={errors.name}
            
            saveText='Save new username'
            handleCancel={handleCancel}
        >
            <Input
                className={[input, { invalid: errors.name }]}
                {...register('username', FormValidation.Username)}
                placeholder='new username'
                maxLength={50}
            />
        </FormWrapper>
    )
}

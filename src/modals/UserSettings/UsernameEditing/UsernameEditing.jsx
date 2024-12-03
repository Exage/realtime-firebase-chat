import React, { useEffect } from 'react'
import modules from './UsernameEditing.module.scss'

import { useForm } from 'react-hook-form'

import { FormValidation } from '@/validation/formValidation'

import { Input } from '@/components/UI/Input/Input'
import { FormWrapper } from '../FormWrapper/FormWrapper'

export const UsernameEditing = ({ setUsernameDisplayed, editing, setEditing }) => {

    const { input } = modules

    const { register, formState: { errors }, watch } = useForm({
        mode: 'onChange'
    })

    const username = watch('username')

    useEffect(() => {
        setUsernameDisplayed(username ? username.trim() : '')
    }, [username])

    return (
        <FormWrapper
            title='Username edit'
            errors={errors.name}

            editing={editing}
            setEditing={setEditing}
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

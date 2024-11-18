import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FormValidation } from '@/validation/formValidation'
import { useRegister } from '@/hooks/useRegister'

import { Auth } from '@/components/Auth/Auth'
import { Input } from '@/components/UI/Input/Input'
import { InputPassword } from '@/components/UI/InputPassword/InputPassword'

export const Register = () => {

    const { register, handleSubmit, formState: { errors }, setError } = useForm()
    const { register: registerHook, loading, error } = useRegister()

    const handleRegister = async (data) => {
        await registerHook(data)
    }

    useEffect(() => {
        if (error && error.field) {
            setError(error.field, { type: 'server', message: error.message })
        }
    }, [error])

    return (
        <Auth 
            title='Register'

            btnText='register'
            handleSubmit={handleSubmit(handleRegister)}

            redirect='to login'
            redirectPath='/auth/login'

            isLoading={loading}
        >

            <label htmlFor="register-name">
                Name
            </label>
            <Input
                id='register-name'
                placeholder='example: Ben'
                className={[{ invalid: errors.name }]}
                {...register('name', FormValidation.Name)}
                disabled={loading}
            />
            <p className='error'>{errors.name && errors.name.message}</p>

            <label htmlFor="register-email">
                Email
            </label>
            <Input
                id='register-email'
                placeholder='example: ben@gmail.com'
                type='email'
                className={[{ invalid: errors.email }]}
                {...register('email', FormValidation.Email)}
                disabled={loading}
            />
            <p className='error'>{errors.email && errors.email.message}</p>

            <label htmlFor="register-username">
                Username
            </label>
            <Input
                id='register-username'
                placeholder='example: ben.kenobi'
                type="username"
                className={[{ invalid: errors.username }]}
                {...register('username', FormValidation.Username)}
                disabled={loading}
            />
            <p className='error'>{errors.username && errors.username.message}</p>

            <label htmlFor="register-password">
                Password
            </label>
            <InputPassword
                id="register-password"
                placeholder='your password'
                className={[{ invalid: errors.password }]}
                {...register('password', FormValidation.Password)}
                disabled={loading}
            />
            <p className='error'>{errors.password && errors.password.message}</p>

        </Auth>
    )
}

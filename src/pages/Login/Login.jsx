import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FormValidation } from '@/validation/formValidation'
import { useLogin } from '@/hooks/useLogin'

import { Auth } from '@/components/Auth/Auth'
import { Input } from '@/components/UI/Input/Input'
import { InputPassword } from '@/components/UI/InputPassword/InputPassword'

export const Login = () => {

    const { register, handleSubmit, formState: { errors }, setError } = useForm()
    const { login: loginHook, loading, error } = useLogin()

    const handleLogin = async (data) => {
        await loginHook(data)
    }

    useEffect(() => {
        if (error && error.field) {
            setError(error.field, { type: 'server', message: error.message })
        }
    }, [error])

    return (
        <Auth 
            title='Login'
            
            btnText='Login'
            handleSubmit={handleSubmit(handleLogin)}

            redirect='to register'
            redirectPath='/auth/register'

            isLoading={loading}
        >

            <label htmlFor="login-email">
                Email
            </label>
            <Input
                id='login-email'
                placeholder='Email'
                type="email"
                className={[{ invalid: errors.email }]}
                {...register('email', FormValidation.Email)}
                disabled={loading}
            />
            <p className='error'>{errors.email && errors.email.message}</p>

            <label htmlFor="login-password">
                Password
            </label>
            <InputPassword
                id="login-password"
                placeholder='Password'
                className={[{ invalid: errors.password }]}
                {...register('password', FormValidation.Password)}
                disabled={loading}
            />
            <p className='error'>{errors.password && errors.password.message}</p>

            <span className='error'>{errors.general && errors.general.message}</span>
            
        </Auth>
    )
}

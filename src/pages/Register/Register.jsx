import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRegister } from '@/hooks/useRegister'

import { Auth } from '@/components/Auth/Auth'
import { Input } from '@/components/UI/Input/Input'
import { InputPassword } from '@/components/UI/InputPassword/InputPassword'

export const Register = () => {

    const { register, handleSubmit, formState: { errors }, setError } = useForm()
    const { register: registerHook, loading, error } = useRegister()

    let FormValidation = {
        Name: {
            required: "Name is required"
        },
        Email: {
            required: "Email is required",
            pattern: {
                value: /^\S+@\S+$/i,
                message: "Email is not valid"
            }
        },
        Username: {
            required: "This field is required",
            minLength: {
                value: 4,
                message: "Username must be at least 3 characters long"
            },
            maxLength: {
                value: 20,
                message: "Username must not exceed 20 characters"
            },
            validate: {
                startsWithAt: (value) => {
                    if (!value.startsWith('@')) {
                        return "Username must start with @"
                    }
                },
                noSpaces: (value) => {
                    if (/\s/.test(value)) {
                        return "Username must not contain spaces"
                    }
                },
                alidChars: (value) => {
                    const regex = /^[a-zA-Z0-9._@]+$/
                    if (!regex.test(value)) {
                        return "The username can only contain letters, numbers, _ and ."
                    }
                },
                // onlyEnglishLetters: value => {
                //     const regex = /^[a-zA-Z]+$/
                //     if (!regex.test(value.replace('@', ''))) {
                //         return "Username must contain only English letters"
                //     }
                // }
            }
        },
        Password: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password sholud be minimum 8 characters"
            }
        }
    }

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

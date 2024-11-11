import React from 'react'
import { useForm } from 'react-hook-form'
import { Auth } from '@/components/Auth/Auth'
import { Input } from '@/components/UI/Input/Input'
import { InputPassword } from '@/components/UI/InputPassword/InputPassword'

export const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    let FormValidation = {
        Name: {
            required: "Name is required"
        },
        Surname: {
            required: "Surname is required"
        },
        Email: {
            required: "Email is required",
            pattern: {
                value: /^\S+@\S+$/i,
                message: "Email is not valid"
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

    const handleRegister = data => {
        console.log(data)
    }

    return (
        <Auth 
            title='Register'

            btnText='register'
            handleSubmit={handleSubmit(handleRegister)}

            redirect='to login'
            redirectPath='/auth/login'
        >

            <label htmlFor="register-name">
                Name
            </label>
            <Input
                id='register-name'
                placeholder='Name'
                className={[{ invalid: errors.name }]}
                {...register('name', FormValidation.Name)}
            />
            <p className='error'>{errors.name && errors.name.message}</p>

            <label htmlFor="register-surname">
                Surname
            </label>
            <Input
                id='register-surname'
                placeholder='Surname'
                className={[{ invalid: errors.surname }]}
                {...register('surname', FormValidation.Surname)}
            />
            <p className='error'>{errors.surname && errors.surname.message}</p>

            <label htmlFor="register-email">
                Email
            </label>
            <Input
                id='register-email'
                placeholder='Email'
                type="email"
                className={[{ invalid: errors.email }]}
                {...register('email', FormValidation.Email)}
            />
            <p className='error'>{errors.email && errors.email.message}</p>

            <label htmlFor="register-username">
                Username
            </label>
            <Input
                id='register-username'
                placeholder='Username'
                type="username"
                className={[{ invalid: errors.username }]}
                {...register('username', FormValidation.Username)}
            />
            <p className='error'>{errors.username && errors.username.message}</p>

            <label htmlFor="register-password">
                Password
            </label>
            <InputPassword
                id="register-password"
                placeholder='Password'
                className={[{ invalid: errors.password }]}
                {...register('password', FormValidation.Password)}
            />
            <p className='error'>{errors.password && errors.password.message}</p>

        </Auth>
    )
}

import React, { forwardRef, useState } from 'react'
import classNames from 'classnames'
import { ReactSVG } from 'react-svg'
import './InputPassword.scss'

import eye from '@/assets/icons/eye.svg'
import eyeSlash from '@/assets/icons/eye-slash.svg'

export const InputPassword = forwardRef(({ className = [], placeholder = "your text", ...props }, ref) => {
    
    const [showPassword, setShowPassword] = useState(false)

    const toggleShow = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    return (
        <div
            className='input__password-wrapper'
            data-type="input-wrapper"
        >
            <input
                ref={ref}
                className={classNames('input', 'input__password', ...className)}
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                data-type="password"
                {...props}
            />
            <button className='icon' onClick={toggleShow} type='button' tabIndex='-1'>
                {showPassword ? <ReactSVG src={eye} /> : <ReactSVG src={eyeSlash} />}
            </button>
        </div>
    )
})

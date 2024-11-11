import React, { forwardRef } from 'react'
import classNames from 'classnames'
import './Input.scss'

export const Input = forwardRef(({ type = 'text', className = [], placeholder="your text", error=false, ...props }, ref) => {
    return (
        <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={classNames('input', ...className)}
            {...props}
        />
    )
})

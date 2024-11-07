import React from 'react'
import './Input.scss'

export const Input = ({ type = 'text', value = '', onChange, className = '', placeholder="your text", ...props }) => {
    const combinedClassName = `input${Array.isArray(className) ? ' ' + className.join(' ') : className}`

    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={combinedClassName}
            {...props}
        />
    )
}

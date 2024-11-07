import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import './TextArea.scss'

export const TextArea = ({ value = '', onChange, className = '', placeholder="your text", ...props }) => {
    const combinedClassName = `input textarea${Array.isArray(className) ? ' ' + className.join(' ') : className}`

    return (
        <TextareaAutosize
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={combinedClassName}
            {...props}
        />
    )
}

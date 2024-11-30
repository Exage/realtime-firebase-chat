import React, { useState, forwardRef } from 'react'
import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'

import './TextArea.scss'

export const TextArea = forwardRef(({ className = [], placeholder = "your text", ...props }, ref) => {

    const [isFocused, setIsFocused] = useState(false)

    const onFocus = () => {
        setIsFocused(true)
    }

    const onBlur = () => {
        setIsFocused(false)
    }

    return (
        <div className={classNames('input', 'textarea__wrapper', { ['textarea__wrapper-focused']: isFocused }, ...className)}>
            <TextareaAutosize
                ref={ref}
                placeholder={placeholder}
                className='textarea'
                {...props}
            />
        </div>
    )

})

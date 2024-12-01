import React, { useState, forwardRef } from 'react'
import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'

import './TextArea.scss'

export const TextArea = forwardRef(({ className = [], placeholder = "your text", isInvalid = false, ...props }, ref) => {

    const [isFocused, setIsFocused] = useState(false)

    const onFocus = () => {
        setIsFocused(true)
    }

    const onBlur = () => {
        setIsFocused(false)
    }

    return (
        <div 
            className={classNames('input', 
                'textarea__wrapper', 
                { 
                    ['textarea__wrapper-focused']: isFocused 
                }, { 
                    ['textarea__wrapper-invalid']: isInvalid 
                }, ...className)
            }
            onFocus={onFocus}
            onBlur={onBlur}
        >
            <TextareaAutosize
                ref={ref}
                placeholder={placeholder}
                className='textarea'
                onFocus={onFocus}
                onBlur={onBlur}
                {...props}
            />
        </div>
    )

})

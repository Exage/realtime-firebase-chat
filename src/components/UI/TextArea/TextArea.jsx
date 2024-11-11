import React from 'react'
import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'

import './TextArea.scss'

export const TextArea = ({ className = [], placeholder = "your text", ...props }) => {

    return (
        <div className={classNames('input', 'textarea__wrapper', ...className)}>
            <TextareaAutosize
                placeholder={placeholder}
                className='textarea'
                {...props}
            />
        </div>
    )
    
}

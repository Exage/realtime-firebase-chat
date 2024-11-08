import React from 'react'
import { ReactSVG } from 'react-svg'

import styles from './Button.module.scss'

export const Button = ({ children, className = '', icon = null, iconGap=null, ...props }) => {
    const { 
        btn, 
        ['btn__icon']: btnIcon 
    } = styles
    const combinedClassName = `${btn}${Array.isArray(className) ? ' ' + className.join(' ') : className}`

    const inlineStyles = {
        marginRight: iconGap
    }

    return (
        <button
            className={combinedClassName}
            {...props}
        >
            {icon && (
                <span className={`icon ${btnIcon}`} style={inlineStyles}>
                    <ReactSVG src={icon} />
                </span>
            )}
            {children}
        </button>
    )
}

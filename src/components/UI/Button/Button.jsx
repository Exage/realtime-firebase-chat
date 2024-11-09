import React from 'react'
import { ReactSVG } from 'react-svg'

import styles from './Button.module.scss'

export const Button = ({ children, className = '', icon = null, iconGap = null, filled = false, ...props }) => {
    const {
        btn,
        ['btn__filled']: btnFilled,
        ['btn__icon']: btnIcon,
        text
    } = styles
    const combinedClassName = `${btn}${Array.isArray(className) ? ' ' + className.join(' ') : className}`
    const combinedClassNameFilled = `${btn} ${btnFilled}${Array.isArray(className) ? ' ' + className.join(' ') : className}`

    const inlineStyles = {
        marginRight: iconGap
    }

    return (
        <button
            className={filled ? combinedClassNameFilled : combinedClassName}
            {...props}
        >
            {icon && (
                <span className={`icon ${btnIcon}`} style={inlineStyles}>
                    <ReactSVG src={icon} />
                </span>
            )}
            <span className={text}>
                {children}
            </span>
        </button>
    )
}

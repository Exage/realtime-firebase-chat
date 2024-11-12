import React from 'react'
import classNames from 'classnames'
import { ReactSVG } from 'react-svg'

import styles from './Button.module.scss'

export const Button = ({ children, className = [], icon = null, iconGap = null, filled = false, ...props }) => {
    const {
        btn,
        ['btn__filled']: btnFilled,
        ['btn__icon']: btnIcon,
        text
    } = styles
    

    const inlineStyles = {
        marginRight: iconGap
    }

    return (
        <button
            className={classNames(btn, { [btnFilled]: filled }, ...className)}
            {...props}
        >
            {icon && (
                <span className={classNames('icon', btnIcon)} style={inlineStyles}>
                    <ReactSVG src={icon} />
                </span>
            )}
            <span className={text}>
                {children}
            </span>
        </button>
    )
}

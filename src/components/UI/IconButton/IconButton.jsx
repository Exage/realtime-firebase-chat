import React from 'react'
import { ReactSVG } from 'react-svg'
import classNames from 'classnames'

import noIcon from '@/assets/icons/no-icon.svg'

import styles from './IconButton.module.scss'

export const IconButton = ({ icon, className = '', filled = false, size=null, ...props }) => {

    const {
        ['btn__icon']: btnIcon,
        ['btn__icon-filled']: btnIconFilled
    } = styles

    const iconSize = size ? `${size}px` : null

    return (
        <button
            className={classNames(btnIcon, { [btnIconFilled]: filled }, ...className)}
            {...props}
        >
            {icon
                ? <ReactSVG src={icon} style={{ width: iconSize, height: iconSize }} className='icon' />
                : <ReactSVG src={noIcon} style={{ width: iconSize, height: iconSize }} className='icon' />
            }
        </button>
    )
}

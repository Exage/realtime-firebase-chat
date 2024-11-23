import React from 'react'
import { ReactSVG } from 'react-svg'
import classNames from 'classnames'
import { Loader } from '../Loader/Loader'

import noIcon from '@/assets/icons/no-icon.svg'

import styles from './IconButton.module.scss'

export const IconButton = ({ icon, className = '', filled = false, size = null, loading = false, disabled = false, ...props }) => {

    const {
        ['btn__icon']: btnIcon,
        ['btn__icon-filled']: btnIconFilled,
        ['icon']: iconClass,
        ['loader']: loader
    } = styles

    const iconSize = size ? `${size}px` : null

    return (
        <button
            className={classNames(btnIcon, { [btnIconFilled]: filled }, ...className)}
            disabled={loading || disabled}
            {...props}
        >
            {loading && (
                <Loader style={{ fontSize: iconSize }} className={[loader, iconClass]} />
            )}
            {!loading && (
                icon
                    ? <ReactSVG src={icon} style={{ width: iconSize, height: iconSize }} className={classNames('icon', iconClass)} />
                    : <ReactSVG src={noIcon} style={{ width: iconSize, height: iconSize }} className={classNames('icon', iconClass)} />
            )}
        </button>
    )
}

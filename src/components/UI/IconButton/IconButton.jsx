import React from 'react'
import { ReactSVG } from 'react-svg'
import classNames from 'classnames'
import { Loader } from '../Loader/Loader'

import noIcon from '@/assets/icons/no-icon.svg'

import styles from './IconButton.module.scss'

export const IconButton = ({ icon, className = '', filled = false, size = null, loading = false, disabled = false, labelId = null, ...props }) => {

    const {
        ['btn__icon']: btnIcon,
        ['btn__icon-filled']: btnIconFilled,
        ['icon']: iconClass,
        ['loader']: loader,
        label
    } = styles

    const iconSize = size ? `${size}px` : null

    const handleClick = (e) => {
        if (labelId) {
            const labelElement = document.getElementById(labelId)
            if (labelElement) {
                labelElement.click()
            }
        }

        if (props.onClick) {
            props.onClick(e)
        }
    }

    return (
        <button
            className={classNames(btnIcon, { [btnIconFilled]: filled }, ...className)}
            disabled={loading || disabled}
            onClick={handleClick}
            {...props}
        >
            {labelId && <label htmlFor={labelId} className={label}></label>}
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

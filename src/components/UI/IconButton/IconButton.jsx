import React from 'react'
import { ReactSVG } from 'react-svg'

import noIcon from '../../../assets/icons/no-icon.svg'

import styles from './IconButton.module.scss'

export const IconButton = ({ icon, className = '', filled=false, ...props }) => {
    const { btnIcon, btnIconFilled } = styles
    const combinedClassName = `${btnIcon}${Array.isArray(className) ? ' ' + className.join(' ') : className}`
    const combinedClassNameFilled = `${btnIcon} ${btnIconFilled}${Array.isArray(className) ? ' ' + className.join(' ') : className}`

    return (
        <button
            className={filled ? combinedClassNameFilled : combinedClassName}
            {...props}
        >
            {icon 
                ? <ReactSVG src={icon} className='icon' /> 
                : <ReactSVG src={noIcon} className='icon' />
            }
        </button>
    )
}

import React from 'react'
import classNames from 'classnames'
import styles from './Loader.module.scss'

export const Loader = ({ className = [], ...props }) => {

    const { loader } = styles

    return (
        <div 
            className={classNames(loader, ...className)}
            {...props}
        ></div>
    )
}

import React from 'react'
import classNames from 'classnames'
import { ReactSVG } from 'react-svg'

import styles from './Button.module.scss'

import { Loader } from '@/components/UI/Loader/Loader'

export const Button = ({ children, className = [], icon = null, iconGap = null, filled = false, loading = false, disabled = false, ...props }) => {
    const {
        btn,
        ['btn__filled']: btnFilled,
        ['btn__icon']: btnIcon,
        ['btn__loading']: btnLoading,
        text,
        loader,
        ['loader__filled']: isFilled
    } = styles


    const inlineStyles = {
        marginRight: iconGap
    }

    return (
        <button
            className={classNames(btn, { [btnFilled]: filled }, { [btnLoading]: loading }, ...className)}
            disabled={loading || disabled}
            {...props}
        >
            {loading && (
                <span className={text}>
                    <Loader
                        className={[loader, { [isFilled]: filled }]}
                    />
                </span>
            )}
            {!loading && (
                <>
                    {icon && (
                        <span className={classNames('icon', btnIcon)} style={inlineStyles}>
                            <ReactSVG src={icon} />
                        </span>
                    )}
                    <span className={text}>
                        {children}
                    </span>
                </>
            )}
        </button>
    )
}

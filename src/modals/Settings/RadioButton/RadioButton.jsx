import React from 'react'
import classNames from 'classnames'
import styles from './RadioButton.module.scss'

import { useThemeStore } from '@/lib/themeStore'
import { ReactSVG } from 'react-svg'

export const RadioButton = ({ name, icon = null, index, value, children }) => {

    const { btn, label, isChecked, icon: iconClass } = styles

    const { theme, setTheme } = useThemeStore()

    const handleChange = (e) => {
        setTheme(e.target.value)
    }

    return (
        <div className={btn}>
            <label
                className={classNames(label, { [isChecked]: value === theme })}
                htmlFor={`theme-radio-${index}`}
            >

                <input
                    type="radio"
                    id={`theme-radio-${index}`}
                    name={name}
                    value={value}
                    checked={value === theme}
                    onChange={handleChange}
                />

                {icon && (
                    <ReactSVG src={icon} className={iconClass} />
                )}

                {children}
            </label>
        </div>
    )
}

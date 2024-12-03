import React from 'react'
import classNames from 'classnames'

import modules from './FormWrapper.module.scss'

import { Button } from '@/components/UI/Button/Button'

export const FormWrapper = ({ title = '', errors, setEditing, children }) => {

    const {
        ['editing']: editing,
        ['editing__title']: titleClass,
        ['editing__form']: form,
        ['editing__form-error']: error,
        ['editing__form-buttons']: buttons,
    } = modules

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className={editing}>
            <h3 className={titleClass}>
                {title}
            </h3>
            <form onSubmit={onSubmit} className={form}>

                {children}

                <p className={classNames('error', error)}>{errors && errors.message}</p>

                <div className={buttons}>
                    <Button
                        filled={true}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={() => setEditing(false)}
                    >
                        Cancel
                    </Button>
                </div>

            </form>

        </div>
    )

}

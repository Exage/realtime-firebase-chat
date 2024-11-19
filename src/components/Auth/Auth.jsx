import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Auth.module.scss'

import { Button } from '@/components/UI/Button/Button'

export const Auth = ({ children, onSubmit, handleSubmit, title = 'Title', btnText = 'submit', redirect = '', redirectPath = '', isLoading }) => {

    const {
        auth,
        ['auth__form']: form,
        ['auth__title']: titleClass,
        ['auth__container']: container,
        ['auth__submit-wrapper']: submitWrapper,
        ['auth__submit']: submitClass,
        ['auth__link']: link
    } = styles

    return (
        <div className={container}>
            <div className={auth}>
                <h1 className={titleClass}>
                    {title}
                </h1>
                <form onSubmit={onSubmit} className={form}>

                    {children}

                    <div className={submitWrapper}>
                        <Button
                            filled={true}
                            onClick={handleSubmit}
                            type="submit"
                            className={[submitClass]}
                            loading={isLoading}
                        >
                            {btnText}
                        </Button>
                    </div>

                    {redirect && (
                        <div className={link}>
                            <Link to={redirectPath}>{redirect}</Link>
                        </div>
                    )}

                </form>
            </div>
        </div>
    )
}

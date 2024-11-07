import React, { useEffect, useState } from 'react'
import styles from './Bottom.module.scss'

import sendIcon from '../../../assets/icons/send.svg'
import fileIcon from '../../../assets/icons/file.svg'
import emojiIcon from '../../../assets/icons/emoji.svg'

import { TextArea } from '../../UI/TextArea/TextArea'
import { IconButton } from '../../UI/IconButton/IconButton'

export const Bottom = () => {

    const { bottom, form, form__input, form__input__error, form__input__wrapper, error:errorClass } = styles

    const [message, setMessage] = useState('')
    const [sendDisabled, setSendDisabled] = useState(true)
    const [error, setError] = useState(null)

    const maxSymbols = 500
    const maxRows = 4

    useEffect(() => {
        setError(false)
        if (message.trim()) {
            setSendDisabled(false)
        } else {
            setSendDisabled(true)
        }
    }, [message])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!message.trim()) {
            return
        }

        if (message.trim().length > maxSymbols) {
            setError(`Message must be less then ${maxSymbols} symbols`)
            return
        }

        console.log(message)
        setMessage('')
    }

    const handleEmojiButton = (e) => {
        e.preventDefault()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    return (
        <div className={bottom}>
            <IconButton icon={fileIcon} />
            <form onSubmit={handleSubmit} className={form}>
                <div className={form__input__wrapper}>
                    <TextArea
                        placeholder='Type your message'
                        className={error ? [form__input, form__input__error] : [form__input]}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        maxRows={maxRows}
                    />
                    {error && <span className={`error ${errorClass}`}>{error}</span>}
                </div>
                <IconButton icon={emojiIcon} onClick={handleEmojiButton} />
                <IconButton icon={sendIcon} filled={true} type="submit" disabled={sendDisabled} />
            </form>
        </div>
    )
}

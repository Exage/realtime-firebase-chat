import React, { useEffect, useState, useRef } from 'react'
import EmojiPicker from 'emoji-picker-react'
import styles from './Bottom.module.scss'

import sendIcon from '../../../assets/icons/send.svg'
import fileIcon from '../../../assets/icons/file.svg'
import emojiIcon from '../../../assets/icons/emoji.svg'

import { TextArea } from '../../UI/TextArea/TextArea'
import { IconButton } from '../../UI/IconButton/IconButton'

export const Bottom = () => {

    const emojiRef = useRef(null)
    const [emojiPickerShow, setEmojiPickerShow] = useState(false)

    const {
        bottom,
        form,
        form__input,
        form__input__error,
        form__input__wrapper,
        emoji, emojiIcon:
        emojiIconClass,
        emojiPicker,
        error: errorClass
    } = styles

    const [message, setMessage] = useState('')
    const [sendDisabled, setSendDisabled] = useState(true)
    const [error, setError] = useState(null)

    const maxSymbols = 500
    const maxRows = 4

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (emojiRef.current && !emojiRef.current.contains(e.target)) {
                setEmojiPickerShow(false)
            }
        }

        window.addEventListener('click', handleClickOutside)

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

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
        setEmojiPickerShow(prev => !prev)
    }

    const handleEmojiPicker = (e) => {
        setMessage(prev => prev + e.emoji)
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
                <div className={emoji} ref={emojiRef}>
                    <IconButton
                        icon={emojiIcon}
                        className={emojiIconClass}
                        onClick={handleEmojiButton}
                    />
                    {emojiPickerShow && (
                        <div className={emojiPicker}>
                            <EmojiPicker onEmojiClick={handleEmojiPicker} />
                        </div>
                    )}
                </div>
                <IconButton icon={sendIcon} filled={true} type="submit" disabled={sendDisabled} />
            </form>
        </div>
    )
}

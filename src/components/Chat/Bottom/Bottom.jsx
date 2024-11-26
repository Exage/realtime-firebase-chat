import React, { useEffect, useState, useRef } from 'react'
import { ReactSVG } from 'react-svg'

import styles from './Bottom.module.scss'

import EmojiPicker from 'emoji-picker-react'

import sendIcon from '@/assets/icons/send.svg'
import fileIcon from '@/assets/icons/file.svg'
import emojiIcon from '@/assets/icons/emoji.svg'

import { TextArea } from '@/components/UI/TextArea/TextArea'
import { IconButton } from '@/components/UI/IconButton/IconButton'

import { useSendMessage } from '@/hooks/useSendMessage'

import { useChatStore } from '@/lib/chatStore'

import banIcon from '@/assets/icons/ban.svg'

export const Bottom = () => {

    const {
        bottom,
        form,
        ['form__input']: formInput,
        ['form__input-error']: formInputError,
        ['form__input-wrapper']: formInputWrapper,
        ['emoji']: emoji, 
        ['emoji__icon']: emojiIconClass,
        ['emoji__picker']: emojiPicker,
        ['error']: errorClass,
        blocked,
        ['blocked__icon']: blockedIcon,
        ['blocked__text']: blockedText,
    } = styles

    const emojiRef = useRef(null)
    const [emojiPickerShow, setEmojiPickerShow] = useState(false)

    const [message, setMessage] = useState('')
    const [sendDisabled, setSendDisabled] = useState(true)
    const [error, setError] = useState(null)

    const { sendMessage, loading } = useSendMessage()
    const { isCurrentUserBlocked, isReceiverBlocked } = useChatStore()

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

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!message.trim()) {
            return
        }

        if (message.trim().length > maxSymbols) {
            setError(`Message must be less then ${maxSymbols} symbols`)
            return
        }

        sendMessage(message)
        setMessage('')
    }

    if (isCurrentUserBlocked || isReceiverBlocked) {
        return (
            <div className={blocked}>

                <ReactSVG
                    src={banIcon}
                    className={blockedIcon}
                />

                {isCurrentUserBlocked && (
                    <h3 className={blockedText}>You are blocked</h3>
                )}

                {isReceiverBlocked && (
                    <h3 className={blockedText}>The interlocutor is blocked</h3>
                )}
            </div>
        )
    }

    return (
        <div className={bottom}>
            <IconButton icon={fileIcon} disabled={true} />
            <form onSubmit={handleSubmit} className={form}>
                <div className={formInputWrapper}>
                    <TextArea
                        placeholder='Type your message'
                        className={[formInput, { formInputError: error}]}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        maxRows={maxRows}
                        disabled={loading}
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

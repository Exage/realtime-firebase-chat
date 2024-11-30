import React, { useEffect, useState, useRef } from 'react'
import { ReactSVG } from 'react-svg'
import { useForm } from 'react-hook-form'
import { FormValidation } from '@/validation/formValidation'

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

    const { sendMessage, loading } = useSendMessage()
    const { isCurrentUserBlocked, isReceiverBlocked, isLoading: isMessagesLoading } = useChatStore()

    const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm({
        mode: 'onChange'
    })

    const message = watch('messageSend')

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

    const handleEmojiButton = (e) => {
        e.preventDefault()
        setEmojiPickerShow(prev => !prev)
    }

    const handleEmojiPicker = (e) => {
        const currentMessage = message || ''
        setValue('messageSend', currentMessage + emojiObject.emoji)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    const handleSendMessage = async () => {

        if (!message.trim()) {
            return
        }

        console.log(message.trim())

        await sendMessage(message.trim())
        reset({ messageSend: '' })
    }

    if (isReceiverBlocked) {
        return (
            <div className={blocked}>

                <ReactSVG
                    src={banIcon}
                    className={blockedIcon}
                />

                <h3 className={blockedText}>The interlocutor is blocked</h3>
            </div>
        )
    }

    if (isCurrentUserBlocked) {
        return (
            <div className={blocked}>

                <ReactSVG
                    src={banIcon}
                    className={blockedIcon}
                />

                <h3 className={blockedText}>You are blocked</h3>
            </div>
        )
    }

    return (
        <div className={bottom}>
            <IconButton
                icon={fileIcon}
                disabled={true}
            />
            <form onSubmit={handleSubmit(handleSendMessage)} className={form}>
                <div className={formInputWrapper}>
                    <TextArea
                        placeholder='Type your message'
                        className={[formInput, { [formInputError]: errors.messageSend }]}
                        onKeyDown={handleKeyDown}
                        maxRows={maxRows}

                        disabled={isMessagesLoading || loading}

                        {...register('messageSend', FormValidation.MessageForm)}
                    />
                    {errors.messageSend && <span className={`error ${errorClass}`}>{errors.messageSend.message}</span>}
                </div>
                <div className={emoji} ref={emojiRef}>
                    <IconButton
                        icon={emojiIcon}
                        className={emojiIconClass}
                        onClick={handleEmojiButton}
                        disabled={isMessagesLoading || loading}
                    />
                    {emojiPickerShow && (
                        <div className={emojiPicker}>
                            <EmojiPicker onEmojiClick={handleEmojiPicker} />
                        </div>
                    )}
                </div>
                <IconButton
                    icon={sendIcon}
                    filled={true}
                    onClick={handleSubmit(handleSendMessage)}
                    disabled={isMessagesLoading || errors.messageSend}
                    loading={loading}
                />
            </form>
        </div>
    )
}

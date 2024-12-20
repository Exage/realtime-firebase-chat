import React, { useEffect, useState, useRef } from 'react'
import { ReactSVG } from 'react-svg'
import { useForm } from 'react-hook-form'
import { FormValidation } from '@/validation/formValidation'

import styles from './Bottom.module.scss'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import sendIcon from '@/assets/icons/send.svg'
import fileIcon from '@/assets/icons/file.svg'
import emojiIcon from '@/assets/icons/emoji.svg'
import closeIcon from '@/assets/icons/xmark.svg'

import { TextArea } from '@/components/UI/TextArea/TextArea'
import { IconButton } from '@/components/UI/IconButton/IconButton'
import { Loader } from '@/components/UI/Loader/Loader'

import { useSendMessage } from '@/hooks/useSendMessage'
import { useChatStore } from '@/lib/chatStore'

import banIcon from '@/assets/icons/ban.svg'

export const Bottom = () => {
    const {
        bottom, form, ['form__input-wrapper']: formInputWrapper, emoji, ['emoji__picker']: emojiPicker, ['photo-preview']: photoPreview,
        blocked, ['blocked__icon']: blockedIcon, ['blocked__text']: blockedText, content, loader,
        ['loader__wrapper']: loaderWrapper, error: errorClass
    } = styles

    const messageAreaRef = useRef(null)
    const emojiRef = useRef(null)
    const [emojiPickerShow, setEmojiPickerShow] = useState(false)

    const { sendMessage, loading } = useSendMessage()
    const { isCurrentUserBlocked, isReceiverBlocked, isLoading: isMessagesLoading, messages } = useChatStore()

    const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm({ mode: 'onChange' })
    const message = watch('messageSend')

    const [photo, setPhoto] = useState(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (emojiRef.current && !emojiRef.current.contains(e.target)) {
                setEmojiPickerShow(false)
            }
        }
        window.addEventListener('mousedown', handleClickOutside)
        return () => window.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleEmojiButton = (e) => {
        e.preventDefault()
        setEmojiPickerShow(prev => !prev)
    }

    const handleEmojiPicker = (emojiObject) => {
        setValue('messageSend', (message || '') + emojiObject.native)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleSendMessage = async () => {
        if (!message?.trim() && !photo) return

        await sendMessage({ text: message?.trim() || '', photo })
        reset({ messageSend: '' })
        setPhoto(null)
    }

    useEffect(() => {
        console.log(messageAreaRef?.current)
        if (messageAreaRef?.current) {
            messageAreaRef.current.focus()
        }
    }, [messages])

    const handlePickPhoto = (e) => {
        const file = e.target.files[0]
        if (file) setPhoto(file)
    }

    const handleRemovePhoto = () => {
        setPhoto(null)
    }

    if (isReceiverBlocked || isCurrentUserBlocked) {
        return (
            <div className={blocked}>
                <ReactSVG src={banIcon} className={blockedIcon} />
                <h3 className={blockedText}>
                    {isReceiverBlocked ? 'The interlocutor is blocked' : 'You are blocked'}
                </h3>
            </div>
        )
    }

    return (
        <div className={bottom}>
            <input
                type="file"
                id="messages-send-photo"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handlePickPhoto}
            />

            {photo && (
                <div className={photoPreview}>
                    <img src={URL.createObjectURL(photo)} alt="Preview" />
                    <button type="button" onClick={handleRemovePhoto}>
                        <ReactSVG src={closeIcon} />
                    </button>
                </div>
            )}

            <div className={content}>
                <IconButton
                    icon={fileIcon}
                    labelId={'messages-send-photo'}
                    disabled={loading}
                />

                <form onSubmit={handleSubmit(handleSendMessage)} className={form}>

                    <div className={formInputWrapper}>
                        <TextArea
                            ref={messageAreaRef}
                            placeholder='Type your message'
                            isInvalid={errors.messageSend}
                            onKeyDown={handleKeyDown}
                            disabled={isMessagesLoading || loading}
                            maxRows={4}
                            {...register('messageSend', FormValidation.MessageForm)}
                        />
                        {errors.messageSend && <span className={`error ${errorClass}`}>{errors.messageSend.message}</span>}
                    </div>

                    <div className={emoji} ref={emojiRef}>
                        <IconButton
                            icon={emojiIcon}
                            onClick={handleEmojiButton}
                            disabled={loading}
                        />
                        {emojiPickerShow && (
                            <div className={emojiPicker}>
                                <Picker data={data} onEmojiSelect={handleEmojiPicker} />
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <div className={loaderWrapper}>
                            <Loader className={[loader]} />
                        </div>
                    ) : (
                        <IconButton
                            icon={sendIcon}
                            filled={true}
                            onClick={handleSubmit(handleSendMessage)}
                            disabled={!message?.trim() && !photo}
                        />
                    )}
                </form>
            </div>
        </div>
    )
}

import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import styles from './Message.module.scss'

import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'

export const Message = ({ message }) => {

    const {
        ["message"]: messageClass,
        ["message__inner"]: messageInner,
        own,
        system,
        text,
        time
    } = styles

    const messageRef = useRef(null)
    const { currentUser } = useUserStore()
    const { type, groupData, allSenders } = useChatStore()

    const [messageSender, setMessageSender] = useState({})

    const totalSeconds = new Date(message.createdAt.seconds * 1000)

    const hours = totalSeconds.getHours() < 10 ? `0${totalSeconds.getHours()}` : totalSeconds.getHours()
    const minutes = totalSeconds.getMinutes() < 10 ? `0${totalSeconds.getMinutes()}` : totalSeconds.getMinutes()
    const seconds = totalSeconds.getSeconds() < 10 ? `0${totalSeconds.getSeconds()}` : totalSeconds.getSeconds()

    const messageType = message.type.split(' ')

    useEffect(() => {
        const getSender = () => {
            const sender = allSenders[message.senderId]
            setMessageSender(sender)
        }

        getSender()
    }, [allSenders])

    if (messageType[0] === 'system') {
        return (
            <div
                className={classNames(messageClass, system)}
                ref={messageRef}
            >
                <div className={messageInner}>

                    {messageType[1] === 'left-chat' && (
                        <div className={text}>
                            {currentUser.id === message.senderId ? 'You' : messageSender?.name} leave group
                        </div>
                    )}

                    {messageType[1] === 'user-added' && (
                        <div className={text}>
                            {currentUser.id === message.senderId ? 'You' : messageSender?.name} joined chat
                        </div>
                    )}

                    {!messageType[1] && (
                        <div className={text}>
                            {message?.text}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div
            className={classNames(messageClass, { [own]: message.senderId === currentUser.id }, { [system]: message.type === 'system' })}
            ref={messageRef}
        >
            <div className={messageInner}>
                <div className={text}>
                    {message.text}
                </div>
                <div className={time}>
                    <span title={`${hours}:${minutes}:${seconds}`}>
                        {hours}:{minutes}
                    </span>
                    {message.isSeen && ` | viewed`}
                    {type === 'group' && (
                        <>
                            |
                            {message.senderId === groupData.owner && ' ★'}
                            {currentUser.id === message.senderId ? ' you' : ` ${messageSender?.name}`}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

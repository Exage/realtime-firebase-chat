import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import styles from './Message.module.scss'

import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'

import { Image } from '@/components/Image/Image'
import { Blurhash } from 'react-blurhash'

export const Message = ({ message }) => {

    const {
        ["message"]: messageClass,
        ["message__inner"]: messageInner,
        own,
        system,
        text,
        ['text__system']: textSystem,
        time,
        photo,
        ['photo__bg']: photoBg,
        hash,
        ['hash__show']: hashShow,
        removeTopPadding
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

    const [photoLoading, setPhotoLoading] = useState(true)

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
                id={message.id}
                ref={messageRef}
            >
                <div className={messageInner}>

                    {messageType[1] === 'left-chat' && (
                        <div className={textSystem}>
                            {currentUser.id === message.senderId ? 'You' : messageSender?.name} leave group
                        </div>
                    )}

                    {messageType[1] === 'user-added' && (
                        <div className={textSystem}>
                            {currentUser.id === message.senderId ? 'You' : messageSender?.name} joined chat
                        </div>
                    )}

                    {!messageType[1] && (
                        <div className={textSystem}>
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
            data-messageid={message.id}
            ref={messageRef}
        >
            <div className={messageInner}>

                {message?.photo && (
                    <div className={photo}>
                        {/* <Image
                            src={message?.photo.url}
                            hash={message?.photo.hash}
                            blurWidth='100%'
                            blurhHeight='100%'
                        /> */}
                        <a href={message?.photo.url} target='_blank'>
                            <img
                                src={message?.photo.url}
                                alt=""

                                onLoad={() => setPhotoLoading(false)}
                            />
                            <div className={classNames(hash, { [hashShow]: photoLoading })}>
                                <Blurhash hash={message?.photo.hash} style={{ width: '100%', height: '100%' }} />
                            </div>
                        </a>
                    </div>
                )}

                <div className={classNames(text, { [removeTopPadding]: message?.photo })}>
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

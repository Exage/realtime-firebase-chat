import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import styles from './Message.module.scss'

import { useUserStore } from '@/lib/userStore'

export const Message = ({ message, messagesRef }) => {

    const {
        ["message"]: messageClass,
        ["message__inner"]: messageInner,
        own,
        text,
        time
    } = styles

    const messageRef = useRef(null)
    const { currentUser } = useUserStore()

    useEffect(() => {
        if (!messagesRef) return

        const checkView = () => {
            const scrollY = messageRef.current.getBoundingClientRect().y
            console.log(message, scrollY)
        }

        messagesRef.current.addEventListener('scroll', checkView)

        return () => {
            messagesRef.current.removeEventListener('scroll', checkView)
        }
    }, [])

    return (
        <div
            className={classNames(messageClass, { [own]: message.senderId === currentUser.id })}
            ref={messageRef}
        >
            <div className={messageInner}>
                <div className={text}>
                    {message.text}
                </div>
                <div className={time}>1 min ago</div>
            </div>
        </div>
    )
}

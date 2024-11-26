import React, { useEffect, useRef, useState } from 'react'
import styles from './Messages.module.scss'
import { useChatStore } from '@/lib/chatStore'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

import { Message } from './Message/Message'

export const Messages = () => {

    const { messages: messagesClass } = styles

    const messagesRef = useRef(null)
    const { chatId, messages, setMessages, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
    const endRef = useRef(null)

    useEffect(() => {
        endRef?.current.scrollIntoView()
    }, [messages])

    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, 'chats', chatId),
            (res) => {
                const data = res.data()
                const messages = data?.messages

                setMessages(messages)
            }
        )

        return () => {
            unSub()
        }
    }, [chatId])

    return (
        <div className={messagesClass} ref={messagesRef}>

            {messages?.map((message) => (
                <Message
                    message={message}
                    messagesRef={messagesRef}
                    chat={messages}
                    key={message?.createdAt}
                />
            ))}

            <div ref={endRef}></div>
        </div>
    )
}

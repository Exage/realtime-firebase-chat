import React, { useEffect, useRef, useState } from 'react'
import styles from './Messages.module.scss'
import { useChatStore } from '@/lib/chatStore'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

import { Message } from './Message/Message'

export const Messages = () => {
    
    const { messages } = styles

    const messagesRef = useRef(null)
    const { chatId } = useChatStore()
    const [chat, setChat] = useState(null)
    const endRef = useRef(null)

    useEffect(() => {
        endRef.current?.scrollIntoView()
    }, [])

    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, 'chats', chatId),
            (res) => {
                setChat(res.data())
            }
        )

        return () => {
            unSub()
        }
    }, [chatId])

    return (
        <div className={messages} ref={messagesRef}>
            {chat?.messages.map((message) => (
                <Message message={message} messagesRef={messagesRef} key={message?.createdAt} />
            ))}
            <div ref={endRef}></div>
        </div>
    )
}

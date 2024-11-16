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
        // endRef.current?.scrollIntoView()
    }, [])

    console.log(chat)

    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, 'chats', chatId),
            (res) => {
                setChat(res.data())
                // endRef.current?.scrollIntoView()
            }
        )

        return () => {
            unSub()
        }
    }, [chatId])

    const setSeen = async (message) => {
        const chatRef = doc(db, 'chats', chatId)
        const chatSnap = await getDoc(chatRef)

        if (chatSnap.exists()) {
            const data = chatSnap.data()
            const updatedMessages = data.messages.map(m => {
                if (m.id === message.id && m.isSeen !== true) {
                    m.isSeen = true
                }

                return m
            })

            await updateDoc(chatRef, {
                messages: updatedMessages
            })
        }
    }

    return (
        <div className={messages} ref={messagesRef}>

            {/* <div style={{ width: '100%', minHeight: '2000px' }}></div> */}

            {chat?.messages.map((message) => (
                <Message message={message} setSeen={setSeen} messagesRef={messagesRef} key={message?.createdAt} />
            ))}

            {/* <div style={{ width: '100%', minHeight: '2000px' }}></div> */}
            <div ref={endRef}></div>
        </div>
    )
}

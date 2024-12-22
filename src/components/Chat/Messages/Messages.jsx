import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import styles from './Messages.module.scss'

import { useChatStore } from '@/lib/chatStore'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

import { Message } from './Message/Message'
import { Loader } from '@/components/UI/Loader/Loader'

export const Messages = () => {

    const { messages: messagesClass, ['messages__loading']: messagesLoading } = styles

    const messagesRef = useRef(null)
    const { chatId, messages, setMessages, setAllSenders, isLoading, setLoading } = useChatStore()
    const endRef = useRef(null)

    const allSendersLocal = {}

    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, 'chats', chatId),
            async (res) => {
                try {
                    setLoading(true)

                    const data = res.data()
                    const messages = data?.messages

                    if (messages) {
                        const uniqueSenderIds = [...new Set(messages.map(msg => msg.senderId))]
                            .filter(id => !allSendersLocal[id])

                        if (uniqueSenderIds.length > 0) {
                            const userDocs = await Promise.all(
                                uniqueSenderIds.map(id => getDoc(doc(db, 'users', id)))
                            )

                            userDocs.forEach((userDoc, index) => {
                                allSendersLocal[uniqueSenderIds[index]] = userDoc.data()
                            })
                        }
                    }

                    setAllSenders(allSendersLocal)
                    setMessages(messages)
                } catch (error) {
                    console.error('Error during loading messages', error)
                } finally {
                    setLoading(false)
                }
            }
        )

        return () => {
            unSub()
        }
    }, [chatId])

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
    }, [messages])

    if (isLoading) {
        return (
            <div className={classNames(messagesClass, messagesLoading)}>
                <Loader />
            </div>
        )
    }

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

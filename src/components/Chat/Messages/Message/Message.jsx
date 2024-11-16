import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import styles from './Message.module.scss'

import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

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
    const { chatId } = useChatStore()

    useEffect(() => {
        if (!messagesRef) return

        const checkView = () => {

            const parentHeight = messagesRef.current.clientHeight
            const scrollBottom = messagesRef.current.getBoundingClientRect().bottom - messageRef.current.getBoundingClientRect().bottom
            console.log(message, parentHeight, scrollBottom)

            if (currentUser.id !== message.senderId) {
                if (scrollBottom > 0 && scrollBottom < parentHeight) {
                    console.log('fixed seen')
                    setSeen()
                }
            }
        }

        checkView()
        messagesRef?.current.addEventListener('scroll', checkView)

        return () => {
            messagesRef?.current.removeEventListener('scroll', checkView)
        }
    }, [])

    const setSeen = async () => {
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

            console.log(updatedMessages)

            await updateDoc(chatRef, {
                messages: updatedMessages
            })
        }
    }

    return (
        <div
            className={classNames(messageClass, { [own]: message.senderId === currentUser.id })}
            ref={messageRef}
        >
            <div className={messageInner}>
                <div className={text}>
                    {message.text}
                </div>
                <div className={time}>
                    1 min ago
                    {message.isSeen && ` | viewed`}
                </div>
            </div>
        </div>
    )
}

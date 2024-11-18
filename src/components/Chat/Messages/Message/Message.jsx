import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import styles from './Message.module.scss'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'
import { useChatsStore } from '@/lib/chatsStore'

export const Message = ({ message, messagesRef, chat }) => {

    const {
        ["message"]: messageClass,
        ["message__inner"]: messageInner,
        own,
        text,
        time
    } = styles

    const messageRef = useRef(null)
    const { currentUser } = useUserStore()
    const { chatId, messages, users, type } = useChatStore()
    const { chats } = useChatsStore()

    const messageSender = users?.find(user => user.id === message.senderId)

    const totalSeconds = new Date(message.createdAt.seconds * 1000)

    const hours = totalSeconds.getHours() < 10 ? `0${totalSeconds.getHours()}` : totalSeconds.getHours()
    const minutes = totalSeconds.getMinutes() < 10 ? `0${totalSeconds.getMinutes()}` : totalSeconds.getMinutes()
    const seconds = totalSeconds.getSeconds() < 10 ? `0${totalSeconds.getSeconds()}` : totalSeconds.getSeconds()

    // useEffect(() => {
    //     if (!messagesRef) return

    //     const checkView = () => {

    //         const parentHeight = messagesRef.current.clientHeight
    //         const scrollBottom = messagesRef.current.getBoundingClientRect().bottom - messageRef.current.getBoundingClientRect().bottom

    //         if (currentUser.id !== message.senderId) {
    //             if (scrollBottom > 0 && scrollBottom < parentHeight) {
    //                 setSeen()
    //             }
    //         }
    //     }

    //     checkView()
    //     messagesRef?.current.addEventListener('scroll', checkView)

    //     return () => {
    //         messagesRef?.current.removeEventListener('scroll', checkView)
    //     }
    // }, [])

    // const setSeen = async () => {

    //     const unseenItems = messages.find(item => !item.isSeen)

    //     if (unseenItems) {
    //         const updatedMessages = messages.map((m, index) => {
    //             if (m.id === message.id && m.isSeen !== true) {
    //                 console.log('fixed seen')
    //                 m.isSeen = true
    //             }

    //             return m
    //         })

    //         const chatRef = doc(db, 'chats', chatId)

    //         await updateDoc(chatRef, {
    //             messages: updatedMessages
    //         })
    //     }

    // }

    // const setLastMessageSeen = async () => {
    //     const userChats = chats.map(item => {
    //         const {user, ...rest} = item
    //         return rest
    //     })

    //     const chatIndex = userChats.findIndex(item => item.chatId === chatId)

    //     userChats[chatIndex].isSeen = true

    //     const userChatRef = doc(db, 'userchats', currentUser.id)

    //     try {
    //         await updateDoc(userChatRef, {
    //             chats: userChats
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

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
                    <span title={`${hours}:${minutes}:${seconds}`}>
                        {hours}:{minutes}
                    </span>
                    {message.isSeen && ` | viewed`}
                    {type === 'group' && (
                        <>
                            {messageSender && ` | ${messageSender.name}`}
                            {currentUser.id === message.senderId && ' | you'}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

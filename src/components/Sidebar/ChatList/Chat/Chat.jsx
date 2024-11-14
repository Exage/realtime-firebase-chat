import React from 'react'
import classNames from 'classnames'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import styles from './Chat.module.scss'

import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'

export const Chat = ({ chat, chats }) => {

    const {
        ['chat']: chatClass,
        ['chat__photo']: chatPhoto,
        ['chat__photo-none']: chatPhotoNone,
        ['chat__text']: chatText,
        ['chat__name']: chatName,
        ['chat__subtitle']: chatSubtitle,
        active,
        seen
    } = styles

    const { currentUser } = useUserStore()
    const { changeChat } = useChatStore()

    const { avatar, name } = chat.user
    const { chatId, lastMessage, isSeen } = chat

    const handleSelect = async () => {

        const userChats = chats.map(item => {
            const {user, ...rest} = item
            return rest
        })

        const chatIndex = userChats.findIndex(item => item.chatId === chatId)

        userChats[chatIndex].isSeen = true

        const userChatRef = doc(db, 'userchats', currentUser.id)

        try {
            await updateDoc(userChatRef, {
                chats: userChats
            })
            changeChat(chatId, chat.user)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className={classNames(chatClass, { [seen]: !isSeen })} onClick={() => handleSelect()}>
            <div className={chatPhoto}>
                {avatar.photo || (
                    <div className={chatPhotoNone}>
                        <span>{name[0]}</span>
                    </div>
                )}
            </div>
            <div className={chatText}>
                <h3 className={chatName}>
                    {name}
                </h3>
                {lastMessage && (
                    <p className={chatSubtitle}>
                        {lastMessage}
                    </p>
                )}
            </div>
        </div>
    )
}

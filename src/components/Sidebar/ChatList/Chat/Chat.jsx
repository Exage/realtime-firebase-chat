import React from 'react'
import styles from './Chat.module.scss'

import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'

export const Chat = ({ data }) => {

    const {
        chat,
        ['chat__photo']: chatPhoto,
        ['chat__photo-none']: chatPhotoNone,
        ['chat__text']: chatText,
        ['chat__name']: chatName,
        ['chat__subtitle']: chatSubtitle,
        active
    } = styles

    const { changeChat } = useChatStore()

    const { avatar, name } = data.user
    const { chatId, lastMessage } = data

    const handleSelect = async (chatId) => {
        changeChat(chatId, data.user)
    }

    return (
        <div className={chat} onClick={() => handleSelect(chatId)}>
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

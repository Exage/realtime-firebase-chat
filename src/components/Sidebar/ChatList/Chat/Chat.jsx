import React from 'react'
import classNames from 'classnames'
import styles from './Chat.module.scss'

import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'
import { useResponseMenus } from '@/lib/responseMenus'

export const Chat = ({ chat }) => {

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
    const { chatId: currentChatId, changeChat, changeGroup } = useChatStore()
    const { setSidebarOpened } = useResponseMenus()

    const { chatId, lastMessage, type, groupData, users } = chat

    const handleSelect = async () => {
        if (chatId !== currentChatId) {
            if (type === 'single') {
                changeChat(chat)
            } else if (type === 'group') {
                changeGroup(chat)
            }

            setSidebarOpened(false)
        }
    }

    return (
        <div
            className={classNames(chatClass, { [active]: chatId === currentChatId })}
            onClick={() => handleSelect()}
        >
            <div className={chatPhoto}>
                {type === 'group' && (
                    groupData?.photo || (
                        <div className={chatPhotoNone}>
                            <span>{groupData?.title[0]}</span>
                        </div>
                    )
                )}
                {type === 'single' && (
                    users[0].avatar.url || (
                        <div className={chatPhotoNone}>
                            <span>{users[0]?.name[0]}</span>
                        </div>
                    )
                )}
            </div>
            <div className={chatText}>
                <h3 className={chatName}>
                    {type === 'group' && `G: ${groupData?.title}`}
                    {type === 'single' && users[0].name}
                </h3>
                {lastMessage && (
                    <p className={chatSubtitle}>
                        {lastMessage.text}
                    </p>
                )}
            </div>
        </div>
    )
}

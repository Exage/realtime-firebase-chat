import React from 'react'
import classNames from 'classnames'
import styles from './Chat.module.scss'
import { ReactSVG } from 'react-svg'

import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'
import { useResponseMenus } from '@/lib/responseMenus'

import { Image } from '@/components/Image/Image'

import photoVideo from '@/assets/icons/photo-video.svg'
import groupIcon from '@/assets/icons/user-group.svg'

export const Chat = ({ chat }) => {

    const {
        ['chat']: chatClass,
        ['chat__photo']: chatPhoto,
        ['chat__photo-none']: chatPhotoNone,
        ['chat__text']: chatText,
        ['chat__name']: chatName,
        ['chat__subtitle']: chatSubtitle,
        active,
        icon,
        photo
    } = styles

    const { chatId: currentChatId, changeChat, changeGroup, setLoading } = useChatStore()
    const { setSidebarOpened } = useResponseMenus()

    const { chatId, lastMessage, type, groupData, users } = chat

    const handleSelect = async () => {
        if (chatId !== currentChatId) {
            setLoading(true)

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
                    <>
                        {groupData?.cover.url && <Image src={groupData?.cover.url} hash={groupData?.cover.hash} />}

                        {!groupData?.cover.url && (
                            <div className={chatPhotoNone}>
                                <span>{groupData?.title[0]}</span>
                            </div>
                        )}
                    </>
                )}

                {type === 'single' && (
                    <>

                        {users[0].avatar.url && <Image src={users[0].avatar.url} hash={users[0].avatar.hash} />}

                        {!users[0].avatar.url && (
                            <div className={chatPhotoNone}>
                                <span>{users[0]?.name[0]}</span>
                            </div>
                        )}

                    </>
                )}

            </div>
            <div className={chatText}>
                <h3 className={chatName}>
                    {type === 'group' && (
                        <>
                            <ReactSVG className={icon} src={groupIcon} />
                            {' '}
                            {groupData?.title}
                        </>
                    )}
                    {type === 'single' && users[0].name}
                </h3>
                {lastMessage && (
                    <div className={chatSubtitle}>
                        {lastMessage.photo && (
                            <span className={photo}>
                                <ReactSVG src={photoVideo} />
                                {' '}
                                {!lastMessage.text && 'Photo'}
                            </span>
                        )}
                        {' '}
                        {lastMessage.text}
                    </div>
                )}
            </div>
        </div>
    )
}

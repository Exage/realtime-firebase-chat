import React from 'react'
import styles from './Top.module.scss'
import { Image } from '@/components/Image/Image'

import { useChatStore } from '@/lib/chatStore'
import { useResponseMenus } from '@/lib/responseMenus'

import { IconButton } from '@/components/UI/IconButton/IconButton'

import chatlistIcon from '@/assets/icons/chatlist.svg'

export const Top = ({ showDetails }) => {

    const {
        top,
        user: userClass,
        ['user__wrapper']: userWrapper,
        avatar,
        ["avatar__none"]: avatarNone,
        name,
        chatlist,
        ['chatlist__wrapper']: chatlistWrapper
    } = styles

    const { users, type, groupData, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
    const { setSidebarOpened } = useResponseMenus()

    return (
        <div className={top} >

            <div className={chatlistWrapper}>
                <IconButton
                    icon={chatlistIcon}
                    className={[chatlist]}
                    onClick={() => setSidebarOpened(true)}
                />
            </div>

            <div className={userWrapper} onClick={showDetails}>
                <div className={userClass}>
                    <div className={avatar}>
                        {type === 'group' && (
                            <>
                                {groupData?.cover.url && <Image src={groupData?.cover.url} hash={groupData?.cover.hash} />}

                                {!groupData?.cover.url && (
                                    <div className={avatarNone}>
                                        <span>{groupData?.title[0]}</span>
                                    </div>
                                )}
                            </>
                        )}

                        {type === 'single' && (
                            <>

                                {users[0].avatar.url && <Image src={users[0].avatar.url} hash={users[0].avatar.hash} />}

                                {!users[0].avatar.url && (
                                    <div className={avatarNone}>
                                        <span>{users[0]?.name[0]}</span>
                                    </div>
                                )}

                            </>
                        )}
                    </div>
                    <div className={name}>
                        {type === 'single' && (
                            isCurrentUserBlocked ? 'Unknown' : users[0].name
                        )}
                        {type === 'group' && groupData.title}
                    </div>
                </div>
            </div>
        </div>
    )
}

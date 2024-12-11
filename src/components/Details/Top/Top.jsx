import React, { useEffect } from 'react'
import styles from './Top.module.scss'
import { Image } from '@/components/Image/Image'

import { useChatStore } from '@/lib/chatStore'

export const Top = () => {

    const {
        top,
        avatar,
        ["avatar__none"]: avatarNone,
        name,
        username
    } = styles

    const { users, type, groupData, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()

    return (
        <div className={top}>
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
            <h3 className={name}>
                {type === 'single' && (
                    isCurrentUserBlocked ? 'Unknown' : users[0].name
                )}
                {type === 'group' && groupData.title}
            </h3>
            {type === 'single' && (
                <h4 className={username}>
                    {isCurrentUserBlocked ? 'Unknown' : `@${users[0].username}`}
                </h4>
            )}
        </div>
    )
}

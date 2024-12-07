import React, { useEffect } from 'react'
import styles from './Top.module.scss'

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

                {type === 'single' && (
                    <>
                        {users[0].avatar.url && <img src={users[0].avatar.url} alt="" />}

                        {!users[0].avatar.url && (
                            <div className={avatarNone}>
                                {users[0].name[0]}
                            </div>
                        )}
                    </>
                )}

                {type === 'group' && (
                    <>
                        {groupData.cover.url && <img src={groupData.cover.url} alt="" />}

                        {!groupData.cover.url && (
                            <div className={avatarNone}>
                                {groupData.title[0]}
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

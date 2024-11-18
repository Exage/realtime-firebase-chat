import React from 'react'
import styles from './Top.module.scss'

import { useChatStore } from '@/lib/chatStore'

export const Top = ({ showDetails }) => {

    const {
        top,
        user: userClass,
        avatar,
        ["avatar__none"]: avatarNone,
        name
    } = styles

    const { users, type, groupData } = useChatStore()
    
    return (
        <div className={top} onClick={showDetails}>
            <div className={userClass}>
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
                <div className={name}>
                    {type === 'single' && users[0].name}
                    {type === 'group' && groupData.title}
                </div>
            </div>
        </div>
    )
}

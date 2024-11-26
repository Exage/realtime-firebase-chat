import React from 'react'
import styles from './Member.module.scss'
import classNames from 'classnames'

import { IconButton } from '@/components/UI/IconButton/IconButton'

import { useModals } from '@/lib/modalsStore'
import { useChatStore } from '@/lib/chatStore'
import { useUserStore } from '@/lib/userStore'

import { useStartChat } from '@/hooks/useStartChat'
import { useKickUser } from '@/hooks/useKickUser'

import chatIcon from '@/assets/icons/chat.svg'
import logoutIcon from '@/assets/icons/logout.svg'

export const Member = ({ user, isCurrent }) => {

    const {
        ['user']: userClass,
        ['user-current']: userCurrent,
        ['user-photo']: userPhoto,
        ['user-photo__none']: userPhotoNone,
        ['user-name']: userPhotoName,
        ['user-controls']: userControls,
    } = styles

    const { kickUser, loading: kickLoading } = useKickUser()
    const { startChat, loading: startChatLoading } = useStartChat()
    const { currentUser } = useUserStore()
    const { groupData, changeChat } = useChatStore()

    const { closeModal } = useModals()

    const handleStartNewChat = async (user) => {
        const res = await startChat(user)
        
        console.log(res)

        if (res) {
            changeChat(res)
            closeModal('membersList')
        }
    }

    const handleKickUser = async (userId) => {
        await kickUser(userId)
        closeModal('membersList')
    }

    return (
        <div className={classNames(userClass, { [userCurrent]: isCurrent })} key={user.id}>
            <div className={userPhoto}>
                {user.avatar.photo || (
                    <div className={userPhotoNone}>
                        {user.name[0]}
                    </div>
                )}
            </div>
            <h3 className={userPhotoName}>
                {user.name} {user.id === groupData.owner && '★'}
            </h3>
            {!isCurrent && (
                <div className={userControls}>
                    {currentUser.id === groupData.owner && (
                        <IconButton
                            icon={logoutIcon}
                            onClick={() => handleKickUser(user.id)}
                            loading={kickLoading}
                        />
                    )}
                    <IconButton
                        icon={chatIcon}
                        onClick={() => handleStartNewChat(user)}
                        loading={startChatLoading}
                    />
                </div>
            )}
        </div>
    )
}

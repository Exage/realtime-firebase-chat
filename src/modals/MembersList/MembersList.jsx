import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './MembersList.module.scss'

import { Modal } from '@/components/Modal/Modal'

import { IconButton } from '@/components/UI/IconButton/IconButton'
import { Loader } from '@/components/UI/Loader/Loader'

import { useChatStore } from '@/lib/chatStore'
import { useUserStore } from '@/lib/userStore'

import { useStartChat } from '@/hooks/useStartChat'
import { useKickUser } from '@/hooks/useKickUser'

import chatIcon from '@/assets/icons/chat.svg'
import logoutIcon from '@/assets/icons/logout.svg'

export const MembersList = () => {

    const {
        ['members-list']: membersList,
        ['members-list__users']: usersList,
        ['members-list__user']: userClass,
        ['members-list__user-current']: userCurrent,
        ['members-list__user-photo']: userPhoto,
        ['members-list__user-photo__none']: userPhotoNone,
        ['members-list__user-name']: userPhotoName,
        ['members-list__user-controls']: userControls,
    } = styles

    const { currentUser } = useUserStore()
    const { users, groupData } = useChatStore()
    const { kickUser } = useKickUser()

    const { startChat } = useStartChat()

    const handleStartNewChat = (user) => {
        startChat(user)
    }

    const handleKickUser = (userId) => {
        kickUser(userId)
    }

    return (
        <Modal
            modalId='membersList'
            title='Members list'
        >
            <div className={membersList}>

                {users && (
                    <div className={usersList}>
                        <div className={classNames(userClass, userCurrent)}>
                            <div className={userPhoto}>
                                {currentUser.avatar.photo || (
                                    <div className={userPhotoNone}>
                                        {currentUser.name[0]}
                                    </div>
                                )}
                            </div>
                            <h3 className={userPhotoName}>
                                {currentUser.name} {currentUser.id === groupData.owner && '★'}
                            </h3>
                            {/* <div className={userCurrent}>
                                You
                            </div> */}
                        </div>
                        {users.map(user => (
                            <div className={userClass} key={user.id}>
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
                                <div className={userControls}>
                                    {currentUser.id === groupData.owner && (
                                        <IconButton
                                            icon={logoutIcon}
                                            onClick={() => handleKickUser(user.id)}
                                        />
                                    )}
                                    <IconButton
                                        icon={chatIcon}
                                        onClick={() => handleStartNewChat(user)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </Modal>
    )
}
import React from 'react'

import classNames from 'classnames'
import styles from './Content.module.scss'

import { useChatStore } from '@/lib/chatStore'
import { useUserStore } from '@/lib/userStore'
import { useModals } from '@/lib/modalsStore'

import { Button } from '@/components/UI/Button/Button'

import mediaIcon from '@/assets/icons/photo-video.svg'
import slidersIcon from '@/assets/icons/sliders.svg'
import banIcon from '@/assets/icons/ban.svg'
import logoutIcon from '@/assets/icons/logout.svg'
import eraseIcon from '@/assets/icons/erase.svg'
import trashIcon from '@/assets/icons/trash.svg'
import membersIcon from '@/assets/icons/user-group.svg'
import memberAdd from '@/assets/icons/user-plus.svg'

export const Content = () => {

    const { content, block, dangerzone, title, btn, ban } = styles
    const { currentUser } = useUserStore()
    const { type, users, groupData, isReceiverBlocked, isCurrentUserBlocked } = useChatStore()
    const { openModal } = useModals()

    const handleClearChat = () => {
        openModal('clearChat')
    }

    const handleDeleteChat = () => {
        openModal('deleteChat')
    }

    const handleLeaveGroup = () => {
        openModal('leaveGroup')
    }

    const handleAddMember = () => {
        openModal('addMember')
    }

    const handleOpenMembersList = () => {
        openModal('membersList')
    }

    const handleOpenGroupSettings = () => {
        openModal('groupSettings')
    }

    const handleBlockModal = async () => {
        if (isReceiverBlocked) {
            openModal('unblockUser')
        } else {
            openModal('blockUser')
        }
    }

    return (
        <div className={content}>
            <div className={block}>
                {type === 'group' && (
                    <Button icon={slidersIcon} iconGap={20} className={[btn]} onClick={handleOpenGroupSettings}>Group settings</Button>
                )}
                <Button icon={mediaIcon} iconGap={20} className={[btn]} disabled={true}>Photos &amp; Video</Button>
            </div>

            {type === 'group' && (
                <div className={block}>
                    <Button icon={membersIcon} iconGap={20} className={[btn]} onClick={handleOpenMembersList}>{users.length + 1} Members</Button>
                    <Button icon={memberAdd} iconGap={20} className={[btn]} onClick={handleAddMember}>Add member</Button>
                </div>
            )}

            <div className={classNames(block, dangerzone)}>
                <h3 className={title}>Danger Zone</h3>
                {type === 'single' && (
                    <>
                        {!(isReceiverBlocked || isCurrentUserBlocked) && (
                            <Button icon={eraseIcon} iconGap={20} className={[btn, ban]} onClick={handleClearChat}>Clear chat</Button>
                        )}
                        {!(isReceiverBlocked || isCurrentUserBlocked) && (
                            <Button icon={trashIcon} iconGap={20} className={[btn, ban]} onClick={handleDeleteChat}>Delete Chat</Button>
                        )}
                        <Button icon={banIcon} iconGap={20} className={[btn, ban]} onClick={handleBlockModal}>
                            {isReceiverBlocked ? 'Unblock user' : 'Block user'}
                        </Button>
                    </>
                )}
                {type === 'group' && (
                    <>
                        {currentUser.id !== groupData.owner && (
                            <Button icon={logoutIcon} iconGap={20} className={[btn, ban]} onClick={handleLeaveGroup}>Leave group</Button>
                        )}

                        {currentUser.id === groupData.owner && (
                            <Button icon={trashIcon} iconGap={20} className={[btn, ban]} onClick={handleDeleteChat}>Delete Group</Button>
                        )}

                    </>
                )}
            </div>
        </div>
    )
}

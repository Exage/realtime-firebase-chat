import React, { useState } from 'react'
import styles from './MembersList.module.scss'

import { Modal } from '@/components/Modal/Modal'

import { useChatStore } from '@/lib/chatStore'
import { useUserStore } from '@/lib/userStore'
import { Member } from './Member/Member'

export const MembersList = () => {

    const {
        ['members-list']: membersList,
        ['members-list__users']: usersList
    } = styles

    const { currentUser } = useUserStore()
    const { users } = useChatStore()

    return (
        <Modal
            modalId='membersList'
            title='Members list'
        >
            <div className={membersList}>

                {users && (
                    <div className={usersList}>

                        <Member user={currentUser} isCurrent={true}/>

                        {users.map(user => (
                            <Member user={user} key={user.id} />
                        ))}
                    </div>
                )}

            </div>
        </Modal>
    )
}
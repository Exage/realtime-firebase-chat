import React from 'react'
import styles from './LeaveGroup.module.scss'

import { useModals } from '@/lib/modalsStore'
import { useLeaveGroup } from '@/hooks/useLeaveGroup'

import { Modal } from '@/components/Modal/Modal'
import { Button } from '@/components/UI/Button/Button'

export const LeaveGroup = () => {

    const { disclaimer, buttons } = styles

    const { closeModal } = useModals()

    const { leaveGroup, loading } = useLeaveGroup()

    const handleLeaveGroup = async () => {
        await leaveGroup()
        closeModal('leaveGroup')
    }

    return (
        <Modal
            title='Confirm your action'
            modalId='leaveGroup'
        >

            <p className={disclaimer}>
                Are you sure you want to leave the group?
            </p>

            <div className={buttons}>
                <Button filled={true} loading={loading} onClick={handleLeaveGroup}>Leave</Button>
                <Button onClick={() => closeModal('leaveGroup')} disabled={loading}>Cancel</Button>
            </div>
        </Modal>
    )
}

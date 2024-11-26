import React from 'react'
import styles from './LeaveGroup.module.scss'

import { useModals } from '@/lib/modalsStore'
import { useLeaveGroup } from '@/hooks/useLeaveGroup'

import { ModalConfirm } from '@/components/ModalConfirm/ModalConfirm'

export const LeaveGroup = () => {

    const { closeModal } = useModals()

    const { leaveGroup, loading } = useLeaveGroup()

    const handleLeaveGroup = async () => {
        await leaveGroup()
        closeModal('leaveGroup')
    }

    return (
        <ModalConfirm
            modalId='leaveGroup'
            confirmText='Leave'

            handleConfirm={handleLeaveGroup}
            loading={loading}
        >
            Are you sure you want to leave the group?
        </ModalConfirm>
    )
}

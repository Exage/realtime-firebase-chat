import React from 'react'
import styles from './UnblockUser.module.scss'

import { ModalConfirm } from '@/components/ModalConfirm/ModalConfirm'

import { useModals } from '@/lib/modalsStore'

import { useBlockUser } from '@/hooks/useBlockUser'

export const UnblockUser = () => {

    const { closeModal } = useModals()

    const { blockUser, loading } = useBlockUser()

    const handleBlock = async () => {
        await blockUser()
        closeModal('unblockUser')
    }

    return (
        <ModalConfirm
            modalId='unblockUser'
            confirmText='Unblock user'

            handleConfirm={handleBlock}
            loading={loading}
        >
            Are you sure you want to unblock the user?
        </ModalConfirm>
    )
}

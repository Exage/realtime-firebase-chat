import React from 'react'
import styles from './BlockUser.module.scss'

import { ModalConfirm } from '@/components/ModalConfirm/ModalConfirm'

import { useModals } from '@/lib/modalsStore'

import { useBlockUser } from '@/hooks/useBlockUser'

export const BlockUser = () => {

    const { closeModal } = useModals()

    const { blockUser, loading } = useBlockUser()

    const handleBlock = async () => {
        await blockUser()
        closeModal('blockUser')
    }

    return (
        <ModalConfirm
            modalId='blockUser'
            confirmText='Block user'

            handleConfirm={handleBlock}
            loading={loading}
        >
            Are you sure you want to block the user?
        </ModalConfirm>
    )
}

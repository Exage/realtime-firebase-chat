import React from 'react'
import styles from './DeleteChat.module.scss'

import { useModals } from '@/lib/modalsStore'
import { useDeleteChat } from '@/hooks/useDeleteChat'

import { ModalConfirm } from '@/components/ModalConfirm/ModalConfirm'

export const DeleteChat = () => {

    const { closeModal } = useModals()

    const { deleteChat, loading } = useDeleteChat()

    const handleDeleteChat = async () => {
        await deleteChat()
        closeModal('deleteChat')
    }

    return (
        <ModalConfirm
            modalId='deleteChat'
            confirmText='Delete Chat'

            handleConfirm={handleDeleteChat}
            loading={loading}
        >
            Are you sure you want to delete the entire chat?
        </ModalConfirm>
    )
}

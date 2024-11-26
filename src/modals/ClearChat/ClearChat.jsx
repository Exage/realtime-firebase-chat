import React from 'react'

import { useModals } from '@/lib/modalsStore' 
import { useClearChat } from '@/hooks/useClearChat'

import { ModalConfirm } from '@/components/ModalConfirm/ModalConfirm'

export const ClearChat = () => {
    
    const { closeModal } = useModals()

    const { clearChat, loading } = useClearChat()

    const handleClearMessages = async () => {
        await clearChat()
        closeModal('clearChat')
    }

    return (
        <ModalConfirm
            modalId='clearChat'
            confirmText='Clear all data'

            handleConfirm={handleClearMessages}
            loading={loading}
        >
            Are you sure you want to delete all messages from the chat?
        </ModalConfirm>
    )
}

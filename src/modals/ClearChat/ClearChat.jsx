import React from 'react'
import styles from './ClearChat.module.scss'

import { useModals } from '@/lib/modalsStore' 
import { useClearChat } from '@/hooks/useClearChat'

import { Modal } from '@/components/Modal/Modal'
import { Button } from '@/components/UI/Button/Button'

export const ClearChat = () => {

    const { disclaimer, buttons } = styles

    const { closeModal } = useModals()

    const { clearChat, loading } = useClearChat()

    const handleClearMessages = async () => {
        await clearChat()
        closeModal('clearChat')
    }

    return (
        <Modal
            title='Confirm your action'
            modalId='clearChat'
        >

            <p className={disclaimer}>
                Are you sure you want to delete all messages from the chat?
            </p>

            <div className={buttons}>
                <Button filled={true} loading={loading} onClick={handleClearMessages}>Clear all data</Button>
                <Button onClick={() => closeModal('clearChat')}>Cancel</Button>
            </div>
        </Modal>
    )
}

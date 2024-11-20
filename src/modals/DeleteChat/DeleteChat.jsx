import React from 'react'
import styles from './DeleteChat.module.scss'

import { useModals } from '@/lib/modalsStore'
import { useDeleteChat } from '@/hooks/useDeleteChat'

import { Modal } from '@/components/Modal/Modal'
import { Button } from '@/components/UI/Button/Button'

export const DeleteChat = () => {

    const { disclaimer, buttons } = styles

    const { closeModal } = useModals()

    const { deleteChat, loading } = useDeleteChat()

    const handleDeleteChat = async () => {
        await deleteChat()
        closeModal('deleteChat')
    }

    return (
        <Modal
            title='Confirm your action'
            modalId='deleteChat'
        >

            <p className={disclaimer}>
                Are you sure you want to delete the entire chat?
            </p>

            <div className={buttons}>
                <Button filled={true} loading={loading} onClick={handleDeleteChat}>Delete Chat</Button>
                <Button onClick={() => closeModal('deleteChat')} disabled={loading}>Cancel</Button>
            </div>
        </Modal>
    )
}

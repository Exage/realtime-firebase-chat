import React from 'react'
import styles from './ModalConfirm.module.scss'

import { Modal } from '@/components/Modal/Modal'
import { Button } from '@/components/UI/Button/Button'

import { useModals } from '@/lib/modalsStore'

export const ModalConfirm = ({ title = 'Confirm your action', modalId, confirmText="Confirm", handleConfirm, loading = false, children }) => {

    const { disclaimer, buttons } = styles
    const { closeModal } = useModals()

    return (
        <Modal
            title={title}
            modalId={modalId}
        >

            <p className={disclaimer}>
                {children}
            </p>

            <div className={buttons}>
                <Button filled={true} loading={loading} onClick={handleConfirm}>{confirmText}</Button>
                <Button onClick={() => closeModal(modalId)} disabled={loading}>Cancel</Button>
            </div>

        </Modal>
    )
}

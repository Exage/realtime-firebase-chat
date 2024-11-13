import React, { useEffect } from 'react'
import styles from './Modal.module.scss'
import classNames from 'classnames'

import { useForm } from 'react-hook-form'
import { useModals } from '@/lib/modalsStore'

import { IconButton } from '@/components/UI/IconButton/IconButton'

import xmark from '@/assets/icons/xmark.svg'

export const Modal = ({ children, modalId, title, resetForms = null }) => {

    const {
        ['modal']: modal,
        ['overlay']: overlay,
        ['opened']: opened,
        ['modal__dialog']: dialog,
        ['modal__close']: close,
        ['modal__title']: titleClass,
        ['modal__content']: content,
    } = styles

    const { modals, closeModal } = useModals()

    const handleCloseModal = () => {
        closeModal(modalId)
        
        if (resetForms) {
            resetForms()
        }
    }

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                handleCloseModal()
            }
        }

        document.addEventListener('keydown', handleEscapeKey)

        return () => {
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [])

    return (
        <div
            className={classNames(overlay, { [opened]: modals[modalId] })}
            data-modal-type={modalId}
            onClick={handleCloseModal}
        >
            <div className={modal}>
                <div className={dialog} onClick={(e) => e.stopPropagation()}>

                    <IconButton icon={xmark} className={[close]} onClick={handleCloseModal} />

                    {title && (
                        <h3 className={titleClass}>
                            {title}
                        </h3>
                    )}

                    <div className={content}>
                        {children}
                    </div>

                </div>
            </div>
        </div>
    )
}

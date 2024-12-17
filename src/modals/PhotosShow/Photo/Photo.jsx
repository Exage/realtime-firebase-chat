import React from 'react'
import styles from './Photo.module.scss'

import { Image } from '@/components/Image/Image'

import { useModals } from '@/lib/modalsStore'

export const Photo = ({ data }) => {

    const { photo } = styles
    const { closeModal } = useModals()

    const handleScrollToMsg = () => {
        const target = document.querySelector(`[data-messageid="${data.id}"]`)
        target.scrollIntoView({ behavior: 'smooth', block: 'end' })
        closeModal('photosShow')
    }

    return (
        <div className={photo} onClick={handleScrollToMsg}>
            <Image
                src={data.photo.url}
                hash={data.photo.hash}
            />
        </div>
    )
}

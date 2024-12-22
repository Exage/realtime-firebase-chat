import React, { useEffect, useState } from 'react'
import styles from './PhotosShow.module.scss'
import { Modal } from '@/components/Modal/Modal'
import { useChatStore } from '@/lib/chatStore'
import { Photo } from './Photo/Photo'

export const PhotosShow = () => {

    const { photos: photosWrapper, noPhotos } = styles

    const { messages } = useChatStore()

    const [photos, setPhotos] = useState(null)

    useEffect(() => {

        const filtered = messages?.filter(item => item.photo !== null && item.hasOwnProperty('photo'))
        setPhotos(filtered)

        return () => {
            setPhotos(null)
        }
    }, [messages])

    return (
        <Modal
            title={'Photos'}
            modalId={'photosShow'}
        >
            {photos && (
                <>
                    <div className={photosWrapper}>
                        {photos.map(item => (
                            <Photo key={item.id} data={item} />
                        ))}
                    </div>
                    {photos.length === 0 && (
                        <div className={noPhotos}>
                            This chat does not contain photos
                        </div>
                    )}
                </>
            )}
        </Modal>
    )
}

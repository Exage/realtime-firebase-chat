import { useState } from 'react'
import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'
import { useUploadPhoto } from './useUploadPhoto'

import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const useChangeGroupData = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { currentUser } = useUserStore()
    const { chatId, users } = useChatStore()

    const { uploadPhoto } = useUploadPhoto()

    const changeGroupTitle = async (title) => {
        try {
            setLoading(true)
            setError(null)

            const userIDs = [currentUser.id, ...users.map(user => user.id)]

            await Promise.all(
                userIDs.map(async (id) => {
                    const userChatRef = doc(db, 'userchats', id)
                    const userChatsSnapshot = await getDoc(userChatRef)

                    if (userChatsSnapshot.exists()) {
                        const userChatsData = userChatsSnapshot.data()
                        const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)

                        userChatsData.chats[chatIndex].groupData.title = title

                        await updateDoc(userChatRef, {
                            chats: userChatsData.chats
                        })
                    }
                })
            )


        } catch (error) {
            console.error(error)
            setError(error)
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    const changeGroupPhoto = async (photo) => {
        try {
            setLoading(true)
            setError(null)

            if (!photo) {
                throw new Error('no-photo')
            }

            const res = await uploadPhoto(photo)

            const userIDs = [currentUser.id, ...users.map(user => user.id)]

            await Promise.all(
                userIDs.map(async (id) => {
                    const userChatRef = doc(db, 'userchats', id)
                    const userChatsSnapshot = await getDoc(userChatRef)

                    if (userChatsSnapshot.exists()) {
                        const userChatsData = userChatsSnapshot.data()
                        const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)

                        userChatsData.chats[chatIndex].groupData.cover = res

                        await updateDoc(userChatRef, {
                            chats: userChatsData.chats
                        })
                    }
                })
            )


        } catch (error) {
            console.error(error)
            setError(error)
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleError = (error) => {
        switch (error.code || error.message) {
            case 'no-photo':
                setError({ field: 'photo', message: 'No photo selected' })
                break
            default:
                setError({ field: 'general', message: error.message })
                console.warn('Unhandled error:', error)
                break
        }
    }

    return { loading, error, changeGroupTitle, changeGroupPhoto }
}

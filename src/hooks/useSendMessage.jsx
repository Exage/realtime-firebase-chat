import { useState } from 'react'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { v4 as uuidv4 } from 'uuid'

import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'

import { useUploadPhoto } from './useUploadPhoto'

export const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { currentUser } = useUserStore()
    const { chatId, users } = useChatStore()

    const { uploadPhoto } = useUploadPhoto()

    const sendMessage = async (data) => {
        try {
            setLoading(true)
            setError(null)

            let photo = null

            if (data.photo) {
                photo = await uploadPhoto(data.photo)
            }

            const messageId = uuidv4()
            const messageStructure = {
                id: messageId,
                type: 'user',
                senderId: currentUser.id,
                text: data.text,
                photo,
                createdAt: new Date()
            }

            await updateDoc(doc(db, 'chats', chatId), {
                messages: arrayUnion(messageStructure)
            })
            
            const userIDs = [currentUser.id, ...users.map(user => user.id)]

            userIDs.forEach(async (id) => {
                const userChatRef = doc(db, 'userchats', id)
                const userChatsSnapshot = await getDoc(userChatRef)

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data()
                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)

                    userChatsData.chats[chatIndex].lastMessage = messageStructure
                    userChatsData.chats[chatIndex].updatedAt = Date.now()

                    await updateDoc(userChatRef, {
                        chats: userChatsData.chats,
                    })
                }
            })

        } catch (error) {
            console.error(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, sendMessage }
}

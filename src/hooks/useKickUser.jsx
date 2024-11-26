import { useState } from 'react'
import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'
import { v4 as uuidv4 } from 'uuid'

import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const useKickUser = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { currentUser } = useUserStore()
    const { chatId, users } = useChatStore()

    const kickUser = async (userId) => {
        try {
            setLoading(true)
            setError(null)

            const messageId = uuidv4()
            const messageStructure = {
                id: messageId,
                type: 'system left-chat',
                senderId: userId,
                text: 'One member leave group',
                createdAt: new Date()
            }

            await updateDoc(doc(db, 'chats', chatId), {
                messages: arrayUnion(messageStructure)
            })

            const userChatRef = doc(db, 'userchats', userId)
            const userChatsSnapshot = await getDoc(userChatRef)

            const userIDs = [currentUser.id, ...users.map(user => user.id)]

            userIDs.forEach(async (id) => {
                const userChatRef = doc(db, 'userchats', id)
                const userChatsSnapshot = await getDoc(userChatRef)

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data()
                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)

                    if (chatIndex !== -1) {
                        const receiversIDs = userChatsData.chats[chatIndex].receiversIDs

                        userChatsData.chats[chatIndex].receiversIDs = receiversIDs.filter(id => id !== userId)
                        userChatsData.chats[chatIndex].lastMessage = messageStructure
                        userChatsData.chats[chatIndex].updatedAt = Date.now()

                        await updateDoc(userChatRef, {
                            chats: userChatsData.chats,
                        })
                    }
                }
            })

            if (userChatsSnapshot.exists()) {
                const userChatsData = userChatsSnapshot.data()
                const filteredChats = userChatsData.chats.filter(c => c.chatId !== chatId)

                await updateDoc(userChatRef, {
                    chats: filteredChats
                })
            }

        } catch (error) {
            console.error(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, kickUser }
}

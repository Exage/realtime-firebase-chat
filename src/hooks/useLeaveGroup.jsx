import { useState } from 'react'
import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'
import { v4 as uuidv4 } from 'uuid'

import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const useLeaveGroup = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { currentUser } = useUserStore()
    const { chatId, users, clearChat } = useChatStore()

    const leaveGroup = async () => {
        try {
            setLoading(true)
            setError(null)

            const messageId = uuidv4()
            const messageStructure = {
                id: messageId,
                type: 'system left-chat',
                senderId: currentUser.id,
                text: 'One member leave group',
                createdAt: new Date()
            }

            await updateDoc(doc(db, 'chats', chatId), {
                messages: arrayUnion(messageStructure)
            })

            const userIDs = users.map(user => user.id)

            userIDs.forEach(async (id) => {
                const userChatRef = doc(db, 'userchats', id)
                const userChatsSnapshot = await getDoc(userChatRef)

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data()
                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)

                    const receiversIDs = userChatsData.chats[chatIndex].receiversIDs

                    userChatsData.chats[chatIndex].receiversIDs = receiversIDs.filter(id => id !== currentUser.id)
                    userChatsData.chats[chatIndex].lastMessage = messageStructure
                    userChatsData.chats[chatIndex].updatedAt = Date.now()

                    await updateDoc(userChatRef, {
                        chats: userChatsData.chats,
                    })
                }
            })

            const userChatRef = doc(db, 'userchats', currentUser.id)
            const userChatsSnapshot = await getDoc(userChatRef)

            if (userChatsSnapshot.exists()) {
                const userChatsData = userChatsSnapshot.data()
                const filteredChats = userChatsData.chats.filter(c => c.chatId !== chatId)

                await updateDoc(userChatRef, {
                    chats: filteredChats
                })
            }

            clearChat()

        } catch (error) {
            console.error(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, leaveGroup }
}

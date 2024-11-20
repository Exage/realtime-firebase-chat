import { useState } from 'react'
import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'

import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const useDeleteChat = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { currentUser } = useUserStore()
    const { chatId, users, clearChat } = useChatStore()

    const deleteChat = async () => {
        try {
            setLoading(true)
            setError(null)

            const userIDs = [currentUser.id, ...users.map(user => user.id)]

            userIDs.forEach(async (id) => {
                const userChatRef = doc(db, 'userchats', id)
                const userChatsSnapshot = await getDoc(userChatRef)

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data()
                    const filteredChats = userChatsData.chats.filter(c => c.chatId !== chatId)

                    await updateDoc(userChatRef, {
                        chats: filteredChats
                    })
                }
            })

            const chatRef = doc(db, 'chats', chatId)
            await deleteDoc(chatRef)
            clearChat()

        } catch (error) {
            console.error(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, deleteChat }
}

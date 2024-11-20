import { useState } from 'react'
import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'

import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const useClearChat = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { currentUser } = useUserStore()
    const { chatId, users } = useChatStore()

    const clearChat = async () => {
        try {
            setLoading(true)
            setError(null)

            await updateDoc(doc(db, 'chats', chatId), {
                messages: []
            })

            const userIDs = [currentUser.id, ...users.map(user => user.id)]

            userIDs.forEach(async (id) => {
                const userChatRef = doc(db, 'userchats', id)
                const userChatsSnapshot = await getDoc(userChatRef)

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data()
                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)

                    userChatsData.chats[chatIndex].lastMessage = ""
                    userChatsData.chats[chatIndex].isSeen = true
                    userChatsData.chats[chatIndex].unreadedMessages = 0
                    userChatsData.chats[chatIndex].updatedAt = Date.now()

                    await updateDoc(userChatRef, {
                        chats: userChatsData.chats,
                    })
                }
            })

        } catch (error) {
            console.error(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, clearChat }
}

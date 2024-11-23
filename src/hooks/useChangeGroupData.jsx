import { useState } from 'react'
import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'

import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const useChangeGroupData = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { currentUser } = useUserStore()
    const { chatId, users } = useChatStore()

    const changeGroupData = async (newGroupData) => {
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

                        userChatsData.chats[chatIndex].groupData = newGroupData

                        await updateDoc(userChatRef, {
                            chats: userChatsData.chats,
                        })
                    }
                })
            )


        } catch (error) {
            console.error(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, changeGroupData }
}

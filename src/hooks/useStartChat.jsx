import { useState } from 'react'
import { arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUserStore } from '@/lib/userStore'
import { v4 as uuidv4 } from 'uuid'

export const useStartChat = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { currentUser } = useUserStore()

    const startChat = async (user) => {
        try {

            const chatRef = collection(db, 'chats')
            const userChatRef = collection(db, 'userchats')

            const newChatRef = doc(chatRef)

            const messageId = uuidv4()
            const messageStructure = {
                id: messageId,
                type: 'system',
                senderId: "",
                text: "Chat started",
                isSeen: false,
                createdAt: new Date()
            }

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                type: 'single',
                messages: [
                    messageStructure
                ]
            })

            const userId = user.id

            const chatData = {
                chatId: newChatRef.id,
                lastMessage: messageStructure,
                isSeen: false,
                unreadedMessages: 0,
                type: 'single',
                groupData: {},
                updatedAt: Date.now()
            }

            await updateDoc(doc(userChatRef, userId), {
                chats: arrayUnion({
                    ...chatData,
                    receiversIDs: [currentUser.id]
                })
            })

            await updateDoc(doc(userChatRef, currentUser.id), {
                chats: arrayUnion({
                    ...chatData,
                    receiversIDs: [userId]
                })
            })

        } catch (error) {
            console.error(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, startChat }
}
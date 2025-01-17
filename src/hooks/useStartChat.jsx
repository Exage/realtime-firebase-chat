import { useState } from 'react'
import { arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUserStore } from '@/lib/userStore'
import { useChatsStore } from '@/lib/chatsStore'
import { v4 as uuidv4 } from 'uuid'

export const useStartChat = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { currentUser } = useUserStore()
    const { chats } = useChatsStore()

    const startChat = async (user) => {
        try {
            setLoading(true)
            setError(null)

            const allSingleChats = chats.filter(chat => chat.type === 'single')

            const existingChat = allSingleChats.find(chat => chat.receiversIDs[0] === user.id)

            if (existingChat) {
                return existingChat
            }

            const chatRef = collection(db, 'chats')
            const userChatRef = collection(db, 'userchats')

            const newChatRef = doc(chatRef)

            const messageId = uuidv4()
            const messageStructure = {
                id: messageId,
                type: 'system',
                senderId: currentUser.id,
                text: "Chat started",
                photo: null,
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
                type: 'single',
                groupData: {},
                isReceiverBlocked: false,
                isCurrentUserBlocked: false,
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

            return { ...chatData, receiversIDs: [userId], users: [user] }

        } catch (error) {
            console.error(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, startChat }
}

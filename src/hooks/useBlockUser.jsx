import { useState } from 'react'

import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'

import { db } from '@/lib/firebase'
import { arrayRemove, arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore'

export const useBlockUser = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { currentUser } = useUserStore()
    const { chatId, users } = useChatStore()

    const blockUser = async () => {
        try {
            setLoading(true)
            setError(null)

            const user = users[0]

            if (!user) return

            const userChatRef = collection(db, 'userchats')
            const userDocRef = doc(db, 'users', currentUser.id)

            const currentUserChatsRef = doc(userChatRef, currentUser.id)
            const currentUserChatsSnapshot = await getDoc(currentUserChatsRef)
            const currentUserChats = currentUserChatsSnapshot.data().chats

            const currentUserChatIndex = currentUserChats.findIndex(chat => chat.chatId === chatId)
            if (currentUserChatIndex === -1) return

            const currentUserChat = { ...currentUserChats[currentUserChatIndex] }
            currentUserChat.isReceiverBlocked = !currentUserChat.isReceiverBlocked
            currentUserChats[currentUserChatIndex] = currentUserChat

            const receiverChatsRef = doc(userChatRef, user.id)
            const receiverChatsSnapshot = await getDoc(receiverChatsRef)
            const receiverChats = receiverChatsSnapshot.data().chats

            const receiverChatIndex = receiverChats.findIndex(chat => chat.chatId === chatId)
            if (receiverChatIndex === -1) return

            const receiverChat = { ...receiverChats[receiverChatIndex] }
            receiverChat.isCurrentUserBlocked = !receiverChat.isCurrentUserBlocked
            receiverChats[receiverChatIndex] = receiverChat

            await updateDoc(doc(userChatRef, user.id), {
                chats: receiverChats
            })

            await updateDoc(doc(userChatRef, currentUser.id), {
                chats: currentUserChats
            })

            await updateDoc(userDocRef, {
                blocked: currentUserChat.isReceiverBlocked ? arrayUnion(user.id) : arrayRemove(user.id)
            })
            
        } catch (error) {
            console.error(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, blockUser }
}

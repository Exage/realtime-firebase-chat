import { useState } from 'react'
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { v4 as uuidv4 } from 'uuid'

export const useAddUserToGroup = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const addUserToGroup = async (chatId, userId, groupData, receiversIDs) => {
        try {
            setLoading(true)
            setError(null)

            const messageId = uuidv4()
            const messageStructure = {
                id: messageId,
                type: 'system user-added',
                senderId: userId,
                text: "One memeber has joined",
                createdAt: new Date()
            }

            const chatData = {
                chatId,
                lastMessage: messageStructure,
                type: 'group',
                groupData: groupData,
                updatedAt: Date.now(),
                receiversIDs
            }

            await updateDoc(doc(db, 'userchats', userId), {
                chats: arrayUnion(chatData)
            })


            await updateDoc(doc(db, 'chats', chatId), {
                messages: arrayUnion(messageStructure)
            })

            const allIDs = [userId, ...receiversIDs]

            allIDs.forEach(async (id) => {
                const userChatRef = doc(db, 'userchats', id)
                const userChatsSnapshot = await getDoc(userChatRef)

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data()
                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)

                    if (chatIndex >= 0) {
                        userChatsData.chats[chatIndex].receiversIDs = allIDs.filter(uid => uid !== id)
                        userChatsData.chats[chatIndex].lastMessage = messageStructure
                        userChatsData.chats[chatIndex].updatedAt = Date.now()

                        await updateDoc(userChatRef, {
                            chats: userChatsData.chats,
                        })
                    }
                }
            })
            
        } catch (error) {
            console.error(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, addUserToGroup }
}

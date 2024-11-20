import { useState } from 'react'
import { arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUserStore } from '@/lib/userStore'
import { v4 as uuidv4 } from 'uuid'

export const useStartGroup = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { currentUser } = useUserStore()

    const startGroup = async (users) => {
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
                type: 'group',
                messages: [messageStructure]
            })

            const chatData = {
                chatId: newChatRef.id,
                lastMessage: messageStructure,
                isSeen: false,
                unreadedMessages: 0,
                type: 'group',
                groupData: {
                    title: "New group",
                    cover: {
                        url: null,
                        hash: null
                    },
                    owner: currentUser.id
                },
                updatedAt: Date.now()
            }

            const usersIds = users.map(user => user.id)

            const allUsersIds = [currentUser.id, ...usersIds]

            await Promise.all(
                allUsersIds.map(async userId => {
                    await updateDoc(doc(userChatRef, userId), {
                        chats: arrayUnion({
                            ...chatData,
                            receiversIDs: allUsersIds.filter(id => id !== userId)
                        })
                    })
                })
            )

        } catch (error) {
            console.error(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, startGroup }
}

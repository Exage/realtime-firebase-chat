import React, { useEffect, useState } from 'react'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { useUserStore } from '@/lib/userStore'
import { useChatsStore } from '@/lib/chatsStore'
import { db } from '@/lib/firebase'
import styles from './ChatList.module.scss'

import { Chat } from './Chat/Chat'

import { Loader } from '@/components/UI/Loader/Loader'

export const ChatList = () => {

    const {
        chats: chatsClass,
        ['chats__overflow']: chatsOverflow,
        ['chats__nochat']: noChat,
        ['chats__loading']: loading,
    } = styles

    const { chats, setChats, setLoading, isLoading } = useChatsStore()
    const { currentUser } = useUserStore()

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'userchats', currentUser.id),
            async (res) => {
                const items = res.data().chats

                const promises = items.map(async (item) => {
                    if (item.type === 'single') {
                        const userDocRef = doc(db, 'users', item.receiversIDs[0])
                        const userDocSnap = await getDoc(userDocRef)
                        const user = userDocSnap.data()
                        return { ...item, users: [user] }
                    }
    
                    if (item.type === 'group') {
                        const usersPromises = item.receiversIDs.map(async (userId) => {
                            const userDocRef = doc(db, 'users', userId)
                            const userDocSnap = await getDoc(userDocRef)
                            return userDocSnap.data()
                        })
    
                        const users = await Promise.all(usersPromises)
                        return { ...item, users }
                    }
                })

                const chatData = await Promise.all(promises)

                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
                setLoading(false)
            })

        return () => {
            unSub()
        }
    }, [currentUser.id])

    return (
        <div className={chatsClass}>
            {isLoading && (
                <div className={loading}>
                    <Loader />
                </div>
            )}
            {(chats && chats.length === 0) && (
                <div className={noChat}>
                    Your chat list is empty. <br /> Try to find someone!
                </div>
            )}
            {chats && (
                <div className={chatsOverflow}>
                    {chats.map((chat) => <Chat chat={chat} chats={chats} key={chat.chatId} />)}
                </div>
            )}
        </div>
    )
}

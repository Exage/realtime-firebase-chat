import React, { useEffect } from 'react'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'

import { useUserStore } from '@/lib/userStore'
import { useChatsStore } from '@/lib/chatsStore'
import { useChatStore } from '@/lib/chatStore'

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
    const { chatId: currentChatID, changeChat, changeGroup, clearChat } = useChatStore()
    const { currentUser } = useUserStore()

    useEffect(() => {
        let isMounted = true
    
        const unSub = onSnapshot(doc(db, 'userchats', currentUser.id), async (res) => {
            try {
                const items = res.data()?.chats || []
    
                const promises = items.map(async (item) => {
                    if (item.type === 'single') {
                        const userDocSnap = await getDoc(doc(db, 'users', item.receiversIDs[0]))
                        return { ...item, users: [userDocSnap.data()] }
                    }
    
                    if (item.type === 'group') {
                        const users = await Promise.all(
                            item.receiversIDs.map(async (id) => {
                                const userDocSnap = await getDoc(doc(db, 'users', id))
                                return userDocSnap.data()
                            })
                        )
                        return { ...item, users }
                    }
                    return item
                })
    
                const chatData = await Promise.all(promises)
    
                if (isMounted) {
                    setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
    
                    const currentChat = chatData.find(chat => chat.chatId === currentChatID)
    
                    if (currentChat) {
                        if (currentChat.type === 'single') {
                            changeChat(currentChat.chatId, currentChat.users[0], currentChat.lastMessageId)
                        } else if (currentChat.type === 'group') {
                            changeGroup(currentChat.chatId, currentChat.users, currentChat.lastMessageId, currentChat.groupData)
                        }
                    } else if (currentChatID) {
                        clearChat()
                    }
    
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error updating chats:', error)
            }
        })
    
        return () => {
            isMounted = false
            unSub()
        }
    }, [currentUser.id, currentChatID])

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

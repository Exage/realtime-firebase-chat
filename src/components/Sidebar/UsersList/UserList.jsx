import React, { useEffect, useState } from 'react'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { useUserStore } from '@/lib/userStore'
import { db } from '@/lib/firebase'
import styles from './UserList.module.scss'

import { User } from './User/User'

import { Loader } from '@/components/UI/Loader/Loader'

export const UserList = () => {

    const {
        users,
        ['users__overflow']: usersOverflow,
        ['users__nochat']: noChat,
        ['users__loading']: loading,
    } = styles

    const [chats, setChats] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const { currentUser } = useUserStore()

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'userchats', currentUser.id),
            async (res) => {
                const items = res.data().chats

                const promises = items.map(async (item) => {
                    const userDocRef = doc(db, 'users', item.receiverId)
                    const userDocSnap = await getDoc(userDocRef)

                    const user = userDocSnap.data()

                    return { ...item, user }
                })

                const chatData = await Promise.all(promises)

                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
                setIsLoading(false)
            })

        return () => {
            unSub()
        }
    }, [currentUser.id])

    return (
        <div className={users}>
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
            {chats && chats.map((data) => (
                <div className={usersOverflow}>
                    <User data={data} key={data.id} />
                </div>
            ))}
        </div>
    )
}

import { useState } from 'react'

import { useUserStore } from '@/lib/userStore'
import { useChatStore } from '@/lib/chatStore'

import { db } from '@/lib/firebase'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'

export const useBlockUser = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { currentUser } = useUserStore()
    const { users, changeBlock, isReceiverBlocked } = useChatStore()

    const blockUser = async () => {
        try {
            setLoading(true)
            setError(null)

            const user = users[0]

            if (!user) return

            const userDocRef = doc(db, 'users', currentUser.id)

            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
            })
            
            changeBlock()
            
        } catch (error) {
            console.error(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, blockUser }
}

import { useState } from 'react'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUserStore } from '@/lib/userStore'

export const useUpdateUser = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { currentUser, setUser } = useUserStore()

    const updateUser = async (data) => {

        try {
            setLoading(true)
            setError(null)

            const { username } = data

            if (username && username !== currentUser.username) {
                const usersRef = collection(db, 'users')
                const usernameQuery = query(usersRef, where('username', '==', username))
                const querySnapshot = await getDocs(usernameQuery)
    
                if (!querySnapshot.empty) {
                    throw new Error('auth/username-already-in-use')
                }
            }

            const newData = {...currentUser, ...data}

            const userRef = doc(db, 'users', currentUser.id)
            await updateDoc(userRef, newData)

            setUser(newData)

        } catch (error) {
            console.error(error)
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleError = (error) => {
        switch (error.code || error.message) {
            case 'auth/username-already-in-use':
                setError({ field: 'username', message: 'Username is already in use' })
                break
            default:
                setError({ field: 'general', message: error.message })
                console.warn('Unhandled error:', error)
                break
        }
    }

    return { loading, error, updateUser }
}
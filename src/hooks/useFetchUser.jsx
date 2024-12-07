import { useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUserStore } from '@/lib/userStore'

export const useFetchUser = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { currentUser } = useUserStore()

    const fetchUser = async (data) => {

        try {
            setLoading(true)
            setError(null)

            const { username } = data

            console.log(username)

            if (username === currentUser.username) {
                return {}
            }

            const usersRef = collection(db, 'users')
            const usernameQuery = query(usersRef, where('username', '==', username))
            const querySnapshot = await getDocs(usernameQuery)

            if (!querySnapshot.empty) {
                return querySnapshot.docs[0].data()
            }

            return {}

        } catch (error) {
            console.error(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, fetchUser }
}

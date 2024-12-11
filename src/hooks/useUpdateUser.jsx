import { useState } from 'react'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUserStore } from '@/lib/userStore'
import { useUploadPhoto } from './useUploadPhoto'
import { useDeletePhoto } from './useDeletePhoto'

export const useUpdateUser = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { currentUser, setUser } = useUserStore()

    const { uploadPhoto } = useUploadPhoto()
    const { deletePhoto } = useDeletePhoto()

    const updateName = async (name) => {
        try {
            setLoading(true)
            setError(null)

            const newData = { ...currentUser, name }

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

    const updateUsername = async (username) => {
        try {
            setLoading(true)
            setError(null)

            if (username && username !== currentUser.username) {
                const usersRef = collection(db, 'users')
                const usernameQuery = query(usersRef, where('username', '==', username))
                const querySnapshot = await getDocs(usernameQuery)

                if (!querySnapshot.empty) {
                    throw new Error('auth/username-already-in-use')
                }
            }

            const newData = { ...currentUser, username }

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

    const updatePhoto = async (photo) => {
        try {
            setLoading(true)
            setError(null)
            
            if (!photo) {
                throw new Error('no-photo') 
            }

            const res = await uploadPhoto(photo)

            const newData = { ...currentUser, avatar: res }

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
            case 'no-photo': 
                setError({ field: 'photo', message: 'No photo selected' })
                break
            default:
                setError({ field: 'general', message: error.message })
                console.warn('Unhandled error:', error)
                break
        }
    }

    return { 
        loading, 
        error, 
        updateUsername, 
        updateName, 
        updatePhoto 
    }
}
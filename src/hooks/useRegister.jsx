import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

export const useRegister = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const register = async (data) => {
        try {
            setLoading(true)
            setError(null)

            const { name, email, username, password } = data

            const usersRef = collection(db, 'users')
            const usernameQuery = query(usersRef, where('username', '==', username))
            const querySnapshot = await getDocs(usernameQuery)

            if (!querySnapshot.empty) {
                throw new Error('auth/username-already-in-use')
            }

            const res = await createUserWithEmailAndPassword(auth, email, password)

            await setDoc(doc(db, 'users', res.user.uid), {
                id: res.user.uid,
                name,
                email,
                username,
                avatar: {
                    url: null,
                    hash: null
                },
                blocked: []
            })

            await setDoc(doc(db, 'userchats', res.user.uid), {
                chats: []
            })

            
        } catch (error) {
            console.error(error)
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleError = (error) => {
        switch (error.code || error.message) {
            case 'auth/email-already-in-use':
                setError({ field: 'email', message: 'Email is already taken' })
                break
            case 'auth/invalid-email':
                setError({ field: 'email', message: 'Invalid email' })
                break
            case 'auth/username-already-in-use':
                setError({ field: 'username', message: 'Username is already in use' })
                break
            case 'auth/weak-password':
                setError({ field: 'password', message: 'Password should be at least 6 characters' })
                break
            default:
                setError({ field: 'general', message: error.message })
                console.warn('Unhandled error:', error)
                break
        }
    }

    return { loading, error, register }
}

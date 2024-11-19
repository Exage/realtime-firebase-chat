import { useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'

export const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const login = async (data) => {
        try {
            setLoading(true)
            setError(null)

            const { email, password } = data

            const usersRef = collection(db, 'users')
            const emailQuery = query(usersRef, where('email', '==', email))
            const querySnapshot = await getDocs(emailQuery)

            console.log(querySnapshot.empty)

            if (querySnapshot.empty) {
                throw new Error('auth/user-not-found')
            }

            const res = await signInWithEmailAndPassword(auth, email, password)

            console.log(res)

        } catch (error) {
            console.error(error)
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleError = (error) => {
        console.error('Error code:', error.code)

        switch (error.code || error.message) {
            case 'auth/wrong-password':
                setError({ field: 'password', message: 'Incorrect password' })
                break
            case 'auth/user-not-found':
                setError({ field: 'email', message: 'User not found' })
                break
            case 'auth/invalid-email':
                setError({ field: 'email', message: 'Invalid email address' })
                break
            case 'auth/invalid-credential':
                setError({ field: 'password', message: 'Incorrect password' })
                break
            default:
                setError({ field: 'general', message: error.message })
                console.warn('Unhandled error:', error)
                break
        }
    }

    return { loading, error, login }
}

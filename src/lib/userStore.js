import { create } from "zustand"
import { auth, db } from "./firebase"
import { getDoc, doc } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { devtools } from 'zustand/middleware'

export const useUserStore = create(devtools((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid) => {
        if (!uid) {
            return set({ currentUser: null, isLoading: false })
        }

        try {
            set({ isLoading: true })
            const docRef = doc(db, 'users', uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                set({ currentUser: docSnap.data() })
            } else {
                set({ currentUser: null })
            }

        } catch (error) {
            console.log(error)
            return set({ currentUser: null })
        } finally {
            set({ isLoading: false })
        }
    },
    logout: () => {
        try {
            signOut(auth)
            set({ currentUser: null, isLoading: false })
        } catch (error) {
            console.error(error)
        }
    }
})))
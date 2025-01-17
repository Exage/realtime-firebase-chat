import { create } from "zustand"
import { auth, db } from "./firebase"
import { getDoc, doc } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { useModals } from "./modalsStore"
import { useChatStore } from "./chatStore"
import { useChatsStore } from "./chatsStore"

export const useUserStore = create((set) => ({
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
    setUser: (currentUser) => set({ currentUser }),
    logout: () => {
        try {
            
            // Clear modals
            const modalsStore = useModals.getState()
            modalsStore.clearModals()

            // Clear chat
            const chatStore = useChatStore.getState()
            chatStore.clearChat()

            // Clear chat list
            const chatsStore = useChatsStore.getState()
            chatsStore.clearChats()

            signOut(auth)
            set({ currentUser: null, isLoading: false })

        } catch (error) {
            console.error(error)
        }
    }
}))
import { create } from "zustand"
import { devtools } from "zustand/middleware"

export const useChatsStore = create(devtools((set) => ({
    chats: null,
    isLoading: true,
    setChats: (chats) => set(state => ({...state, chats })),
    setLoading: (isLoading) => set(state => ({...state, isLoading })),
    clearChats: () => set({ chats: null, isLoading: true })
})))
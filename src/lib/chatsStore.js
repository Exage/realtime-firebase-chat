import { create } from "zustand"

export const useChatsStore = create((set) => ({
    chats: null,
    isLoading: true,
    setChats: (chats) => set(state => ({...state, chats })),
    setLoading: (isLoading) => set(state => ({...state, isLoading })),
    clearChats: () => set({ chats: null, isLoading: true })
}))
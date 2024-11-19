import { create } from "zustand"

export const useModals = create((set) => ({
    modals: {},
    openModal: (modalId) => set((state) => {
        return { modals: { ...state.modals, [modalId]: true } }
    }),
    closeModal: (modalId) => set((state) => {
        return { modals: { ...state.modals, [modalId]: false } }
    }),
    clearModals: () => set({ modals: {} })
})) 
import { create } from "zustand"

export const useResponseMenus = create((set) => ({
    sidebarOpened: false,
    detailsOpened: false,

    setSidebarOpened: (sidebarOpened) => set({ sidebarOpened }),
    setDetailsOpened: (detailsOpened) => set({ detailsOpened })
})) 
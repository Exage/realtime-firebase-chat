import { create } from "zustand"
import { useUserStore } from "./userStore"
import { devtools } from "zustand/middleware"

export const useChatStore = create(devtools((set) => ({
    chatId: null,
    users: null,
    type: null,
    groupData: null,
    lastMessageId: null,
    isCurrentUserBlocked: null,
    isReceiverBlocked: null,
    messages: null,
    setMessages: (messages) => set(state => ({ ...state, messages })),
    setLastMessageId: (lastMessageId) => set(state => ({ ...state, lastMessageId })),

    changeChat: (chatId, user, lastMessageId) => {
        const currentUser = useUserStore.getState().currentUser

        if (user.blocked.includes(currentUser.id)) {
            return set({
                chatId,
                users: null,
                type: 'single',
                groupData: null,
                lastMessageId: null,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false,
            })
        }

        if (currentUser.blocked.includes(user.id)) {
            return set({
                chatId,
                users: [user],
                type: 'single',
                groupData: null,
                lastMessageId: null,
                isCurrentUserBlocked: false,
                isReceiverBlocked: true,
            })
        }

        set({
            chatId,
            users: [user],
            type: 'single',
            groupData: null,
            lastMessageId,
            isCurrentUserBlocked: false,
            isReceiverBlocked: false,
        })
    },

    changeGroup: (chatId, users, lastMessageId, groupData) => {
        set({
            chatId,
            users,
            type: 'group',
            groupData,
            lastMessageId,
            isCurrentUserBlocked: false,
            isReceiverBlocked: false,
        })
    },

    changeBlock: () => {
        set(state => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }))
    }
})))
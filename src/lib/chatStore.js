import { create } from "zustand"

export const useChatStore = create((set) => ({
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

    changeChat: (chat) => {
        const { chatId, users, lastMessageId, isCurrentUserBlocked, isReceiverBlocked } = chat

        set({
            chatId,
            users,
            type: 'single',
            groupData: null,
            lastMessageId,
            isCurrentUserBlocked,
            isReceiverBlocked,
        })
    },

    changeGroup: (chat) => {

        const { chatId, users, lastMessageId, groupData } = chat

        set({
            chatId,
            users,
            type: 'group',
            groupData,
            lastMessageId,
        })
    },

    changeBlock: () => {
        set(state => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }))
    },

    clearChat: () => {
        set({
            chatId: null,
            users: null,
            type: null,
            groupData: null,
            lastMessageId: null,
            isCurrentUserBlocked: null,
            isReceiverBlocked: null,
            messages: null,
        })
    }
}))
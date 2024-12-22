import React from 'react'
import styles from './Result.module.scss'

import { useChatStore } from '@/lib/chatStore'
import { useResponseMenus } from '@/lib/responseMenus'

export const Result = ({ data, title, setShowResults, setSearch }) => {

    const { result, title: titleClass } = styles
    const { chatId: currentChatId, changeChat, changeGroup, setLoading } = useChatStore()
    const { setSidebarOpened } = useResponseMenus()

    const handleSelect = async () => {
        if (data.chatId !== currentChatId) {
            setLoading(true)

            if (data.type === 'single') {
                changeChat(data)
            } else if (data.type === 'group') {
                changeGroup(data)
            }
        }

        setShowResults(false)
        setSidebarOpened(false)
        setSearch('')
    }

    return (
        <div className={result} onClick={handleSelect}>
            <h3 className={titleClass}>
                {title}
            </h3>
        </div>
    )
}

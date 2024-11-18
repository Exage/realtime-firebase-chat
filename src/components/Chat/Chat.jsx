import React from 'react'
import classNames from 'classnames'
import './Chat.scss'
import { useChatStore } from '@/lib/chatStore'

import { Top } from './Top/Top'
import { Messages } from './Messages/Messages'
import { Bottom } from './Bottom/Bottom'

export const Chat = ({ details, showDetails }) => {

    const { chatId } = useChatStore()

    return (
        <div className={classNames('chat', { ['show-details']: chatId && details })}>
            {chatId && (
                <>
                    <Top showDetails={showDetails} />
                    <Messages />
                    <Bottom />
                </>
            )}
            {!chatId && (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    select a chat to start messaging
                </div>
            )}
        </div>
    )
}

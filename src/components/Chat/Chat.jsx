import React from 'react'
import classNames from 'classnames'
import './Chat.scss'
import { useChatStore } from '@/lib/chatStore'
import { useResponseMenus } from '@/lib/responseMenus'

import { Top } from './Top/Top'
import { Messages } from './Messages/Messages'
import { Bottom } from './Bottom/Bottom'
import { Button } from '../UI/Button/Button'

import chatlistIcon from '@/assets/icons/chatlist.svg'

export const Chat = ({ details, showDetails }) => {

    const { chatId } = useChatStore()
    const { setSidebarOpened } = useResponseMenus()

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
                <>
                    <div className='chat__placeholder chat__placeholder-desktop'>
                        select a chat to start messaging
                    </div>
                    <div className='chat__placeholder chat__placeholder-response'>
                        There is no active chat

                        <Button
                            icon={chatlistIcon}
                            filled={true}
                            className={['chat__placeholder-btn']}
                            onClick={() => setSidebarOpened(true)}
                        >
                            Open Chat List
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

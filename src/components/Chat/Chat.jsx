import React from 'react'
import './Chat.scss'

import { Top } from './Top/Top'
import { Messages } from './Messages/Messages'
import { Bottom } from './Bottom/Bottom'

export const Chat = () => {
    return (
        <div className='chat'>
            <Top />
            <Messages />
            <Bottom />
        </div>
    )
}

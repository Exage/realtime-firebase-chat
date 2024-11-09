import React from 'react'
import classNames from 'classnames'
import './Chat.scss'

import { Top } from './Top/Top'
import { Messages } from './Messages/Messages'
import { Bottom } from './Bottom/Bottom'

export const Chat = ({ details, showDetails }) => {
    return (
        <div className={classNames('chat', { ['show-details']: details })}>
            <Top showDetails={showDetails} />
            <Messages />
            <Bottom />
        </div>
    )
}

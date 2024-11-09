import React, { useEffect, useRef } from 'react'
import styles from './Messages.module.scss'

import { Message } from './Message/Message'

export const Messages = () => {
    
    const { messages } = styles

    const endRef = useRef(null)

    useEffect(() => {
        endRef.current?.scrollIntoView()
    })

    return (
        <div className={messages}>
            <Message />
            <Message />
            <Message isUser={true} />
            <Message isUser={true} />
            <Message isUser={true} />
            <Message />
            <Message isUser={true} />
            <div ref={endRef}></div>
        </div>
    )
}

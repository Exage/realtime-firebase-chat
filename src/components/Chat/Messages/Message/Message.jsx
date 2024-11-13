import React from 'react'
import classNames from 'classnames'
import styles from './Message.module.scss'

export const Message = ({ message, isUser=false }) => {

    const {
        messageClass,
        ["message__inner"]: messageInner,
        own,
        text,
        time
    } = styles

    return (
        <div className={classNames(messageClass, { [own]: isUser })}>
            <div className={messageInner}>
                <div className={text}>
                    {message.text}
                </div>
                <div className={time}>1 min ago</div>
            </div>
        </div>
    )
}

import React from 'react'
import classNames from 'classnames'
import styles from './Message.module.scss'

export const Message = ({ isUser=false }) => {

    const {
        message,
        ["message__inner"]: messageInner,
        own,
        text,
        time
    } = styles

    return (
        <div className={classNames(message, { [own]: isUser })}>
            <div className={messageInner}>
                <div className={text}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid culpa ipsa soluta quas molestiae autem iure modi, esse pariatur beatae ut, et dolores, vero doloremque quam dolorem ullam fuga voluptas.
                </div>
                <div className={time}>1 min ago</div>
            </div>
        </div>
    )
}

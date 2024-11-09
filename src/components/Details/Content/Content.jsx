import React from 'react'
import styles from './Content.module.scss'

import { Button } from '@/components/UI/Button/Button'

import mediaIcon from '@/assets/icons/photo-video.svg'
import slidersIcon from '@/assets/icons/sliders.svg'
import banIcon from '@/assets/icons/ban.svg'

export const Content = () => {

    const { content, block, btn, ban } = styles

    return (
        <div className={content}>
            <div className={block}>
                <Button icon={slidersIcon} iconGap={20} className={[btn]}>Chat settings</Button>
                <Button icon={mediaIcon} iconGap={20} className={[btn]}>Photos &amp; Video</Button>
            </div>
            <div className={block}>
                <Button icon={banIcon} iconGap={20} className={[btn, ban]}>Block user</Button>
            </div>
        </div>
    )
}

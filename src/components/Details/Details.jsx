import React from 'react'
import { ReactSVG } from 'react-svg'
import './Details.scss'

import { IconButton } from '../UI/IconButton/IconButton'
import xmark from '@/assets/icons/xmark.svg'
import info from '@/assets/icons/info.svg'

import { Top } from './Top/Top'
import { Content } from './Content/Content'

export const Details = ({ hideDetails }) => {
    return (
        <div className="details">

            <div className="details__head">
                <h1 className="details__head-title">
                    <ReactSVG src={info} className='icon' />
                    User info
                </h1>
                <IconButton icon={xmark} className={['details__head-icon']} onClick={hideDetails} />
            </div>

            <Top />
            <Content />
        </div>
    )
}

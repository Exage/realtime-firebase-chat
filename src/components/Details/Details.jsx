import React from 'react'
import { ReactSVG } from 'react-svg'
import './Details.scss'

import { useResponseMenus } from '@/lib/responseMenus'

import { IconButton } from '../UI/IconButton/IconButton'
import xmark from '@/assets/icons/xmark.svg'
import info from '@/assets/icons/info.svg'

import { Top } from './Top/Top'
import { Content } from './Content/Content'
import classNames from 'classnames'

export const Details = ({ details, hideDetails }) => {

    const { detailsOpened, setDetailsOpened } = useResponseMenus()

    return (
        <div 
            className={classNames("details__wrapper", { show: details }, { 'response-show': detailsOpened })}
            onClick={hideDetails}
        >
            <div 
                className="details"
                onClick={e => e.stopPropagation()}
            >

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
        </div>
    )
}

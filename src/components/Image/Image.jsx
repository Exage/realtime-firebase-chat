import React, { useState } from 'react'
import classNames from 'classnames'
import { Blurhash } from 'react-blurhash'

export const Image = ({ src, alt = '', hash = '', className = [], blurWidth = '100%', blurhHeight = '100%', ...props }) => {

    const [load, setLoad] = useState(true)

    const handleLoad = () => {
        console.log(load)
        setLoad(false)
    }

    return (
        <>
            {load && (
                <Blurhash
                    hash={hash}
                    style={{ width: blurWidth, height: blurhHeight }}
                />
            )}
            <img
                className={classNames(...className)}
                style={{ display: load ? 'none' : 'block' }}
                src={src}
                alt={alt}
                onLoad={handleLoad}
                {...props}
            />
        </>
    )
}

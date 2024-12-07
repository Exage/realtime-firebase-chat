import React, { useState } from 'react'
import classNames from 'classnames'
import { Blurhash } from 'react-blurhash'

export const Image = ({ src, alt = '', hash = '', className = [], blurWidth = '100%', blurhHeight = '100%', ...props }) => {

    const [load, setLoad] = useState(true)

    return (
        <>
            {load && (
                <Blurhash
                    hash={hash}
                    style={{ width: blurWidth, height: blurhHeight }}
                />
            )}
            {!load && (
                <img
                    className={classNames(...className)}
                    src=''
                    alt={alt}
                    onLoad={() => setLoad(false)}
                    {...props}
                />
            )}
        </>
    )
}

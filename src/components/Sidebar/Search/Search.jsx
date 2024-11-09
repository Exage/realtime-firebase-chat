import React, { useState } from 'react'
import styles from './Search.module.scss'

import { Input } from '@/components/UI/Input/Input'

export const Search = () => {
    
    const { search: searchClass } = styles
    const [search, setSearch] = useState('')
    
    return (
        <div className={searchClass}>
            <Input
                value={search} 
                onChange={e => setSearch(e.target.value)}

                placeholder="search"
            />
        </div>
    )
}

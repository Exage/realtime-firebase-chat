import React, { useState } from 'react'
import styles from './Search.module.scss'

import { Input } from '../../UI/Input/Input'

export const Search = () => {
    
    const [search, setSearch] = useState('')
    
    return (
        <div className={styles.search}>
            <Input
                value={search} 
                onChange={e => setSearch(e.target.value)}

                placeholder="search"
            />
        </div>
    )
}

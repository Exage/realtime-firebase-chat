import React, { useEffect, useState, useMemo } from 'react'
import styles from './Search.module.scss'
import { ReactSVG } from 'react-svg'

import { Input } from '@/components/UI/Input/Input'
import { useChatsStore } from '@/lib/chatsStore'
import { Result } from './Result/Result'

import searchIcon from '@/assets/icons/search.svg'

export const Search = () => {
    const { 
        search: searchClass,
        input,
        ['input__wrapper']: inputWrapper, 
        ['input__icon']: inputIcon, 
        ['results__wrapper']: resultsWrapper, 
        results: resultsClass 
    } = styles
    const { chats } = useChatsStore()
    const [search, setSearch] = useState('')
    const [showResults, setShowResults] = useState(false)

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const filteredResults = useMemo(() => {
        if (!chats || !search.trim()) return []

        return chats.filter(item => {
            const searchQuery = search.toLowerCase()

            const groupTitle = item?.groupData.title?.toLowerCase() || ''

            if (groupTitle) {
                return groupTitle.includes(searchQuery)
            }

            const userName = item?.users[0].name?.toLowerCase() || ''

            if (userName) {
                return userName.includes(searchQuery)
            }
        })
    }, [search])

    useEffect(() => {
        setShowResults(search.trim().length > 0 && filteredResults.length > 0)
    }, [search, filteredResults])

    return (
        <div className={searchClass}>
            <div className={inputWrapper}>
                <Input
                    value={search}
                    onChange={handleChange}
                    placeholder="search"
                    className={[input]}
                />
                <ReactSVG className={inputIcon} src={searchIcon} />
            </div>

            {showResults && (
                <div className={resultsWrapper}>
                    <div className={resultsClass}>
                        {filteredResults.slice(0, 10).map((item, index) => (
                            <Result
                                key={index}
                                data={item}
                                title={item?.groupData.title || item?.users[0]?.name}
                                setShowResults={setShowResults}
                                setSearch={setSearch}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

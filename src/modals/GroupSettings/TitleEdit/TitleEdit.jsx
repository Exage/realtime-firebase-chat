import React, { useEffect } from 'react'
import modules from './TitleEdit.module.scss'

import { useForm } from 'react-hook-form'

import { FormValidation } from '@/validation/formValidation'

import { Input } from '@/components/UI/Input/Input'
import { FormWrapper } from '../FormWrapper/FormWrapper'

import { useChangeGroupData } from '@/hooks/useChangeGroupData'

export const TitleEdit = ({ setTitleDisplayed, setEditing, resetData }) => {

    const { input } = modules

    const { changeGroupTitle, loading, error } = useChangeGroupData()

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: 'onChange'
    })

    const title = watch('title')

    useEffect(() => {
        setTitleDisplayed(title ? title.trim() : '')
    }, [title])

    useEffect(() => {
        if (error && error.field) {
            setError(error.field, { type: 'server', message: error.message })
        }
    }, [error])

    const handleCancel = (e) => {
        e.preventDefault()
        setEditing(false)
        resetData()
    }
    
    const handleSave = async () => {
        await changeGroupTitle(title)
    }

    return (
        <FormWrapper
            title='Name Edit'
            errors={errors.title}
            
            saveText='Save new title'
            handleSave={handleSubmit(handleSave)}
            handleCancel={handleCancel}
        
            loading={loading}
        >
            <Input
                className={[input, { invalid: errors.title }]}
                {...register('title', FormValidation.GroupTitle)}
                placeholder='new title'
                maxLength={50}
            />
        </FormWrapper>
    )
}

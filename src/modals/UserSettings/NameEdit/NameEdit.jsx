import React, { useEffect } from 'react'
import modules from './NameEdit.module.scss'

import { useForm } from 'react-hook-form'

import { FormValidation } from '@/validation/formValidation'

import { Input } from '@/components/UI/Input/Input'
import { FormWrapper } from '../FormWrapper/FormWrapper'

import { useUpdateUser } from '@/hooks/useUpdateUser'

export const NameEdit = ({ setNameDisplayed, editing, setEditing, resetData }) => {

    const { input } = modules

    const { updateName, loading, error } = useUpdateUser()

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: 'onChange'
    })

    const name = watch('name')

    useEffect(() => {
        setNameDisplayed(name ? name.trim() : '')
    }, [name])

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
        await updateName(name)
    }

    return (
        <FormWrapper
            title='Name Edit'
            errors={errors.name}
            
            saveText='Save new name'
            handleSave={handleSubmit(handleSave)}
            handleCancel={handleCancel}
        
            loading={loading}
        >
            <Input
                className={[input, { invalid: errors.name }]}
                {...register('name', FormValidation.Name)}
                placeholder='new name'
                maxLength={50}
            />
        </FormWrapper>
    )
}

import React, { useEffect } from 'react'
import modules from './NameEdit.module.scss'

import { useForm } from 'react-hook-form'

import { FormValidation } from '@/validation/formValidation'

import { Input } from '@/components/UI/Input/Input'
import { FormWrapper } from '../FormWrapper/FormWrapper'

export const NameEdit = ({ setNameDisplayed, editing, setEditing, resetData }) => {

    const { input } = modules

    const { register, formState: { errors }, watch } = useForm({
        mode: 'onChange'
    })

    const name = watch('name')

    useEffect(() => {
        setNameDisplayed(name ? name.trim() : '')
    }, [name])

    const handleCancel = (e) => {
        e.preventDefault()
        setEditing(false)
        resetData()
    }

    return (
        <FormWrapper
            title='Name Edit'
            errors={errors.name}
            
            saveText='Save new name'
            handleCancel={handleCancel}
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

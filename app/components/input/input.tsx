import clsx from "clsx"
import React from "react"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps {
    label: string,
    type?: string,
    placeHolder?: string,
    id: string,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean
}

const Input: React.FC<InputProps> = ({
    label,
    type,
    placeHolder,
    id,
    required,
    register,
    errors,
    disabled
}) => {
    return (
        <div className="mt-6">
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 mb-1">
                {label}
            </label>
            <input  className={clsx("form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 foucus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6", 
                errors[id] && "focus:ring-rose-500", 
                disabled && "opacity-50 cursor-default")} 
                type={type} id={id} placeholder={placeHolder} 
                autoComplete={id} {...register(id, {required})} disabled={disabled} required={required}/>
        </div>
    )
}

export default Input;
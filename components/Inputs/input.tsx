"use client"
import { CurrencyDollarIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useState } from 'react'
import {UseFormRegister, FieldValues, FieldErrors} from 'react-hook-form'

type InputFieldProps={
    id: string;
    label: string;
    type?: string;
    changeType?:string;
    disabled?: boolean;
    formatPrice?: boolean;
    eye?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>
    errors : FieldErrors
}

export default function InputField({
    id,label,type = 'text',changeType = "text",eye,
    disabled,formatPrice,required,register,errors
}: InputFieldProps) {

    const [eyeClick, setEyeClick] = useState(true)
    const [Type,setType] = useState(type);

    const toggleEye = useCallback(() => {
        setEyeClick(!eyeClick);
        if (eyeClick) {
          setType(changeType);
        } else {
          setType(type);
        }
      }, [setType, eyeClick,changeType,type]);

      
  return (
    <div className="w-full relative">
        {
            formatPrice && (
                <CurrencyDollarIcon className="w-[1.2rem] h-[1.2rem] text-neutral-500 absolute top-7 left-2"/>
            )
        }
        {
            eye && (
                <button onClick={toggleEye}>
                {eyeClick ? (
                    <EyeIcon className="w-[1.2rem] h-[1.2rem] text-neutral-500 absolute top-8 right-4" />
                ) : (
                    <EyeSlashIcon className="w-[1.2rem] h-[1.2rem] text-neutral-500 absolute top-8 right-4" />
                )}
                </button>
            )
        }
        <input           
        id={id}
        disabled={disabled}
        {...register(id, {required})}
        placeholder=" "
        type={Type}
        className={`
            peer
            w-full
            p-4
            pt-6
            font-light
            bg-gray-100
            dark:bg-gray-950
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            mt-2

            ${formatPrice ? 'pl-9' : 'pl-4' }
            ${errors[id] ? 'border-red-600' : 'border-neutral-400 dark:border-neutral-700' }
            ${errors[id] ? 'focus:border-red-600' : 'focus:border-gray-800 focus:dark:border-gray-300' }

        `}

        />

        <label className={`
        absolute
        text-sm
        duration-150 transform -translate-y-3 top-7 z-10 origin-[0] 

        ${formatPrice ? 'left-9' : 'left-4'}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-50
        peer-focus:-translate-y-4

        ${errors[id] ? 'text-rose-700' : 'text-gray-800 dark:text-gray-200'}
        `}
        >{label}
        </label>
    </div>
  )
}

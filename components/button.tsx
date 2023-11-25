"use client"
import Image from 'next/image';
import React from 'react'
import { IconType } from 'react-icons';

type ButtonProps = {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

export default function Button({
    label,onClick,disabled,outline,small,icon:Icon
}: ButtonProps) {
  return (
    
    <button 
    onClick={onClick}
    disabled={disabled}
    className={`relative disable:opacity-70 disabled:cursor-not-allowed rounded-lg hover-opacity-80
    transition w-full dark:text-white
    ${outline ? 'bg-white dark:bg-gray-950 hover:bg-gray-200 hover:dark:bg-gray-800' : 'bg-rose-600 hover:bg-rose-700'}
    ${outline ? 'border-gray-950 dark:border-white' : 'bg-rose-600'}
    ${outline ? 'border-[1px]' : 'bg-rose-600'}
    ${outline ? 'text-black dark:text-white' : 'dark:text-black text-white'}

    ${small ? 'py-1' : 'py-3'}
    ${small ? 'text-sm' : 'text-md'}
    ${small ? 'font-light' : 'font-semibold'}
    `}>
        <div className="flex items-center justify-center gap-3">
          {
            !disabled ? (
                Icon && (
                  <Icon className="w-[1rem] h-[1rem]" />
              )
            ) : (
              <Image src="/images/spinner1.gif" alt="loading" width={`${!small ? "30": "20"}`} height={`${!small ? "30": "20"}`} />
            )
          }
        
        {label}
        </div>
    </button>
  )
}

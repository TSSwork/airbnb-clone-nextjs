"use client"
import React, { ReactElement } from 'react'

type CategoryInputProps = {
    icon: ReactElement;
    label: String;
    selected: boolean;
    onClick: (value:String) => void;
}

export default function CategoryInput({
    icon, label, selected, onClick
}:CategoryInputProps) {
  return (
    <div
    onClick={() => onClick(label)}
    className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black hover:dark:border-white
    transition cursor-pointer 
    ${selected ? 'border-rose-500 bg-rose-500 text-white':'border-neutral-500'}

    `}
    >
        <div className="text-2xl">{icon}</div>
        <div>{label}</div>
    </div>
 )
}

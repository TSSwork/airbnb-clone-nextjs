"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../button';
import { MoonIcon } from '@heroicons/react/20/solid';

type ModalProps = {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;

    title?: string;
    body?:React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

export default function Modal({
    isOpen,onClose,onSubmit,title,body,footer,actionLabel,disabled,secondaryAction,secondaryActionLabel
} : ModalProps) {
    const [ showModal, setShowModal ] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    },[isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModal(false);
        setTimeout(() => {
            onClose();
        },300);
    },[disabled,onClose])

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    },[onSubmit,disabled]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    },[disabled,secondaryAction]);

    if (!isOpen) {
        return null;
    }


  return (
    <div className="z-20 flex items-center justify-center overflow-x-hidden 
    overflow-y-auto fixed inset-0 focus:outline-none focus:shadow-md
    dark:bg-gray-100/10 bg-gray-800/80 border-[2px] border-gray-300/80 dark:border-gray-800 bg-opacity-90 backdrop-blur-lg">

        <div className="relative w-full md:w-4/6 lg:3/6 xl:w-2/5
        my-6 mx-auto h-full lg:h-auto md:h-auto">
            {/* CONTENT */}
            <div className={` mt-[6rem] mx-[3rem] md:mt-[5rem] md:mx-0 h-full
            ${ showModal ? 'translate-y-0' : 'translate-y-full'}
            ${ showModal ? 'opacity-100' : 'opacity-0'}
            duration-300
            `}>
            
                <div 
                className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shodow-lg relative 
                flex flex-col w-full bg-white dark:bg-black outline-none">
                    {/* HEADER  1:12:46*/}
                    <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                        <div className="text-lg font-semibold">
                            {title}
                        </div>
                        <button onClick={handleClose}
                        className="p-1 border-0 hover:opacity-70 transition absolute right-9 rounded-full bg-red-400 text-red-600">
                            <XMarkIcon className="w-[1rem] h-[1rem]" />
                        </button>
                    </div>
                    {/* BODY */}
                    <div className="relative p-6 flex-auto">
                    {body}
                    </div>
                    {/* FOOTER */}
                    <div className="flex flex-col gap-2 p-6">
                        <div className="flex flex-row items-center gap-4 w-full">
                            { secondaryAction && secondaryActionLabel && (
                            <Button outline disabled={disabled} label={secondaryActionLabel} onClick={handleSecondaryAction}  />
                            )}
                            <Button disabled={disabled} label={actionLabel} onClick={handleSubmit}  />
                        </div>
                        {footer}
                    </div>
                </div>
                
            </div>

        </div>
    </div>
  )
}

"use client"

import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useState } from 'react'
import Avatar from '../avatar'
import MenuItems from './menuitems';
import { motion } from 'framer-motion'
import userRegisterModal from '@/hooks/useRegisterModal';
import userLoginModal from '@/hooks/useLoginModal';
import { useUser } from '@/context/usercontext';
import { signOut } from 'next-auth/react';
import useRentModal from '@/hooks/useRentModal';
import { useRouter } from 'next/navigation';

export default function UserMenu() {

    const {getUser} = useUser();
    const router = useRouter();

    const registerModal = userRegisterModal();
    const loginModal = userLoginModal();
    const rentModal = useRentModal();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value: boolean) => !value);
    }, [])

    const onRent = useCallback(() =>{
        if (!getUser) {
            return loginModal.onOpen()
        }
        rentModal.onOpen()
    },[loginModal,getUser,rentModal])


  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3 ">
            <div onClick={onRent} 
            className="hidden md:block text-sm font-semibold py-3 px-4 
            rounded-full hover:bg-neutral-300 hover:dark:bg-gray-700 transition-all cursor-pointer">
                Airbnb your home
            </div>
            <div onClick={toggleOpen}
            className="p-4 md:py-2 md:px-2 border-[1px] border-gray-200 dark:border-black
            flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shodow-sm
            hover:scale-105 active:scale-95 hover:shadow-md dark:shadow-gray-900 
            transition-all">
                <Bars3BottomLeftIcon className="w-[1.4rem] h-[1.4rem]"/>
                <div className="hidden md:block">
                    <Avatar src={getUser?.image}/>
                </div>
            </div>
        </div>

        { isOpen && (
            <motion.div 
            
            initial = {{x: 0, y: -100, opacity: 0}}
            animate = { isOpen ? {x: 0, y: 0, opacity: 1} : {x: 0, y: 100, opacity: 1}}
            
            className="absolute rounded-xl shodow-md w-[40vw] md:w-3/4 border-[2px] border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950
            overflow-hidden right-0 md:top-12 top-16 text-sm">
                <div className="flex flex-col cursor-pointer">
                {
                !getUser ? (
                    <React.Fragment>
                        <MenuItems
                            onClick={() => {
                            loginModal.onOpen();
                            toggleOpen();
                            }}
                            label="Login"
                        />
                        <MenuItems
                            onClick={() => {
                            registerModal.onOpen();
                            toggleOpen();
                            }}
                            label="Sign Up"
                        />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <MenuItems onClick={() => router.push('/trips')} label="My trips" />
                        <MenuItems onClick={() => router.push('/favourites')} label="My favorites" />
                        <MenuItems onClick={() => router.push('/reservations')} label="My reservations" />
                        <MenuItems onClick={() => router.push('/properties')} label="My Properties" />
                        <MenuItems onClick={() => {onRent()}} label="Airbnb my home" />
                        <MenuItems onClick={() => signOut()} label="Logout" />
                    </React.Fragment>
                )
                }

                </div>
            </motion.div>
        )}
    </div>
  )
}

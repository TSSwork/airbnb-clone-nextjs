"use client"

import useFavorites from '@/hooks/useFavorite';
import { SafeUser } from '@/types';
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

type HeartButtonProps = {
    listingId: string;
    currentUser?: SafeUser | null;
}

export default function HeartButton({
    listingId,
    currentUser
}: HeartButtonProps) {

    const { hasFavorited, toggleFavorite } =  useFavorites({listingId, currentUser});
  
    return (
    <div onClick={toggleFavorite}
    className="relative hover:opacity-80 transition cursor-pointer p-2">
        <AiOutlineHeart size={28} className="text-white absolute -top-[2px] -right-[2px]" />
        <AiFillHeart size={28} 
        className={`
            -top-[2px] -right-[2px] absolute
            ${hasFavorited ? "text-rose-500 " : "text-gray-100/80 "}`
        }/>
    </div>
  )
}

"use client"
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import userLoginModal from "./useLoginModal";
import { useMemo, useCallback } from 'react'
import axios from "axios";
import toast from "react-hot-toast";

type IuseFavorites = {
    listingId: string;
    currentUser?: SafeUser | null;

}

const useFavorites = ({
    listingId,
    currentUser
}: IuseFavorites) =>{
    const router = useRouter();
    const loginModal = userLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    },[currentUser, listingId]);

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }
        try{
            let request;

            if (hasFavorited) {
                request = () => axios.delete(`/api/favourites/${listingId}`);
            }else{
                request = () => axios.post(`/api/favourites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success('Success')
        
        }catch (error) {
            toast.error("Something Went Wrong")
            console.error(error)
        }
    },[currentUser, hasFavorited, listingId, loginModal, router]);

    return{
        hasFavorited,
        toggleFavorite
    }
    
}

export default useFavorites;
import useCountries from '@/hooks/useCountries';
import { SafeUser } from '@/types';
import React from 'react'
import ModalHeading from '../modals/modalheading';
import Image from 'next/image';
import HeartButton from '../heartbutton';

type ListingHeadProps = {
    title: string;
    imgSrc: string;
    locationValue: string;
    id: string;
    currentUser?: SafeUser | null;
}

export default function ListingHead({
    title,
    imgSrc,
    locationValue,
    id,
    currentUser,
}: ListingHeadProps) {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);
  return (
    <>
    <ModalHeading 
    title={title}
    subtitle={`${location?.region}, ${location?.label}`}
    />
    <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image src={imgSrc} alt={`${title}, cover image`} width="5000" height="5000" />
        <div className="absolute top-5 right-5">
            <HeartButton 
            listingId={id} 
            currentUser={currentUser}/>
        </div>
    </div>
    </>
  )
}

import useCountries from '@/hooks/useCountries';
import useSearchModal from '@/hooks/useSearchModal'
import {MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react'

export default function Search() {
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const { getByValue } = useCountries();

    const locationValue = params?.get('locatinValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const guestCount = params?.get('guestCount');

    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue as string)?.label;
        }
        return "Anywhere";
    },[locationValue,getByValue]);

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            let diff = differenceInDays(end, start);

           if (diff === 0){
            diff = 1;
           }

           return `${diff} days`
        }
        return "Any days";
    },[startDate, endDate]);

    const guestLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} Guests`
        }
        return "Any Guests";
    },[guestCount]) 

  return (
    <div onClick={searchModal.onOpen}
    className="border-[1px] dark:border-black w-full md:w-auto py-2 rounded-full 
    shadow-sm hover:shadow-md dark:hover:shadow-gray-900 cursor-pointer transistion">

        <div className="flex flex-row items-center justify-between">
            <div className="text-sm font-semibold px-6">
                {locationLabel}
            </div>
            <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                {durationLabel}
            </div>
            <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                <div className="hidden sm:block">{guestLabel}</div>
                <div className="p-2 bg-rose-500 rounded-full hover:bg-rose-700 text-white">
                    <MagnifyingGlassIcon className="w-[1.4rem] h-[1.4rem]"/>
                </div>
            </div>
        </div>
    </div>
  )
}

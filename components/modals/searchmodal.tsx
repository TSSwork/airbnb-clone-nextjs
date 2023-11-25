"use client"
import useSearchModal from '@/hooks/useSearchModal'
import React, { useCallback, useMemo, useState } from 'react'
import Modal from './modals';
import { useRouter, useSearchParams } from 'next/navigation';
import { Range } from 'react-date-range';
import CountrySelect, { CountrySelectValue } from '../countryselect';
import dynamic from 'next/dynamic';
import  qs from 'query-string';
import { formatISO } from 'date-fns';
import ModalHeading from './modalheading';
import Calendar from '../Inputs/calendar';
import Counter from '../Inputs/counter';

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

export default function SearchModal() {
    const searchModal = useSearchModal();
    const router = useRouter();
    const params = useSearchParams();

    const [location, setLoacation] = useState<CountrySelectValue>()
    const [step,setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setbathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selections',
    })
    const Map = useMemo(() => dynamic(() => import('../map'  ), {
        ssr: false,
    }),[])

    const onBack = useCallback(() => {
        setStep((value) => value-1)
    },[]);
    const onNext = useCallback(() => {
        setStep((value) => value+1)
    },[]);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO){
            return onNext();
        }
        let currentQuery = {};

        if (params){
            currentQuery = qs.parse(params.toString());
        }
        const updateQuery: any = {
            ...currentQuery,
            locatinValue: location?.value,
            guestCount: guestCount,
            roomCount: roomCount,
            bathroomCount: bathroomCount,
        }

            if (dateRange.startDate){
                updateQuery.startDate = formatISO(dateRange.startDate);
                
            if (dateRange.endDate){
                updateQuery.endDate = formatISO(dateRange.endDate);
            }
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updateQuery,
        },{
            skipNull: true,
        })

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    },[onNext,step,params,location,guestCount,roomCount,bathroomCount,dateRange,router,searchModal]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO){
            return 'Search'
        }
        return 'Next'
    },[step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION){
            return undefined;
        }
        return 'Back';
    },[step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <ModalHeading
            title="Where do you wann go?"
            subtitle="FInd the perfect location for you"
            />
            <CountrySelect 
            value={location}
            onChange={(value) => {
                setLoacation(value as CountrySelectValue)
            }}

            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (step === STEPS.DATE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <ModalHeading
                title="When do you want to stay?"
                subtitle="Pick the best date for you"
                />
                <Calendar
                value={dateRange}
                onChange={(value) =>setDateRange(value.selections)}
                />
            </div>
        )
    }

    if (step === STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <ModalHeading 
                title="More information"
                subtitle="Find your perfect place!"
                />
                <Counter 
                title="Guests"
                subtitle="How many guests are coming?"
                value={guestCount}
                onChange={(value) => setGuestCount(value)}
                />
                <Counter 
                title="Rooms"
                subtitle="How many rroms do you need?"
                value={roomCount}
                onChange={(value) => setGuestCount(value)}
                />
                <Counter 
                title="Bathrooms"
                subtitle="How many bathrooms do you need?"
                value={bathroomCount}
                onChange={(value) => setGuestCount(value)}
                />
            </div>
        )
    }

  return (
    <div>
        <Modal 
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title="Filters"
        secondaryAction={step === STEPS.LOCATION ? undefined: onBack}
        secondaryActionLabel={secondaryActionLabel}
        actionLabel={actionLabel}
        body={bodyContent}
        />
    </div>
  )
}

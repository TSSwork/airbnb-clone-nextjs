"use client"

import useCountries from '@/hooks/useCountries';
import { SafeListing, SafeReservation, SafeUser } from '@/types';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'
import HeartButton from '../heartbutton';
import Button from '../button';

type ListingCardProps = {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

export default function ListingCard({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser
}: ListingCardProps) {

  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locatinValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId);
  },[disabled, actionId, onAction]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  },[reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation){
      return null;
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`

  },[reservation])

  return (
    <div onClick={() => router.push(`/listings/${data.id}`)} 
    className="col-span-1 cursor-pointer group ">
      <div className="p-3 flex flex-col gap-2 w-full bg-gray-200/80 dark:bg-gray-800/80 rounded-xl">
        <div className="aspect-squre w-full relative overflow-hidden rounded-xl">
          <Image 
          width={1000}
          height={3000}
          src={data.imgSrc} 
          alt={`${data.title + 'listing'}`} 
          className="object-cover h-full w-full group-hover:scale-110 transition"/>
          <div>
            <div className="absolute top-3 right-3">
              <HeartButton 
              listingId={data.id}
              currentUser={currentUser}
              />
            </div>
          </div>
        </div>
        <div className="font-semibold text-lg ">
            {location?.region}, {location?.label}
          </div>
          <div className="font-light text-neutral-500">
              {reservationDate || data.category}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">
              $ {price}
            </div>
            <div>
              {!reservation && (
                <div className="font-light">night</div>
              )}
            </div>
          </div>
          <div>
            {onAction && actionLabel && (
              <Button 
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}

              />
            )}
          </div>
      </div>

    </div>
  )
}

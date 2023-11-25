"use client"
import React from 'react'
import { Range } from 'react-date-range';
import Calendar from '../Inputs/calendar';
import Button from '../button';


type ListingReservationsProps = {
    price: number;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    dateRange: Range;
    onSubmit: () => void;
    disabledDates: Date[];
    disable: boolean;
}

export default function ListingReservations({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabledDates,
    disable
}:ListingReservationsProps) {
  return (
    <div className="rounded-xl bg-gray-200/80 dark:bg-gray-800/80 
    border-[1px] border-neutral-300 dark:border-neutral-900 
    overflow-hidden p-3">
        <div className="flex flex-row items-center gap-1 p-4 ">
            <div className="text-2xl font-semibold">
                $ {price}
            </div>
            <div className="font-light text-neutral-500">
                night
            </div>
        </div>
        <Calendar 
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
        />
        <hr />
        <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
            <div>Total</div>
            <div>$ {totalPrice}</div>
        </div>
        <div className="px-4 py-2">
            <Button 
            disabled={disable}
            label="Reserve"
            onClick={onSubmit}
            />
        </div>

    </div>
  )
}

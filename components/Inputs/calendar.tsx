"use client"
import React from 'react'
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type CalendarProps = {
    value: Range;
    disabledDates?: Date[];
    onChange: (value: RangeKeyDict) => void;
}

export default function Calendar({
    value,
    disabledDates,
    onChange
}: CalendarProps) {
  return (
    <DateRange
        rangeColors={["#ff005d"]}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={disabledDates} 

    />
  )
}

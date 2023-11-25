"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import React, { ReactElement, useCallback } from 'react'

type CategoryBoxProps = {
    description: string;
    icon : ReactElement;
    label: string;
    selected?: boolean;
}

export default function CategoryBox({
    label,icon,description,selected
}:CategoryBoxProps) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params){
      currentQuery = qs.parse(params.toString());
    }
    const updateQuery: any = {
      ...currentQuery,
      category: label
    }

    if(params?.get('category') === label){
      delete updateQuery.category
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updateQuery
    }, {skipNull:true}  
    )

    router.push(url);
  },[params, label,router])

  return (
    <div onClick={handleClick}
    className={`flex flex-col items-center justify-center gap-2 px-3 border-b-2
    transition cursor-pointer  hover:border-rose-500 hover:text-rose-500
    ${selected ? 'border-b-rose-600 text-rose-600':'border-transparent'}
    `}>
      <div className="text-xl ">{icon}</div>
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

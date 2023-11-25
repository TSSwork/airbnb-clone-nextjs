"use client"
import EmptyState from '@/components/emptystate';
import React, { useEffect } from 'react'

type ErrorStateProps = {
    error: Error;
}

export default function ErrorState({
    error,
}: ErrorStateProps) {

    useEffect(() => {
        console.log(error)
    },[error])

  return (
    <div>
        <EmptyState 
        title="Something went Wrong"
        subtitle="Please try again in minute" />
    </div>
  )
}

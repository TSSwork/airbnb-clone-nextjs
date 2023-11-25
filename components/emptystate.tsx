"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import ModalHeading from './modals/modalheading';
import Button from './button';

type EmptyStateProps = {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

export default function EmptyState({
    title = "No exact matches",subtitle="Try Changing Filters",showReset
}: EmptyStateProps) {
    const router = useRouter();
  return (
    <div className="
    h-[60vh]
    flex
    flex-col
    gap-2
    justify-center
    items-center">
        <ModalHeading 
        center
        title={title}
        subtitle={subtitle}
        />
        <div className= "w-48 mt-4">
            { showReset && (
                <Button 
                    outline
                    label="Remove all filters"
                    onClick={() => router.push('/')}
                />
            )}
        </div>
    </div>
  )
}

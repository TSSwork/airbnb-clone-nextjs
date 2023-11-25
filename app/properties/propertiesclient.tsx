"use client"
import ListingCard from '@/components/Listings/listingcard';
import Container from '@/components/container';
import ModalHeading from '@/components/modals/modalheading';
import { SafeListing, SafeUser } from '@/types'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';

type PropertiesClientProps = {
    listings: SafeListing[],
    currentUser?: SafeUser | null;
}

export default function PropertiesClient({
    listings,
    currentUser
  }: PropertiesClientProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success("Property Deleted")
            router.refresh();
        })
        .catch((error) => {
            toast.error("Failed to delete property")
        })
        .finally(() => {
            setDeletingId('');
        })
    },[router])

  return (
    <Container>
        <ModalHeading 
        title="Properties"
        subtitle="Here you can see all your properties"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing) => (
                <ListingCard key={listing.id} 
                data={listing}
                actionId = {listing.id}
                onAction={onCancel}
                disabled={deletingId === listing.id}
                actionLabel="Delete property"
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container> 
  )
}

import getCurrentUser from '@/actions/getCurrentUser';
import getListingById from '@/actions/getListingById';
import EmptyState from '@/components/emptystate';
import React from 'react'
import ListingClient from './listingclient';
import getReservations from '@/actions/getReservations';

type Iparams = {
    listingid? : string;
}

export default async function ListingsPage({
    params
}: {params: Iparams}) {
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser();
    const reservations = await getReservations(params);
    if (!listing) {
        return (
            <EmptyState />
        )
    }
  return (
    <div>
        <ListingClient 
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
        />
    </div>
  )
}

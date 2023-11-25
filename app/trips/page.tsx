import getCurrentUser from '@/actions/getCurrentUser';
import getReservations from '@/actions/getReservations';
import EmptyState from '@/components/emptystate';
import React from 'react'
import TripsClient from './tripsclient';

export default async function TripsPage() {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
            title="Unathorized"
            subtitle="please login" />
        )
    }

    const reservation = await getReservations({
        userId: currentUser.id
    });

    if (reservation.length === 0) {
        return (
            <EmptyState
            title="No trips found"
            subtitle="Looks like you havent reserved any trips" />
        )
    }

  return (
    <div>
        <TripsClient 
        reservations={reservation}
        currentUser={currentUser}
        />
    </div>
  )
}

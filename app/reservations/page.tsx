import getCurrentUser from '@/actions/getCurrentUser';
import getReservations from '@/actions/getReservations';
import EmptyState from '@/components/emptystate';
import React from 'react'
import ReservationClient from './reservationclient';

export const revalidate = 2;

export default async function ReservationsPage() {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <EmptyState
            title="Unathorized"
            subtitle="please login" />
        )
    }

    const reservation = await getReservations({
        authorId: currentUser.id
    })

    if (reservation.length === 0) {
        return (
            <EmptyState
            title="No Reservations found"
            subtitle="No one made any Reservations in your listings" />
        )
    }

  return (
    <div>
        <ReservationClient 
        reservations={reservation}
        currentUser={currentUser}
        />
    </div> 
  )
}

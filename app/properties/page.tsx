import getCurrentUser from '@/actions/getCurrentUser';
import getListings from '@/actions/getListings';
import EmptyState from '@/components/emptystate';
import React from 'react'
import PropertiesClient from './propertiesclient';

export const revalidate = 2;

export default async function PropertiesPage() {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
            title="Unathorized"
            subtitle="please login" />
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    });

    if (!listings || listings.length === 0) {
        return (
            <EmptyState
            title="No properties found"
            subtitle="Looks like you havent add any properties" />
        )
    }

  return (
    <div>
        <PropertiesClient 
        listings={listings}
        currentUser={currentUser}
        />
    </div>
  )
}

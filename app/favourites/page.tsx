import getCurrentUser from '@/actions/getCurrentUser';
import getFavoriteListings from '@/actions/getFavoriteListings';
import EmptyState from '@/components/emptystate';
import React from 'react'
import FavoriteClient from './favoriteclient';

export default async function FavouritesPage() {
    const currentUser = await getCurrentUser(); 
    if(!currentUser){
        return (
            <EmptyState 
            title='Unauthorized'
            subtitle='Please login first.'
            />
        )
    }

    const favoriteListing = await getFavoriteListings();

    if(favoriteListing.length === 0){
        return (
            <EmptyState 
            title='No favourites found'
            subtitle='Looks like you have no favourites'
            />
        )
    }

  return (
    <div>
        <FavoriteClient
        listings={favoriteListing}
        currentUser={currentUser} />
    </div>
  )
}

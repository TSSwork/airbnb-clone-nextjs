import ListingCard from '@/components/Listings/listingcard';
import Container from '@/components/container';
import ModalHeading from '@/components/modals/modalheading';
import { SafeListing, SafeUser } from '@/types'
import React from 'react'

type FavoriteClientProps = {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}
export default function FavoriteClient({
    listings,
    currentUser,
}: FavoriteClientProps) {
  return (
    <Container>
        <ModalHeading 
        title="Favourites"
        subtitle="List of Places yu have favourited"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {
            listings.map((listing:any) => {
                return (
                    <ListingCard
                    currentUser={currentUser}
                    key={listing.id}
                    data={listing}
                    />
                )
            })
        }
        </div>
    </Container>
  )
}


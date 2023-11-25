import getCurrentUser from '@/actions/getCurrentUser';
import getListings, { IListingParams } from '@/actions/getListings';
import ListingCard from '@/components/Listings/listingcard';
import Container from '@/components/container'
import EmptyState from '@/components/emptystate';
import { Listing } from '@prisma/client';

type HomeProps = {
  searchParams: IListingParams
} 

export default async function Home({
  searchParams
}: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (!listings || listings.length === 0) {
    return(
      <EmptyState showReset  />
    )
  }

  return (
    <Container> 
      <div className="py-24 grid 
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8">
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

import prisma from "@/libs/prismadb";

export type IListingParams = {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings(
    params: IListingParams
) {
    try {
        const {
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            category
        } = params;

        let query:any = {}

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            };
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount,
            };
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount,
            };
        }

        if (locationValue){
            query.locatinValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservation: {
                    some: {
                        OR: [
                           {
                            endDate: { gte: startDate},
                            startDate: { lte: endDate}
                           },
                           {
                            endDate: { gte: endDate},
                            startDate: { lte: endDate}
                           } 
                        ]
                    }
                }
            }
        }


        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });
 
        const SafeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return SafeListings;

    }catch (error:any) {
        console.error(error);
        //throw new Error(error);
    }
}
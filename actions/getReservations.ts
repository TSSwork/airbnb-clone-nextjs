import prisma from "@/libs/prismadb";

type Iparams = {
    listingid?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(
    params: Iparams
) {

    try{
        const { listingid, userId, authorId } = params;

        const query: any = {};

        if (listingid) {
            query.listingId = listingid;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.listing = {userId: authorId};
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const SafeReservations = reservations.map(
            (reservation) => ({
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.listing,
                    createdAt: reservation.createdAt.toISOString(),
                }
            })
        );

        return SafeReservations;
    }catch (error:any) {
        throw new Error(error);
    }
}
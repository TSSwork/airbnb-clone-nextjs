import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server';

type Iparams = {
    reservationid?: string;
}

export async function DELETE(
    request: Request,
    {params}: {params: Iparams}
) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error()
    }

    const { reservationid } = params;
    const reservationId = reservationid;
    
    if (!reservationId || typeof reservationId !== 'string') {
        console.error(params);
        throw new Error(`Invalid reservation ID`)
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {userId: currentUser.id },
                {listing: {userId: currentUser.id}}
            ]
        },
    });

    return NextResponse.json(reservation);
}
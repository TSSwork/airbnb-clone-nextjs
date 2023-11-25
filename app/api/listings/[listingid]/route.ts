import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";


type Iparams = {
    listingid?: string;
}

export async function DELETE(
    request: Request,
    { params }: {params: Iparams}
) {
    try{

        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.error();
        }

        const { listingid } = params;
        const listingId = listingid;
        if (!listingId || typeof listingId!== "string") {
            throw new Error('Invalid ID');
        }

        const listing = await prisma.listing.deleteMany({
            where: {
                id: listingId,
                userId: currentUser.id
            }
        });

        return NextResponse.json(listing);


    }catch(err: any) {
        throw new Error(err);
    }
    
}
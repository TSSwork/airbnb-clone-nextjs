import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        imgSrc,
        roomCount,
        category,
        bathroomCount,
        guestCount,
        location,
        price

    } = body;

    Object.keys(body).forEach ((value:any) => {
        if (!body[value]){
            NextResponse.error();
        }
    });

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imgSrc,
            category,
            roomCount,
            guestCount,
            bathroomCount,
            locatinValue: location.value,
            price: parseInt(price,10),
            userId: currentUser.id

        }
    });

    return NextResponse.json(listing);

}

import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";


type Iparams = {
    listingid?: string;
}

export async function POST(
    request: Request,
    { params }: {params: Iparams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingid } = params;
    const listingId = listingid;

    if (!listingId || typeof listingId !== "string") {
        console.log(params);
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    })

    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    { params }: { params: Iparams }
){

 const currentUser = await getCurrentUser();
 if (!currentUser) {
     return NextResponse.error();
 }

 const { listingid } = params;
 const listingId = listingid;
 
 if (!listingId || typeof listingId!== "string") {
    throw new Error('Invalid ID');
 }

 let favoriteIds = [...(currentUser.favoriteIds || [])];

 favoriteIds = favoriteIds.filter((id) => id!== listingId);

 const user = await prisma.user.update({
    where: {
        id: currentUser.id
    },
    data: {
        favoriteIds
   },

 });

 return NextResponse.json(user);

}

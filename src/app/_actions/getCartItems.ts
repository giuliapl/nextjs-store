'use server'

import { cookies } from "next/headers";

export async function getCartItems() {
    let userId = cookies().get('userId')?.value;
    const result = await prisma?.cart.aggregate({
        where: {
            userId: userId,
        },
        _sum: {
            quantity: true,
        }
    });
    return result?._sum.quantity;
}
'use server'

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getCartItems() {
    const prisma = new PrismaClient();
    let userId = cookies().get('userId')?.value;
    revalidatePath('/');
    try {
        const result = await prisma?.cart.aggregate({
            where: {
                userId: userId,
            },
            _sum: {
                quantity: true,
            }
        });
        return result?._sum.quantity;
    } catch (error) {
        console.error(error);
        return {
            message: 'Database Error: Get Action Failed.',
        };
    }
}
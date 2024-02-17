'use server'

import { Cart, PrismaClient } from "@prisma/client";

export async function removeItem(item: Cart) {
    const prisma = new PrismaClient();
    try {
        if (item.quantity <= 1) {
            await prisma?.cart.delete({
                where: {
                    productId_userId: {
                        userId: item.userId,
                        productId: item.productId,
                    },
                }
            })
        }
        else {
            await prisma?.cart.update({
                where: {
                    productId_userId: {
                        userId: item.userId,
                        productId: item.productId,
                    },
                },
                data: {
                    quantity: item.quantity - 1
                }
            });
        }
    } catch (error) {
        console.error(error);
        return {
            message: 'Database Error: Remove Action Failed.',
        };
    }
}
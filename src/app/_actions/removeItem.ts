'use server'

import { Cart } from "@prisma/client";

export async function removeItem(item: Cart) {
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
}
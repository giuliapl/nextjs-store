'use server'

import { cookies } from "next/headers";
import { Product } from "../_api/products.model";

function generateUniqueId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${random}`;
}

export async function addItem(item: Product) {
  let userId = cookies().get('userId')?.value;
  if (!userId) {
    userId = generateUniqueId();
    cookies().set('userId', userId);
  }
  const res = await prisma?.cart.upsert({
    where: {
      productId_userId: {
        userId: userId,
        productId: item.id,
      },
    },
    create: {
      userId: userId,
      productId: item.id,
      quantity: 1
    },
    update: {
      quantity: { increment: 1 }
    }
  });
}
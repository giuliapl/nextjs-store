'use server'

import { cookies } from "next/headers";
import { Product } from "../_api/products.model";
import { PrismaClient } from "@prisma/client";

function generateUniqueId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${random}`;
}

export async function addItem(item: Product) {
  const prisma = new PrismaClient();
  let userId = cookies().get('userId')?.value;
  if (!userId) {
    userId = generateUniqueId();
    cookies().set('userId', userId);
  }
  try {
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
        quantity: 1,
        imgSrc: item.images[0],
        title: item.title,
        price: item.price,
      },
      update: {
        quantity: { increment: 1 }
      }
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Add Action Failed.',
    };
  }
}
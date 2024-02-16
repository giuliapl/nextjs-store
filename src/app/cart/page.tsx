import { Box } from "@mui/material";
import prisma from "../_lib/prisma";
import { Cart } from "@prisma/client";
import { cookies } from "next/headers";
import CartItem from "../_ui/CartItem";
import { revalidatePath } from "next/cache";
import Checkout from "../_ui/Checkout";

export default async function Cart() {
  const userId = cookies().get("userId")?.value;
  const data: Cart[] = await prisma.cart.findMany({
    where: {
      userId: userId,
    },
  });
  const total = data.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0
  );
  revalidatePath("/cart");

  return (
    <>
      <Box className="grid grid-cols-1 m-8">
        <Box className="grid grid-rows-1 m-8 gap-8 justify-center md:w-[100%]">
          {data.map((item: Cart, index: number) => (
            <CartItem key={index} product={item} />
          ))}
        </Box>
        <Box className="grid grid-rows-1 col-span-2 m-8 justify-center">
          <Checkout total={total} />
        </Box>
      </Box>
    </>
  );
}

import { Box } from "@mui/material";
import prisma from "../_lib/prisma";
import { Cart } from "@prisma/client";
import { cookies } from "next/headers";

export default async function Cart() {
  const userId = cookies().get("userId")?.value;
  const data: Cart[] = await prisma.cart.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <>
      <Box>
        {data.map((i: Cart, index: number) => (
          <p key={index}>
            {i.userId} - {i.productId} - {i.quantity}
          </p>
        ))}
      </Box>
    </>
  );
}

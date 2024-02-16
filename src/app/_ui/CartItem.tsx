"use client";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import { Box, Button } from "@mui/material";
import { Cart } from "@prisma/client";
import { removeItem } from "../_actions/removeItem";
import { useState } from "react";

export interface CartItemProps {
  product: Cart;
}

export default function CartItem(props: CartItemProps) {
  const [quantity, setQuantity] = useState<number>(props.product.quantity);

  const handleRemove = () => {
    removeItem(props.product);
    setQuantity((prevQuantity) => prevQuantity - 1);
  };
  return (
    <>
      {quantity > 0 && (
        <Card
          variant="soft"
          color="neutral"
          orientation="horizontal"
          className="md:w-[80vh]"
        >
          <AspectRatio ratio="1" sx={{ width: 100, height: "100%" }}>
            <Image
              layout="fill"
              src={props.product.imgSrc}
              loading="lazy"
              alt={props.product.title}
            />
          </AspectRatio>

          <CardContent className="flex !flex-row justify-between items-center">
            <Box className="flex flex-col justify-between h-[15vh]">
              <Typography level="title-lg">{props.product.title}</Typography>
              <Typography
                level="body-sm"
                aria-describedby="card-description"
                mb={1}
              >
                Qty {quantity}
              </Typography>
            </Box>

            <Box className="flex flex-col justify-between h-[15vh]">
              <Typography level="title-lg" alignSelf={"center"}>
                {props.product.price} €
              </Typography>

              <Button
                aria-label="Remove item from cart"
                variant="outlined"
                sx={{
                  "&:hover": {
                    backgroundColor: "#1976d2",
                    color: "white",
                  },
                }}
                onClick={handleRemove}
              >
                Remove
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
}

"use client";

import { IconButton, Typography } from "@mui/joy";
import { addItem } from "../_actions/addItem";
import { useContext } from "react";
import { SnackbarContext } from "../_lib/SnackBarProvider";
import { Product } from "../_api/products.model";
import { CartContext } from "../_lib/CartContextProvider";
import { AddCircleOutline } from "@mui/icons-material";

interface AddItemButtonProps {
  product: Product;
}

export default function AddItemButton(props: AddItemButtonProps) {
  const cartCtx = useContext(CartContext);
  const snackbarCtx = useContext(SnackbarContext);

  return (
    <>
      <IconButton
        aria-label="Add to cart"
        size="md"
        onClick={async () => {
          await addItem(props.product);
          const counter = cartCtx?.cartCounter;
          cartCtx?.setCartCounter(
            counter !== null && counter !== undefined ? counter + 1 : 0
          );
          snackbarCtx?.setState(true);
        }}
      >
        <AddCircleOutline />
        <Typography level="body-sm" aria-describedby="add-to-cart-cta">
          Add to cart
        </Typography>
      </IconButton>
    </>
  );
}

"use client";

import { Box, Button, Link, Typography } from "@mui/material";

export interface CheckoutProps {
  total: number;
}

export default function Checkout(props: CheckoutProps) {
  return (
    <Box className="">
      <Box className="flex justify-between mb-2">
        <Typography sx={{ fontWeight: "bold" }}>Subtotal</Typography>
        <Typography sx={{ fontWeight: "bold" }}>{props.total} €</Typography>
      </Box>
      <Typography variant="body2" sx={{ fontWeight: "light", color: "gray" }}>
        Shipping and taxes calculated at checkout.
      </Typography>
      <Button
        aria-label="Checkout"
        variant="contained"
        sx={{
          width: "100%",
          marginTop: "1.5rem",
          marginBottom: "1rem",
          "&:hover": {
            backgroundColor: "#1976d2",
            color: "white",
          },
        }}
      >
        Checkout
      </Button>
      <Box className="flex justify-center">
        <Link>Continue Shopping</Link>
      </Box>
    </Box>
  );
}

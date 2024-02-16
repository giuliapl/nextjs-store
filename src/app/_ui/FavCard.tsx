"use client";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import { Grid } from "@mui/material";
import { Product } from "../_api/products.model";
import Image from "next/image";
import { addItem } from "../_actions/addItem";
import Link from "next/link";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { CartContext } from "../_lib/CartContextProvider";
import { SnackbarContenxt } from "../_lib/SnackBarProvider";

interface FavCardProps {
  product: Product;
}

export default function FavCard(props: FavCardProps) {
  const cartCtx = useContext(CartContext);
  const snackbarCtx = useContext(SnackbarContenxt);

  return (
    <Card
      variant="soft"
      sx={{
        "&:hover": {
          cursor: "pointer",
          transition: "transform .2s",
          transform: "scale(1.07)",
        },
      }}
    >
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ postion: "relative" }}>
          <Link
            key={props.product.id}
            href={`devices/${props.product.id}/details`}
          >
            <Image
              src={props.product.images[0]}
              width={250}
              height={250}
              loading="lazy"
              alt={props.product.title}
            />
          </Link>
        </AspectRatio>
        <Grid
          container
          sx={{
            position: "absolute",
            bottom: "0",
            right: "0",
            background: "rgba(0, 0, 0, 0.6)",
            padding: "1em",
          }}
        >
          <Grid item xs={6}>
            <Typography level="title-lg" sx={{ color: "white" }}>
              {props.product.title}
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
            <IconButton
              aria-label="Add to cart"
              size="md"
              sx={{
                "&:hover": { backgroundColor: "#1976d2" },
              }}
              onClick={async () => {
                await addItem(props.product);
                const counter = cartCtx?.cartCounter;
                cartCtx?.setCartCounter(
                  counter !== null && counter !== undefined ? counter + 1 : 0
                );
                snackbarCtx?.setState(true);
              }}
            >
              <AddShoppingCartOutlined
                fontSize={"large"}
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">
          <span
            style={{
              fontSize: "1.5em",
              fontWeight: "bolder",
              marginLeft: ".5em",
            }}
          >
            € {props.product.price}
          </span>
        </Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <CardContent orientation="horizontal">
          <Typography
            noWrap
            level="body-xs"
            sx={{ textAlign: "center", color: "grey" }}
          >
            {props.product.description}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}

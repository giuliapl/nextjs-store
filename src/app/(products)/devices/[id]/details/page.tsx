import { Suspense } from "react";
import Loading from "./loading";
import { Box, Rating } from "@mui/material";
import Image from "next/image";
import { Product } from "@/app/_api/products.model";
import { Typography } from "@mui/joy";
import AddItemButton from "@/app/_ui/AddItemButton";

async function getData(id: string): Promise<Product> {
  const data = await fetch(`https://dummyjson.com/products/${id}`);
  return await data.json();
}

export default async function Detail({ params }: { params: { id: string } }) {
  const product = await getData(params.id);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Box className="grid grid-rows-1 md:grid-cols-3 gap-x-4 m-8 h-[60vh]">
          <Box className="md:row-span-2 relative">
            <Image
              src={product.images[0]}
              loading="lazy"
              alt={product.title}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
          <Box className="hidden md:grid grid-rows-2 gap-y-4">
            <Box className="relative">
              <Image
                src={product.images[1] ? product.images[1] : product.images[0]}
                loading="lazy"
                alt={product.title}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box className="relative">
              <Image
                src={product.images[2] ? product.images[2] : product.images[0]}
                loading="lazy"
                alt={product.title}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
          <Box className="row-span-2 relative">
            <Image
              src={product.images[3] ? product.images[3] : product.images[0]}
              loading="lazy"
              alt={product.title}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
        <Box className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-3 m-8">
          <Box className="md:col-span-2 flex flex-col">
            <Typography level="title-lg" aria-describedby="product-title">
              {product.title}
            </Typography>
            <Typography level="body-sm" aria-describedby="product-description" mt={2} >
              {product.description}
            </Typography>
          </Box>
          <Box className="flex flex-col items-center">
            <Typography level="title-lg" aria-describedby="product-price">
              {product.price} €
            </Typography>
            <Rating name="read-only" value={product.rating} readOnly disabled className="mt-4 mb-4" />
            <AddItemButton product={product} />
          </Box>
        </Box>
      </Suspense>
    </>
  );
}

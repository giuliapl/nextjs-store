import { Product, Products } from "@/app/_api/products.model";
import FavCard from "@/app/_ui/FavCard";
import { Box } from "@mui/material";
import { Suspense } from "react";
import Loading from "./loading";

async function getData(): Promise<Products> {
  const data = await fetch("https://dummyjson.com/products");
  await new Promise((resolve) => setTimeout(resolve, 1000)); // this is just to simulate a slow http request
  return await data.json();
}

export default async function Devices() {
  const data = await getData();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Box className="grid grid-cols-1 md:grid-cols-4 gap-8 m-8">
          {data &&
            data.products.map((product: Product) => (
              <FavCard key={product.id} product={product} />
            ))}
        </Box>
      </Suspense>
    </>
  );
}

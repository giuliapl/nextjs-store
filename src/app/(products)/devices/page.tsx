import { Product, Products } from "@/app/_api/products.model";
import FavCard from "@/app/_ui/FavCard";
import { Box } from "@mui/material";
import Link from "next/link";

async function getData(): Promise<Products> {
  const data = await fetch("https://dummyjson.com/products");
  return await data.json();
}

export default async function Devices() {
  const data = await getData();

  return (
    <>
    <Box className="grid grid-cols-1 md:grid-cols-4 gap-x-2 gap-y-8">
      {data &&
        data.products.map((product: Product) => (
          <Link key={product.id} href={product.description}>
            <FavCard product={product} />
          </Link>
        ))}
    </Box>
    </>
  );
}

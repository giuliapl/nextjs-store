import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Grid } from "@mui/material";
import { Product } from "../_api/products.model";
import Image from "next/image";

interface FavCardProps {
  product: Product;
}

export default function FavCard(props: FavCardProps) {
  return (
    <Card variant="outlined" className="w-[50vh] sm:w-[38vh] md:w-[32vh]">
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ postion: "relative" }}>
          <Image
            src={props.product.images[0]}
            width={250}
            height={250}
            loading="lazy"
            alt={props.product.title}
          />
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
            <IconButton aria-label="Add to favourites" size="md">
              <StarBorderIcon fontSize={"large"} sx={{ color: "white" }} />
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

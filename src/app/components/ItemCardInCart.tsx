import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Link from "next/link";
import Box from "@mui/material/Box";

export default function ItemCard(props: {
  cartItem: { _id: string; name: string; price: string };
}) {
  const { cartItem } = props;
  const [itemId, setItemId] = React.useState(cartItem._id);

  return (
    <Box sx={{ display: "flex" }}>
      <Card sx={{ width: 150, mr: 1 }}>
        <Link href={`/item?itemId=${itemId}`}>
          <CardMedia
            component='img'
            height='194'
            image='https://images.unsplash.com/photo-1522770179533-24471fcdba45'
            alt='image'
          />
        </Link>
        <CardContent>
          <Link href={`/item?itemId=${itemId}`}>
            <Typography>{cartItem.name}</Typography>
          </Link>
          <Typography>{cartItem.price} €</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='cart'>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}

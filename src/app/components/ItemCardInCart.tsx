import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Link from "next/link";
import Box from "@mui/material/Box";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export default function ItemCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [itemId, setItemId] = React.useState("69"); // now hardcoded, later get this from db

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
            <Typography>Item description</Typography>
          </Link>
          <Typography>10 €</Typography>
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

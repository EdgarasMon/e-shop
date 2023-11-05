import { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Box from "@mui/material/Box";
import IItem from "../Interfaces/IItem";

export default function ItemCard(props: { cartItem: IItem }) {
  const { cartItem } = props;
  // const [itemId, setItemId] = useState(cartItem._id);
  const [item, setItem] = useState(cartItem);

  return (
    <Box sx={{ display: "flex" }}>
      <Card sx={{ width: 150 }}>
        <Link href={`/item?itemId=${item._id}`}>
          <CardMedia
            component='img'
            height='194'
            image='https://images.unsplash.com/photo-1522770179533-24471fcdba45'
            alt='image'
          />
        </Link>
        {item.map((el: IItem) => (
          <CardContent key={el._id}>
            <Link href={`/item?itemId=${el._id}`}>
              <Typography>{el.name}</Typography>
            </Link>
            <Typography>{el.price} €</Typography>
          </CardContent>
        ))}
      </Card>
    </Box>
  );
}

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";

interface IItem {
  _id: string;
  brand: string;
  color: string;
  description: string;
  model: string;
  name: string;
  price: number;
  specification: string;
  type: string;
}

export default function Item(props: { itemId: string }) {
  const itemId = props.itemId;
  const [item, setItem] = useState(["Loading..."]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/items/getItem?id=${itemId}`)
      .then((res) => {
        setItem(res.data.data);
      });
  }, [itemId]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: 500, mr: 2 }}>
          {/* this is item page {itemId} */}
          <CardMedia
            component='img'
            height='194'
            image='https://images.unsplash.com/photo-1522770179533-24471fcdba45'
            alt='image'
          />
          <CardContent>
            <Typography>{item && item.specification} </Typography>
            <Typography>{item && item.price} </Typography>
          </CardContent>
        </Box>
        <Typography sx={{ width: 500 }}>{item && item.description}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <Button variant='contained' startIcon={<ShoppingCartIcon />}>
          Shop
        </Button>
        <Button variant='contained' startIcon={<FavoriteBorderIcon />}>
          Like
        </Button>
      </Box>
    </>
  );
}

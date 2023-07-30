import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import IItem from "../Interfaces/IItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Item(props: { itemId: string }) {
  const itemId = props.itemId;
  const [item, setItem] = useState<IItem>();
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/items/getItem?id=${itemId}`)
      .then((res) => {
        setItem(res.data.data);
      });
  }, [itemId]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/items/getImage?id=${itemId}`, {
        responseType: "arraybuffer",
      })
      .then((res) => {
        const buffer = Buffer.from(res.data, "binary");
        const dataUrl = `data:image/jpeg;base64,${buffer.toString("base64")}`;
        setImage(dataUrl);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, [itemId]);

  return (
    <>
      <Button href={"/"} variant='contained' startIcon={<ArrowBackIcon />}>
        Back
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: 500, mr: 2 }}>
          <CardMedia component='img' height='194' image={image} alt='image' />
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
